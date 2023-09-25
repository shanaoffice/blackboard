import React, { useEffect, useState } from 'react';
import { FormControl, 
  TextField, 
  Grid,
  Button,
  MenuItem } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {Box , useTheme, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ApplyLeavePost from "../api/applyLeave/ApplyLeavePost"
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import Modal from '@mui/material/Modal';
import ApplyLeaveRequests from "../api/applyLeave/ApplyLeaveRequests"

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

const ApplyLeave = () => {
//const [value, setValue] = React.useState(dayjs('2022-04-17'));
//Id get.
  const id = localStorage.getItem('user_id');
  console.log(id)

  const [formData, setFormData] = useState({
    user: id,
  });
  console.log(formData);

  const [isModalOpen, setIsModalOpen] = useState(false);  //<---------------]
  const [ leaveOptions, setLeaveOptions] = useState([]);
  const [ selectedTeam ,setSelectedTeam] = useState([]);

  const handleDateChange = (date, fieldName) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');

    setFormData({
      ...formData,
      [fieldName]: formattedDate, // Store the formatted date based on fieldName
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    // Create a formData object with your form values
    const SubmitValues = ApplyLeavePost(formData);
      console.log(formData);

       // Show the modal when Leave Request is clicked
    setIsModalOpen(true);
  };

  //<-------start-------]
  const handleCancel = () => {
    // Reset the form fields to their initial values or empty values
    setFormData(initialFormData);
  };

  const handleConfirm = () => {
    // Handle the confirmation logic here, send a request to submit the leave request

    // Close the modal
    setIsModalOpen(false);
  };
 //<--------end--------]

  const initialFormData = {
    leave_type: '',
    fromDate: null,
    toDate: null,
    reason: '',
  };

  const [formValidity, setFormValidity] = useState(false); // State variable for form validity

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to check if the form is valid
  const isFormValid = () => {
    const { leave_type, fromDate, toDate, reason } = formData;
    return leave_type && fromDate && toDate && reason;
  };
  
  const initialLeaveData = {
    sick_leave_balance: 0,
    paid_leave_balance: 10,
  };

  const [leaveData, setLeaveData] = useState(initialLeaveData);

  const apiUrl = 'http://192.168.0.204:8001/leave_balance/4321';

  const isSickLeaveEnabled = leaveData.sick_leave_balance > 0;
  // useEffect to update leaveOptions when leaveData changes
  useEffect(() => {
    const updatedOptions = [];

    if (leaveData.sick_leave_balance > 0) {
      updatedOptions.push({ label: 'Sick Leave', value: 'sick_leave' });                                                                                                                                                          
    }

    if (leaveData.paid_leave_balance > 0) {
      updatedOptions.push({ label: 'Paid Leave', value: 'paid_leave' });              
    }

    setLeaveOptions(updatedOptions);
  }, [leaveData]);

  // Update form validity when form data changes
  React.useEffect(() => {
    setFormValidity(isFormValid());
  }, [formData]);

  // Define the handleDataFetched function to handle the fetched data
  const handleDataFetched = (fetchedData) => {
    console.log(apiUrl)
    setLeaveData(fetchedData);
  };

  return (
    <React.Fragment>
      <ApplyLeaveRequests 
        apiUrl={apiUrl} 
        onDataFetched={handleDataFetched}
      />
      <CssBaseline />
      <Container maxWidth="md">
        <Box display='flex' flex='1' justifyContent='space-around' flex-wrap= 'wrap'>
        <form noValidate style={{ flexFlow: 'wrap', boxSizing: 'border-box', display: 'flex', marginTop: '20px'}}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" fullWidth>
        <TextField id="filled-basic" value={id} label="Employee name and id" variant="filled" />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">

          <TextField
            id="filled-select-currency"
            select
            label="Leave type"
            name="leave_type"
            value={formData.leave_type}
            onChange={handleInputChange}
            defaultValue=""
            variant="filled"
            required
            error={!formData.leave_type}
            helperText={!formData.leave_type && 'Please select leave type'}
          >
            {/* <MenuItem value="All"></MenuItem> */}
            <MenuItem value="sick_leave">Sick Leave</MenuItem>
            <MenuItem value="paid_leave">Paid Leave</MenuItem>
          </TextField>
          
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From date"
              value={formData.fromDate}  //<---------------]
              onChange={(date) => handleDateChange(date, 'start_date')}  //<---------------]
              required
              error={!formData.fromDate}
              helperText={!formData.fromDate && 'Please select a from date'}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="To date"
              value={formData.toDate}  //<---------------]
              minDate={dayjs(formData.start_date)} //<---------------]
              onChange={(date) => handleDateChange(date, 'end_date')} //<---------------]
              required
              error={!formData.toDate}
              helperText={!formData.toDate && 'Please select a to date'}
              variant="filled"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="resonInputFromLeaveEdit"
            label="Reason for leave"
            name="reason" 
            onChange={handleInputChange} //<---------------]
            value={formData.reason}
            multiline
            fullWidth
            variant="filled"
            inputProps={{ maxLength: '512' }}
            required error={!formData.reason}
            helperText={!formData.reason && 'Please provide a reason'}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
        <CheckCircleOutlineRoundedIcon />
        Leave Request 
      </Button>
      <Button type="button" variant="contained" color="secondary" onClick={handleCancel} style={{ marginTop: '20px', marginLeft: '3%'}}>
        <HighlightOffRoundedIcon />
        Cancel
      </Button>
    </form>
  </Box>    
</Container>

{/* Confirmation Modal */}
<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <Box sx={Style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
        Are you sure you want to submit the leave request?
    </Typography>
      <Button variant="contained" onClick={handleConfirm} style={{ marginRight: '10px' }}>
        Yes
      </Button>
      <Button variant="contained" onClick={() => setIsModalOpen(false)}>
        No
      </Button>
    </Box>
</Modal>
</React.Fragment>
);
}
export default ApplyLeave;


// import React, { useState } from 'react';
// import { TextField, Button, Container, Grid, MenuItem } from '@mui/material';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import DatePicker from '@mui/lab/DatePicker';

// const ApplyLeave = () => {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [leaveType, setLeaveType] = useState('');
//   const [leaveTypeReason, setLeaveTypeReason] = useState('');
  
//   const handleStartDateChange = (date) => {
//     setStartDate(date);
//   };

//   const handleEndDateChange = (date) => {
//     setEndDate(date);
//   };

//   const handleLeaveTypeChange = (event) => {
//     setLeaveType(event.target.value);
//   };

//   const handleLeaveTypeReasonChange = (event) => {
//     setLeaveTypeReason(event.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here (e.g., send data to the server)
//     console.log('Start Date:', startDate);
//     console.log('End Date:', endDate);
//     console.log('Leave Type:', leaveType);
//     console.log('Leave Type Reason:', leaveTypeReason);

//     // Reset form values
//     setStartDate(null);
//     setEndDate(null);
//     setLeaveType('');
//     setLeaveTypeReason('');
//   };

//   const handleCancel = () => {
//     // Reset form values
//     setStartDate(null);
//     setEndDate(null);
//     setLeaveType('');
//     setLeaveTypeReason('');
//   };

//   return (
//     <Container>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={6}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DatePicker
//                 label="From Date"
//                 value={startDate}
//                 onChange={handleStartDateChange}
//                 renderInput={(params) => <TextField {...params} />}
//               />
//             </LocalizationProvider>
//           </Grid>
//           <Grid item xs={6}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DatePicker
//                 label="To Date"
//                 value={endDate}
//                 onChange={handleEndDateChange}
//                 renderInput={(params) => <TextField {...params} />}
//               />
//             </LocalizationProvider>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               select
//               label="Leave Type"
//               value={leaveType}
//               onChange={handleLeaveTypeChange}
//               fullWidth
//             >
//               <MenuItem value="vacation">Vacation</MenuItem>
//               <MenuItem value="sick">Sick Leave</MenuItem>
//               <MenuItem value="other">Other</MenuItem>
//             </TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Leave Type Reason"
//               value={leaveTypeReason}
//               onChange={handleLeaveTypeReasonChange}
//               fullWidth
//             />
//           </Grid>
//         </Grid>
//         <Button type="submit" variant="contained" color="primary">
//           Submit
//         </Button>
//         <Button type="button" variant="contained" color="secondary" onClick={handleCancel}>
//           Cancel
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default ApplyLeave;


// import React, { useState } from 'react';
// import { TextField, Button, Container, Grid, IconButton, InputAdornment } from '@mui/material';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import DatePicker from '@mui/lab/DatePicker';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Calendar icon

// const ApplyLeave = () => {
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);
//   const [leaveReason, setLeaveReason] = useState('');

//   const handleFromDateChange = (date) => {
//     setFromDate(date);
//   };

//   const handleToDateChange = (date) => {
//     setToDate(date);
//   };

//   const handleLeaveReasonChange = (event) => {
//     setLeaveReason(event.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here (e.g., send data to the server)
//     console.log('From Date:', fromDate);
//     console.log('To Date:', toDate);
//     console.log('Leave Reason:', leaveReason);

//     // Reset form values
//     setFromDate(null);
//     setToDate(null);
//     setLeaveReason('');
//   };

//   const handleCancel = () => {
//     // Reset form values
//     setFromDate(null);
//     setToDate(null);
//     setLeaveReason('');
//   };

//   return (
//     <Container>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={6}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DatePicker
//                 label="From Date"
//                 value={fromDate}
//                 onChange={handleFromDateChange}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <IconButton>
//                             <CalendarTodayIcon />
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 )}
//               />
//             </LocalizationProvider>
//           </Grid>
//           <Grid item xs={6}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DatePicker
//                 label="To Date"
//                 value={toDate}
//                 onChange={handleToDateChange}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <IconButton>
//                             <CalendarTodayIcon />
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 )}
//               />
//             </LocalizationProvider>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Leave Reason"
//               value={leaveReason}
//               onChange={handleLeaveReasonChange}
//               fullWidth
//             />
//           </Grid>
//         </Grid>
//         <Button type="submit" variant="contained" color="primary">
//           Submit
//         </Button>
//         <Button type="button" variant="contained" color="secondary" onClick={handleCancel}>
//           Cancel
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default ApplyLeave;







