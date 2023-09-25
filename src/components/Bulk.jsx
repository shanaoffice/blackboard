import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import {Box,TextField,Modal,Select,MenuItem,InputLabel,FormControl,Button,useTheme,IconButton   } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { MDBBtn } from "mdb-react-ui-kit";
import {fetchTeamData,fetchEmployeeData} from '../api/Shift/shift';
import CloseIcon from '@mui/icons-material/Close';
import Axios from "axios";

 
export default function DataGridDemo() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [teams, setTeams] = useState([]); // State to store teams data
  const [shifts, setShifts] = useState([]); // Array to store shift details
  const [selectedOption, setSelectedOption] = useState("Team");
  const [formData, setFormData] = useState({});
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateColumns, setDateColumns] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [assignedShifts, setAssignedShifts] = useState({});
  const [isAssignShiftClicked, setIsAssignShiftClicked] = useState(false);
  const [initialAssignedShifts, setInitialAssignedShifts] = useState({});
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [shiftModalOpen, setShiftModalOpen] = useState(false);
  const [selectedShiftDate, setSelectedShiftDate] = useState(null);
  const [shiftDetails, setShiftDetails] = useState('');
  const [isBulkAssignClicked, setIsBulkAssignClicked] = useState(false);

  
  const handleRowClick = (row) => {
    setSelectedRowId(row.id); // Capture the selected row's ID
  };
 

  useEffect(() => {
    fetchData();
  }, [selectedOption, formData.fromDate, formData.toDate]); // data when option or date range changes

  
  const handleAssignShiftClick = () => {
    setIsAssignShiftClicked(true);
    // setIsModalOpen(true); //   modal when "Assign Shift" is clicked
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    
  };
  
    // Function to handle opening the shift modal
    const handleAssignShift = (date) => {
      setSelectedShiftDate(date);
      // Set the initial shift details here (if available)
      const shift = shifts.find((shift) => shift.date === date);
      if (shift) {
        setShiftDetails(shift.shift);
      } else {
        setShiftDetails(''); // Set to empty string if no shift exists
      }
      setShiftModalOpen(true); // Open the shift modal
    };   

  // Function to handle closing the shift modal
  const handleShiftModalClose = () => {
    setShiftModalOpen(false);
    setSelectedShiftDate(null);
    setShiftDetails('');
    setIsBulkAssignClicked(false); // Set isBulkAssignClicked to false when the modal is closed
  };
  

  const handleBulkAssignShift = async () => {
    if (selectedDates.length > 0) {
      const shiftDataArray = [];
  console.log(shiftDataArray)
      // Iterate over rows for the selected dates
      filteredRows.forEach((row) => {
        selectedDates.forEach((date) => {
          shiftDataArray.push({
            team_id: row.id,
            from_date: date,
            to_date: date,
            shift: shiftDetails,
          });
        });
      });
  
      try {
        // Send a POST request to the server to save the updated shift data
        const response = await Axios.post(
          'http://192.168.0.204:8001/update_shift/team/bulk',
          shiftDataArray
        );
  
        if (response.status === 200) {
          // Shift details updated successfully, you can handle the response here
          console.log('Bulk shift assignment successful:', response.data);
  
          // Open the modal for assigning shifts
          setIsAssignShiftClicked(true);
    // Set showDataGrid to true to re-render the DataGrid
           
          fetchData();
        } else {
          // Handle error
          console.error('Failed to update shift details.');
        }
      } catch (error) {
        console.error('Error updating shift details:', error);
      }
    } else {
      console.error('No dates selected. Cannot update shift details.');
    }
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsBulkAssignClicked(true);
    window.location.reload();
  };
     

  useEffect(() => {
    // Update date columns whenever the selected date range changes
    if (formData.fromDate && formData.toDate) {
      updateDateColumns(formData.toDate, formData.fromDate);
    }
  }, [formData.fromDate, formData.toDate]); 
  
  //date changing
  const handleDateChange = (date, fieldName) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setFormData({
      ...formData,
      [fieldName]: formattedDate,
    });

    if (fieldName === "fromDate" && formData.toDate) {
      const dates = [];
      let currentDate = dayjs(formattedDate);
      while (
        currentDate.isBefore(dayjs(formData.toDate)) ||
        currentDate.isSame(dayjs(formData.toDate))
      ) {
        dates.push(currentDate.format("YYYY-MM-DD"));
        currentDate = currentDate.add(1, "day");
      }
      setSelectedDates(dates);
      updateDateColumns(formData.toDate, formattedDate);
    } else if (fieldName === "toDate" && formData.fromDate) {
      const dates = [];
      let currentDate = dayjs(formData.fromDate);
      while (
        currentDate.isBefore(dayjs(formattedDate)) ||
        currentDate.isSame(dayjs(formattedDate))
      ) {
        dates.push(currentDate.format("YYYY-MM-DD"));
        currentDate = currentDate.add(1, "day");
      }
      setSelectedDates(dates);
      updateDateColumns(formattedDate, formData.fromDate);
    }
  };

  const updateDateColumns = (toDate, fromDate) => {
    const apiColumns = columns; // Assuming columns contain columns from API response
    const selectedDates = [];
    let currentDate = dayjs(fromDate);

    while (currentDate.isBefore(toDate) || currentDate.isSame(toDate)) {
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

  const filteredRows = selectedTeam === "All" ? rows: rows.filter((row) => row.team_name === selectedTeam) ;

  const fetchData = async () => {
    const fromDate = formData.fromDate;
    const toDate = formData.toDate;
    try {
      if (selectedOption === 'Team') {
        const apiData = await fetchTeamData(fromDate, toDate);
        const { columns, rows } = pivotData(apiData, selectedDates);
        setColumns(columns);
        setRows(rows);
      } else if (selectedOption === 'Employee') {
        const apiData = await fetchEmployeeData(fromDate, toDate);
        const { columns, rows } = pivotData(apiData, selectedDates);
        setColumns(columns);
        console.log(columns);
        setRows(rows);
      }
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  };  



  
  const pivotData = (data, selectedDates) => {
    const columns = [
      { field: "id", headerName: "ID", width: 100 },
      { field: "team_name", headerName: "Team Name", width: 200 },
      ...selectedDates.map((date) => ({
        field: date,
        headerName: `${dayjs(date).format("MMM")} ${dayjs(date).format("D")}`,
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
                <MDBBtn onClick={() => handleAssignShift(date)} style={{ backgroundColor: "#2e7c67" }}>
                  Assign Shift
                </MDBBtn>
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
      const shift = data.find((item) => item.team === team.team_id && item.date === date);
      row[date] = shift ? shift.shift : ''; // Store shift details in the corresponding date column
    });
    rows.push(row);
  });  
    return { columns, rows };
  };

  useEffect(() => {
    // Fetch teams data from your API here
    const fetchTeamsData = async () => {  
      try {
        const response = await fetch('http://192.168.0.204:8001/teams');  
   
        if (response.ok) {
          const data = await response.json();
          setTeams(data); // Update the teams state with the fetched data
        } else {
          console.error('Failed to fetch teams data');
        }
      } catch (error) {
        console.error('Error fetching teams data:', error);
      }
    };

    fetchTeamsData(); // Call the function to fetch teams data when the component mounts
  }, []);

  return (
    <div style={{ height: 200 }}>
      <Box
        m="40px"
        height="60vh"
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
          ".red-background": {
            backgroundColor: "red !important",
            color: "white !important",
          },
        }}
      >
        <Box style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center",  gap: "10px" }}>



     
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From Date"
                value={formData.fromDate}
                onChange={(date) => handleDateChange(date, "fromDate")}
                renderInput={(params) => <TextField {...params} />}
              />
              <br />
              <DatePicker
                label="To Date"
                value={formData.toDate}
                onChange={(date) => handleDateChange(date, "toDate")}
                renderInput={(params) => <TextField {...params} />}
              />

              <FormControl>
                <InputLabel id="select-team-label">Select Team</InputLabel>
                <Select
                  labelId="select-team-label"
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                >
                  <MenuItem value="All">All Teams</MenuItem>
                  {teams.map((team) => (
                    <MenuItem key={team.id} value={team.name}>
                      {team.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>              

              <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleBulkAssignShift()
          handleAssignShiftClick()
          handleAssignShift(); // Call the bulk assign function
           // Open the modal immediately
        }}
        sx={{ mt: 2 }}
        style={{ backgroundColor: '#2e7c67' }}
      >
        Bulk Assign Shift
      </Button> 
    </div>
            </LocalizationProvider>
          </div>
        </Box>
        <br />
        {isAssignShiftClicked && (
  <DataGrid
    rows={filteredRows}
    columns={columns}
    onRowClick={(params) => handleRowClick(params.row)}
  />
)}

      </Box>      
 {/* Shift Modal */}
 <Modal open={shiftModalOpen} onClose={handleShiftModalClose}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 300,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    }}
  >
    <IconButton
      sx={{
        position: 'absolute',
        top: 5,
        right: 5,
        color: 'text.primary',
      }}
      onClick={handleShiftModalClose}
    >
      <CloseIcon />  
    </IconButton>
    <FormControl fullWidth variant="outlined">
  <InputLabel id="shift-details-label">Shift Details</InputLabel>
  <Select
    labelId="shift-details-label"
    id="shift-details-select"
    value={shiftDetails}
    onChange={(e) => setShiftDetails(e.target.value)}
    label="Shift Details"
  >
    <MenuItem value="1">  1</MenuItem>
    <MenuItem value="2">  2</MenuItem>
    <MenuItem value="3">  3</MenuItem>
  </Select>
</FormControl>

  <Button
      variant="contained"
      color="primary"
      onClick={handleBulkAssignShift}
      sx={{ mt: 2 }}
      style={{ backgroundColor: "#2e7c67" }}
    > Save Changes </Button>   
  </Box>
</Modal>
    </div>
  );
}