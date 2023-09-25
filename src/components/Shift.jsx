import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { Box, TextField, Modal, FormControlLabel, Select, MenuItem, InputLabel, FormControl, Button, useTheme, Typography, Paper, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { MDBBtn } from "mdb-react-ui-kit";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { fetchTeamData, fetchEmployeeData } from '../api/Shift/shift';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import Icon from '@mui/material/Icon';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Axios from "axios";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';


import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function DataGridDemo() {
     const [rows, setRows] = useState([]);
     const [columns, setColumns] = useState([]);
     const [selectedTeam, setSelectedTeam] = useState("All");
     const [teams, setTeams] = useState([]); // State to store teams data
     const [shifts, setShifts] = useState([]); // Array to store shift details
     const [selectedTeamId, setSelectedTeamId] = useState(null); // Assuming you have access to the team ID
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
     const [shiftModalOpen, setShiftModalOpen] = useState(false);  // State for the shift modal
     const [selectedShiftDate, setSelectedShiftDate] = useState(null);
     const [shiftDetails, setShiftDetails] = useState('');

     const handleRowClick = (row) => {
          setSelectedRowId(row.id); // Capture the selected row's ID
     };

     useEffect(() => {
          fetchData();
     }, [selectedOption, formData.fromDate, formData.toDate]); // data when option or date range changes


     const handleAssignShiftClick = () => {
          setIsAssignShiftClicked(true);
          setIsModalOpen(true); //   modal when "Assign Shift" is clicked
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
     };

     // Function to handle assigning a shift and adding it to the array
     const handleAssignShiftSubmit = async () => {
          if (selectedRowId !== null && selectedShiftDate) {
               const shiftDataArray = []; // Create an empty array to hold shift data

               // Push shift objects into the array
               shiftDataArray.push({
                    team_id: selectedRowId, // Use the selected row's ID
                    date: dayjs(selectedShiftDate).format('YYYY-MM-DD'),
                    shift: shiftDetails,
               });

               // You can push more shift objects if needed
               // console.log(shiftDataArray);
               try {
                    // Send a POST request to the server to save the updated shift data
                    const response = await Axios.post('http://192.168.0.204:8001/update_shift/team', shiftDataArray);

                    if (response.status === 200) {
                         // Shift details updated successfully, you can handle the response here
                         console.log('Shift details updated successfully:', response.data);

                         // Update your local state or refetch data if needed
                         fetchData();
                         handleShiftModalClose();
                    } else {
                         // Handle error
                         console.error('Failed to update shift details.');
                    }
               } catch (error) {
                    console.error('Error updating shift details:', error);
               }
          } else {
               console.error('No row selected or date not specified. Cannot update shift details.');
          }
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

     const filteredRows = selectedTeam === "All" ? rows : rows.filter((row) => row.team_name === selectedTeam);

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
                    console.log(fetchEmployeeData); // Log employee data
                    const { columns, rows } = pivotData(apiData, selectedDates);
                    setColumns(columns);
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
                                        {/* <MDBBtn onClick={() => handleAssignShift(date)} style={{ backgroundColor: "#2e7c67" }}>
                  Assign Shift
                </MDBBtn> */}
                                        <AddBoxIcon baseClassName="fas" className="fa-plus-circle" onClick={() => handleAssignShift(date)} />
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
                    m="20px"
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
                         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                   <DatePicker
                                        label="From Date"
                                        value={formData.fromDate}
                                        onChange={(date) => handleDateChange(date, "fromDate")}
                                        renderInput={(params) => <TextField {...params} />}
                                   />

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


                                   <FormControl>
                                        <RadioGroup
                                             name="controlled-radio-buttons-group"
                                             value={selectedOption}
                                             onChange={handleOptionChange}
                                        >
                                             <FormControlLabel
                                                  value="Team"
                                                  control={<Radio />}
                                                  label="Team"
                                             />
                                             <FormControlLabel
                                                  value="Employee"
                                                  control={<Radio />}
                                                  label="Employee"
                                             />
                                        </RadioGroup>
                                   </FormControl>
                                   <MDBBtn onClick={handleAssignShiftClick} style={{ backgroundColor: "#2e7c67" }}>Assign Shift</MDBBtn>
                              </LocalizationProvider>
                         </div>
                    </Box>
                    <br />


                    <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ /* ... */ }}>
                         {isAssignShiftClicked ? (
                              <DataGrid
                                   rows={filteredRows}
                                   columns={columns}
                                   onRowClick={(params) => handleRowClick(params.row)}
                              />
                         ) : (
                              null
                         )}
                    </LocalizationProvider>
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
                              onClick={handleShiftModalClose} // Close the modal when the button is clicked
                         >
                              <CloseIcon /> {/* You can use any close icon component */}
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
                                   {/* Add more MenuItem components for your dropdown options */}
                              </Select>
                         </FormControl>
                         <Button
                              variant="contained"
                              color="primary"
                              onClick={handleAssignShiftSubmit}
                              sx={{ mt: 2 }}
                              style={{ backgroundColor: "#2e7c67" }}
                         >
                              Save Changes
                         </Button>
                    </Box>
               </Modal>
          </div>
     );
}