import {useContext, useEffect, useState} from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
 Box,
  TableContainer,
  Select, MenuItem, useTheme
} from "@mui/material";
import { tokens } from "../theme";
import { CheckInOutContext } from '../CheckInOutContext';
import { DataGrid } from "@mui/x-data-grid";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const columns = [
  { field: "id",  hide: true},
  { field: "Date", headerName: "Date", width: 200 ,sortable: false, align: 'center',headerAlign: 'center'},
  { field: "First In", headerName: "First In", width: 200 ,sortable: false, align: 'center',headerAlign: 'center'},
  { field: "Last Out", headerName: "Last Out", width: 200,sortable: false, align: 'center',headerAlign: 'center' },
  { field: "Total In Time", headerName: "Total In Time", width: 200,sortable: false, align: 'center',headerAlign: 'center' },
]


const WeeklyTable = ({ data }) => {
  const theme = useTheme();
const colors = tokens(theme.palette.mode);

  const {selectedOption, setSelectedOption
  } = useContext(CheckInOutContext);
const [rows, setRows] = useState([]);

const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


const [formData, setFormData] = useState({
   from_date:"" ,
   to_date : ""
  });
console.log(selectedOption)
  function dateFormat(date){
    const [day, month, year] = date.split('-');
    return dayjs(`${year}-${month}-${day}`);
  }

  function secondsToHHMM(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const second = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
  }

  const handleDateChange = (date, fieldName) => {
    const formattedDate = dayjs(date).format('DD-MM-YYYY');

    setSelectedOption({
      ...selectedOption,
      [fieldName]: formattedDate,
    });

  };

  useEffect(() => {
    if (data) {
      const updatedRows = Object.keys(data).map((date, index) => ({
        id: index,
        Date: date,
        "First In": data[date]["First In"],
        "Last Out": data[date]["Last Out"] || "N/A",
        "Total In Time": secondsToHHMM(data[date]["Total In Time"]),
      }));
      setRows(updatedRows);
    } else {
      setRows([]);
    }
  }, [data]);
  
  return (
    <>
    <div>
      <Box
        m="0 25px"
        height="50vh"
        width= "40vw"
     
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
        <TableCell align="center" >First IN/Last OUT </TableCell>
          <TableCell align="center" >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dateFormat(selectedOption.from_date)}  
              onChange={(date) => handleDateChange(date, 'from_date')} 
              required
              error={!formData.from_date}
              helperText={!formData.from_date && 'Please select a from date'}
            />
          </LocalizationProvider>
           </TableCell>
           <TableCell align="center" >
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
           </TableCell>
        </TableRow>
      </TableHead>
      <DataGrid rows={rows} columns={columns}  disableColumnMenu hideFooterPagination disableSelectionOnClick/>
      </Box>
      </div>
      </>
     
 

  );
};

export default WeeklyTable;
