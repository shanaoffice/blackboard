import React, { useEffect, useState } from 'react'
import ApplyLeaveRequests from "../api/applyLeave/ApplyLeaveRequests"
import { Box, useTheme, Typography } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Button from '@mui/material/Button';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import CancelIcon from '@mui/icons-material/Cancel';
import FormData from 'form-data';
import ApplyLeavePut from "../api/applyLeave/ApplyLeavePut"
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';

const LeaveRequests = () => {
     const [data, setData] = useState([]);
     const [columns, setColumns] = useState([]);
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);

     const id = localStorage.getItem('user_id');  //<-----------] I had get id used to store local storage.
     console.log(id)

     const apiUrl = `http://192.168.0.204:8001/apply_leave?id=${id}`
     const deleteUrl = 'http://192.168.0.204:8001/apply_leave'

     const handleButtonClick = async (rowId) => {
          console.log(rowId)
          try {
               const cancelLeaveUrl = `http://192.168.0.204:8001/apply_leave`; // Change the URL to your cancel leave API endpoint

               const data = {
                    "id": rowId,
                    "status": "Cancelled"
               }

               // Send the PUT request to cancel leave
               const response = await ApplyLeavePut(cancelLeaveUrl, data);

               if (response) {
                    // Update the local data to reflect the status change
                    const updatedData = data.map((item) =>
                         item.id === rowId ? { ...item, status: 'Cancelled' } : item
                    );
                    setData(updatedData);

               } else {
                    console.log('Failed to cancel leave for the selected row');
               }
          } catch (error) {
               console.error('Failed to cancel leave', error);
          }
     };

     const handleDataFetched = (fetchedData) => {

          const dataWithStatus = fetchedData.map((row) => ({
               ...row,
               'action': ''
          }));
          const transformedColumns = Object.keys(dataWithStatus[0] || {}).map((field) => {
               if (field === 'action') {
                    return {
                         field: 'action',
                         headerName: 'Action',
                         width: 200,
                         renderCell: (params) => {
                              const { id, status } = params.row;

                              return (
                                   <div>
                                        {status === 'Pending' ? (
                                             <Button
                                                  variant="contained"
                                                  color="secondary"
                                                  onClick={() => handleButtonClick(id)}
                                             >
                                                  <AutoDeleteIcon />
                                             </Button>
                                        ) : (
                                             ''
                                        )}
                                   </div>
                              );
                         },
                    };
               }
               return {
                    field,
                    headerName: field,
                    width: 150,
               };
          });

          const filteredColumns = transformedColumns.filter((column) => {
               const fieldType = typeof fetchedData[0][column.field];
               return fieldType !== 'object' && fieldType !== 'function' && column.field !== 'user' && column.field !== 'id';
          });

          setData(fetchedData);
          setColumns(filteredColumns);
     };

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
                         disableSelectionOnClick
                    />
               </Box>
          </div>
     );
};
export default LeaveRequests