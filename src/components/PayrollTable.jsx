import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalContent from './Modalcontent';
import {
  TableHead,
  TableRow,
  TableCell,
  Box, useTheme,Button
} from "@mui/material";
import { tokens } from "../theme";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


export default function DataTable() {
    const [employeeList, setEmployeeList] = useState([]);
    const [processedList,setProcessedList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const currentYear = new Date().getFullYear();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleOpenModal = () => {
      setOpenModal(true);
    };
    const handleCloseModal = () => {
      setOpenModal(false);
    }
    const handleChange = (date) => {
      const formattedMonth = dayjs(date).format('MMMM');
      setSelectedMonth(formattedMonth)
    };
  const rows = employeeList;

  const monthOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()+1);

  const columns = [
    {
      field: 'select',
      headerName: 'Select',
      width: 100,
      renderCell: (params) => (
        <input
          type="checkbox"
          // checked={selectedRows.includes(params.row.id)}
          // onChange={() => handleCheckboxChange(params.row.id)}
        />
      ),
    },
    { field: 'id', headerName: 'EMP ID', width: 70 },
    { field: 'first_name', headerName: 'Name', width: 130 },
    { field: 'role', headerName: 'Role', width: 130 },
    {
      field: 'salary',
      headerName: 'Salary',
      width: 130,
      renderCell: (params) => {
        const employeeId = params.row.id;
        const processedEmployee = processedList.find((employee) => employee.id === employeeId);
    return processedEmployee ? processedEmployee.amount : 'Payroll Not Processed';
    }},
    {
      field: 'workingdays',
      headerName: 'Worked Days',
      renderCell: (params) => {
        const employeeId = params.row.id;
        const processedEmployee = processedList.find((employee) => employee.id === employeeId);
    return processedEmployee ? processedEmployee.workingdays : '';
    }},
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params) => {
        const employeeId = params.row.id;
        const isProcessed = processedList.some((employee) => employee.id === employeeId);
        if (isProcessed) {
          return <Button disabled>Processed</Button>;
        }
        return <Button variant="contained" onClick={handleOpenModal} >Process</Button>;
      },
    },
  ];

  const fetchEmployeeList = async () => {
  console.log("I am loaded")

    const response = await axios.get('http://192.168.0.204:8001/employees');
    const data = await response.data;
    setEmployeeList(data);
    const apiUrl = `http://192.168.0.204:8001/processed_payroll?month=${monthOptions[selectedMonth-1]}`;
    const EmpList = await axios.get(apiUrl);
    setProcessedList(EmpList.data);
  };

  useEffect(() => {
    fetchEmployeeList();
  }, [selectedMonth]);

  return (
<>
    <div>
      <Box
        m="0 25px"
        height="75vh"
        width= "60vw"
     
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
          <TableCell align="center" >
        {/* <InputLabel id="demo-simple-select-readonly-label">Month</InputLabel>

          <Select
      value={selectedMonth}
      onChange={handleChange}
    >
      {monthOptions.map((month, index) => (
        <MenuItem key={index} value={index + 1}>{month}</MenuItem>
      ))}
    </Select> */}

<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker views={['month', 'year']} onChange={(date) => handleChange(date)}/>
    </LocalizationProvider>
            
           </TableCell>
        </TableRow>
      </TableHead>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        
      />
      <ModalContent open={openModal} handleClose={handleCloseModal}  data="" />
      </Box>
    </div>
    </>
  );
}