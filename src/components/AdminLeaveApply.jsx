import React, { useState, useEffect } from 'react'
import ApplyLeaveRequests from "../api/applyLeave/ApplyLeaveRequests"
import { Box, useTheme } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ApplyLeaveDelete from "../api/applyLeave/ApplyLeaveDelete"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BlockIcon from '@mui/icons-material/Block';
import ApplyLeavePut from "../api/applyLeave/ApplyLeavePut"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const Style = {
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: 400,
     bgcolor: 'background.paper',
     boxShadow: 24,
     p: 4,
};

// Assuming you have an ApplyLeaveGet function for making GET requests
const ApplyLeaveGet = async (url) => {
     try {
          const response = await fetch(url);
          if (!response.ok) {
               throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data;
     } catch (error) {
          console.error('Error fetching leave data:', error);
          throw new Error('Failed to fetch leave data');
     }
};

const AdminLeaveApply = () => {
     //Modal popup
     const [columns, setColumns] = useState([]);
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);

     const [data, setData] = useState([]);
     const [confirmOpen, setconfirmOpen] = useState(false);
     const [open, setOpen] = useState(false);
     const [message, setMessage] = useState('');
     const [messageColor, setMessageColor] = useState('success');
     const [isAdmin, setIsAdmin] = useState(true); // Assume the admin is logged in
     const [selectedRowId, setSelectedRowId] = useState(null);
     const [status, setStatus] = useState(null);

     const [refresh, setRefresh] = useState(false);
     const [fetchedData, setFetchedData] = useState([]);

     const handleConfirmOpen = async (id, status) => {  //Yes button modal open function.
          console.log(id, status)
          setSelectedRowId(id);
          setStatus(status);
          setconfirmOpen(true);
     }

     const handleLeaveApproval = async () => {
          try {
               const ApprovalLeaveUrl = 'http://192.168.0.204:8001/apply_leave'; // Change the URL to your cancel leave API endpoint

               const selectedRowsData = {
                    id: selectedRowId,
                    status: status, // You can set the status as needed
               };

               console.log(selectedRowsData);

               const response = await ApplyLeavePut(ApprovalLeaveUrl, selectedRowsData); // Use your Axios PUT function.

               if (response) {
                    console.log('Leave canceled successfully');
                    // Make a GET request after approval
                    const leaveData = await ApplyLeaveGet('http://192.168.0.204:8001/apply_leave'); // Replace with your GET endpoint
                    setData(leaveData); // Update state with the fetched data
               } else {
                    console.log('Failed to approve leave for some rows');
               }
               
          } catch (error) {
               console.error('Failed to approve leave', error);
          }

          setSelectedRowIds([]); // Clear selected rows after approval
          setconfirmOpen(false);
     };
     const handleConfirmCancel = () => {
          setconfirmOpen(false);
          // window.location.reload();
     };

     const handleClose = () => {
          setOpen(false);
          // window.location.reload();
     };
     // popup end.



     const [selectedRowIds, setSelectedRowIds] = useState([]);  //<-----------] Check box row selected.

     const id = localStorage.getItem('user_id');  //<-----------] I had get id used to store local storage.
     const apiUrl = `http://192.168.0.204:8001/apply_leave`

     const handleDataFetched = (fetchedData) => {
          console.log(fetchedData)

          const dataWithStatus = fetchedData.map((row) => ({
               ...row
          }));

          const transformedColumns = Object.keys(dataWithStatus[0] || {}).map(
               (field) => {
                    if (field === 'status') {
                         return {
                              field: 'approve',
                              headerName: 'Approve',
                              width: 150,
                              renderCell: (params) => (
                                   <FormControlLabel
                                        control={<Radio color="success" />}
                                        value="Approved"
                                        checked={params.row.status === 'Approved'}
                                        onClick={() => handleConfirmOpen(params.row.id, 'Approved')}
                                   />
                              ),
                         };
                    } else {
                         return {
                              field,
                              headerName: field,
                              width: 150,
                         };
                    }
               }
          );

          transformedColumns.push({
               field: 'denied',
               headerName: 'Denied',
               width: 150,
               renderCell: (params) => (
                    <FormControlLabel
                         control={<Radio color="error" />}
                         value="denied"
                         checked={params.row.status === 'denied'}
                         onClick={() => handleConfirmOpen(params.row.id, 'denied')}
                    />
               ),
          });

          const filteredColumns = transformedColumns.filter((column) => {
               const fieldType = typeof dataWithStatus[0][column.field];
               return (
                    fieldType !== 'object' &&
                    fieldType !== 'function' &&
                    column.field !== 'user' && column.field !== undefined
               );
          });

          setData(fetchedData);
          console.log(fetchedData)
          setColumns(filteredColumns);
     };

     const initialFormData = {
          "ids": selectedRowIds
     };
     console.log(selectedRowIds)

     const handleRowSelectionChange = (newSelection) => {
          setSelectedRowIds(newSelection)
     }

     return (
          <div style={{ height: 400 }}>
               <Box
                    m="40px"
                    height="75vh"
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
                    <ApplyLeaveRequests
                         apiUrl={apiUrl}
                         onDataFetched={handleDataFetched}
                    />

                    <DataGrid
                         rows={data}
                         columns={columns}
                         onSelectionModelChange={handleRowSelectionChange}
                         disableSelectionOnClick
                    />

                    <Modal
                         open={confirmOpen}
                         onClose={handleClose}
                         aria-labelledby="modal-modal-title"
                         aria-describedby="modal-modal-description"
                    >
                         <Box sx={Style}>
                              <Typography id="modal-modal-title" variant="h6" component="h2">
                                   Do you want to Confirm the leave?
                              </Typography>
                              <Button variant="contained"
                                   onClick={handleLeaveApproval}
                                   style={{ marginRight: '10px' }}>
                                   Yes
                              </Button>
                              <Button variant="contained" onClick={handleConfirmCancel}>
                                   No
                              </Button>
                         </Box>
                    </Modal>
               </Box>
          </div >
     );
};
export default AdminLeaveApply