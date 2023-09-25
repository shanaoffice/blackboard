import { useContext, useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { Box, TextField, useTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { MDBBtn } from "mdb-react-ui-kit";
import { fetchTeamData } from "../api/Shift/shift";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { CheckInOutContext } from '../CheckInOutContext';

export default function DataGridDemo() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [shifts, setShifts] = useState([]); // Array to store shift details
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dateColumns, setDateColumns] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [assignedShifts, setAssignedShifts] = useState({});
  const [initialAssignedShifts, setInitialAssignedShifts] = useState({});
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedShiftDate, setSelectedShiftDate] = useState(null);
  const [shiftDetails, setShiftDetails] = useState("");

  const [formData, setFormData] = useState({
    from_date: getCurrentWeekStartDate(),
    to_date: getCurrentWeekEndDate(),
  });

  const { selectedOption, setSelectedOption
  } = useContext(CheckInOutContext);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Function to get the start date of the current week (Sunday)
  function getCurrentWeekStartDate() {
    return dayjs().startOf('week').format('YYYY-MM-DD');
  }

  // Function to get the end date of the current week (Saturday)
  function getCurrentWeekEndDate() {
    return dayjs().endOf('week').format('YYYY-MM-DD');
  }


  // Initialize selectedDates with the current week's dates
  let currentDate = dayjs(getCurrentWeekStartDate());
  while (currentDate.isBefore(getCurrentWeekEndDate()) || currentDate.isSame(getCurrentWeekEndDate())) {
    selectedDates.push(currentDate.format("YYYY-MM-DD"));
    currentDate = currentDate.add(1, "day");
  }

  function dateFormat(date) {
    const [day, month, year] = date.split('-');
    return dayjs(`${year}-${month}-${day}`);
  }
  const defaultStartDate = getCurrentWeekStartDate(); // Replace with your default start date
  const defaultEndDate = getCurrentWeekEndDate(); // Replace with your default end date

  useEffect(() => {
    // Fetch data initially with the default date range
    fetchData();
  }, []);


  const handleRowClick = (row) => {
    setSelectedRowId(row.id); // Capture the selected row's ID
  };

  useEffect(() => {
    fetchData();
  }, [selectedOption, formData.from_date, formData.to_date]); // data when option or date range changes


  // Function to get the start date of the current week (Sunday)
  function getCurrentWeekStartDate() {
    return dayjs().startOf('week').format('YYYY-MM-DD');
  }

  // Function to get the end date of the current week (Saturday)
  function getCurrentWeekEndDate() {
    return dayjs().endOf('week').format('YYYY-MM-DD');
  }


  // Function to handle opening the shift modal
  const handleAssignShift = (date) => {
    setSelectedShiftDate(date);
    // Set the initial shift details here (if available)
    const shift = shifts.find((shift) => shift.date === date);
    if (shift) {
      setShiftDetails(shift.shift);
    } else {
      setShiftDetails(""); // Set to empty string if no shift exists
    }
  };


  useEffect(() => {
    // Update date columns whenever the selected date range changes
    if (formData.from_date && formData.to_date) {
      updateDateColumns(formData.to_date, formData.from_date);
    }
  }, [formData.from_date, formData.to_date]);

  //date changing
  const handleDateChange = (date, fieldName) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setFormData({
      ...formData,
      [fieldName]: formattedDate,
    });

    if (fieldName === "from_date" && formData.to_date) {
      const dates = [];
      let currentDate = dayjs(formattedDate);
      while (
        currentDate.isBefore(dayjs(formData.to_date)) ||
        currentDate.isSame(dayjs(formData.to_date))
      ) {
        dates.push(currentDate.format("YYYY-MM-DD"));
        currentDate = currentDate.add(1, "day");
      }
      setSelectedDates(dates);
      updateDateColumns(formData.to_date, formattedDate);
    } else if (fieldName === "to_date" && formData.from_date) {
      const dates = [];
      let currentDate = dayjs(formData.from_date);
      while (
        currentDate.isBefore(dayjs(formattedDate)) ||
        currentDate.isSame(dayjs(formattedDate))
      ) {
        dates.push(currentDate.format("YYYY-MM-DD"));
        currentDate = currentDate.add(1, "day");
      }
      setSelectedDates(dates);
      updateDateColumns(formattedDate, formData.from_date);
    }
  };

  const updateDateColumns = (to_date, from_date) => {
    const apiColumns = columns; // Assuming columns contain columns from API response
    const selectedDates = [];
    let currentDate = dayjs(from_date);

    while (currentDate.isBefore(to_date) || currentDate.isSame(to_date)) {
      const day = currentDate.format("YYYY-MM-DD");
      selectedDates.push(day);
      currentDate = currentDate.add(1, "day");
    }

    const dateColumnsData = selectedDates.map((day) => {
      const field = `day_${day}`;
      const headerName = day;
      const width = 100;
      const editable = true;

      return {
        field,
        headerName,
        width,
        editable,
        renderCell: (params) => (
          <div>
            {params.row[field]}
            {assignedShifts[params.row.date]}
          </div>
        ),
      };
    });

    // Merge API columns and date columns, removing duplicates based on 'field'
    const mergedColumns = [...apiColumns, ...dateColumnsData].reduce(
      (uniqueColumns, column) => {
        const isColumnUnique = !uniqueColumns.some(
          (c) => c.field === column.field
        );
        if (isColumnUnique) {
          uniqueColumns.push(column);
        }
        return uniqueColumns;
      },
      []
    );
    setDateColumns(mergedColumns);
    setAssignedShifts(initialAssignedShifts);
  };

  useEffect(() => {
    fetchData();
  }, [selectedOption]);
  useEffect(() => { }, []);

  const filteredRows =
    selectedTeam === "All"
      ? rows
      : rows.filter((row) => row.team_name === selectedTeam);

  // Fetch data and update columns and rows
  const fetchData = async () => {
    try {
      // Fetch data using your API
      // Replace the following line with your API call
      const apiData = await fetchTeamData(formData.from_date, formData.to_date);

      // Update columns and rows based on the fetched data
      const { columns, rows } = pivotData(apiData, selectedDates);
      setColumns(columns);
      setRows(rows);
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  const pivotData = (data, selectedDates) => {

    const columns = [
      { field: "id", headerName: "ID", width: 100 },
      { field: "team_name", headerName: "Team Name", width: 200 },
      ...selectedDates.map((date) => ({
        field: date,
        headerName: `${dayjs(date).format("D")} ${dayjs(date).format("MMM")}`,
        width: 150,
        renderCell: (params) => {
          const cellValue = params.row[date] || "";
          // Check if shift exists for this cell
          if (cellValue) {
            return (
              <div
                onClick={() => handleAssignShift(date)} // Open the modal on cell click
              >
                {cellValue}
              </div>
            );
          } else {
            return (
              <div>
                <AddBoxIcon
                  baseClassName="fas"
                  className="fa-plus-circle"
                  onClick={() => handleAssignShift(date)}
                />
              </div>
            );
          }
        },
      })),
    ];

    const rows = [];
    const teamsSet = new Set();
    const teams = data.reduce((uniqueTeams, item) => {
      if (!teamsSet.has(item.team)) {
        teamsSet.add(item.team);
        uniqueTeams.push({ team_id: item.team, team_name: item.team_name });
      }
      return uniqueTeams;
    }, []);

    teams.forEach((team) => {
      const row = { id: team.team_id, team_name: team.team_name };
      selectedDates.forEach((date) => {
        const shift = data.find(
          (item) => item.team === team.team_id && item.date === date
        );
        console.log(`Processing date ${date}: found shift`, shift);
        row[date] = shift ? shift.shift : "";
      });
      rows.push(row);
    });

    console.log("Columns:", columns);
    console.log("Rows:", rows);
    return { columns, rows };
  };

  function dateFormat(date) {
    const [day, month, year] = date.split('-');
    return dayjs(`${year}-${month}-${day}`);

  }
  return (

    <div style={{ height: 400 }}>
      <Box
        m="40px"
        height="68vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Box style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dateFormat(selectedOption.from_date)}
                  onChange={(date) => handleDateChange(date, 'from_date')}
                  required
                  error={!formData.from_date}
                  helperText={!formData.from_date && 'Please select a from date'}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dateFormat(selectedOption.to_date)}
                  onChange={(date) => handleDateChange(date, 'to_date')}
                  required
                  error={!formData.to_date}
                  helperText={!formData.to_date && 'Please select a to date'}
                  minDate={dateFormat(selectedOption.from_date)}
                />
              </LocalizationProvider>
          </div>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    </div>
  );
}