import React from "react";
import {useContext, useEffect, useState} from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  Box, useTheme
} from "@mui/material";
import { CheckInOutContext } from '../CheckInOutContext';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const columns = [
    { field: "id",  hide: true},
    { field: "check_in_time", headerName: "Check-In", width: 200 ,sortable: false, align: 'center',headerAlign: 'center'},
    { field: "check_out_time", headerName: "Check-Out", width: 200,sortable: false, align: 'center',headerAlign: 'center' },
]

const DailyTable = ( {data} ) => {
const theme = useTheme();
const colors = tokens(theme.palette.mode);
const [rows, setRows] = useState([]);
const {selectedDate, setSelectedDate} = useContext(CheckInOutContext);
const [day, month, year] = selectedDate.split('-');
const formattedDate = dayjs(`${year}-${month}-${day}`);

const handleDateChange = (date) => {
  const formattedDate = dayjs(date).format('DD-MM-YYYY');
  setSelectedDate(formattedDate)
};
    useEffect(() => {
        if (data) {
          const updatedRows = [];
            const checkLogs = data[selectedDate];
            if (checkLogs && checkLogs.length > 0) {
              checkLogs.forEach((log,index) => {
                updatedRows.push({
                  id: index,
                  check_in_time: log['check-In'],
                  check_out_time: log['check-out'] || 'N/A'
                  // remarks: log.remarks || 'N/A',
                });
              });
            }
          setRows(updatedRows);
        }
        else {
          const updatedRows = [];
          setRows(updatedRows);
        }
      }, [data]);
      
    return (
      <>
    <div>
      <Box
        m="0 25px"
        height="50vh"
        width= "30vw"
     
        sx={{
          "& .MuiDataGrid-root": {
            borderTop: '1px solid grey',
            borderRight: 'none', 
            borderBottom: 'none',
            borderLeft: 'none',
            borderRadius: '0 0 5px 5px'
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[700],
            borderBottom: "none"
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
          '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '&.MuiDataGrid-root': {
            border: 'none',
          },
          '& .custom-table-head': {
            backgroundColor: colors.greenAccent[700], 
            display: 'flex', 
            alignItems: 'center', 
            height: '50px', 
            borderRadius: '5px 5px 0 0'
          },
        }}
      >
<TableHead className="custom-table-head">
        <TableRow  >
        <TableCell align="center" >Check Log Details </TableCell>
          <TableCell align="center" >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            format="DD-MM-YYYY"
             value={formattedDate} 
             onChange={(date) => handleDateChange(date)} 
              required
              error={!selectedDate}
              helperText={!selectedDate && 'Please select a from date'}
            />
          </LocalizationProvider>
           </TableCell>
        </TableRow>
      </TableHead>
      <DataGrid rows={rows} columns={columns}  disableColumnMenu hideFooterPagination disableSelectionOnClick/>
      </Box>
    </div>
      </>
    )
            }
export default DailyTable;