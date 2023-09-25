 

import Axios from 'axios';

const BASE_URL = 'http://192.168.0.204:8001';

// Function to fetch team data for the selected date range
export const fetchTeamData = async (fromDate, toDate) => {
  try {
    const response = await Axios.get(
      `${BASE_URL}/shift_details?type=team&from=${fromDate}&to=${toDate}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch employee data for the selected date range
export const fetchEmployeeData = async (fromDate, toDate) => {
  try {
    const response = await Axios.get(
      `${BASE_URL}shift_details?type=employee&from=${fromDate}&to=${toDate}`
    );
    
    return response.data;
  } catch (error) {
    throw error;
  }
 
};


 

























// import { Button } from '@mui/material';
// import axios from 'axios';


// function Get() 
// {
//     const  getshift = () => {
//         axios.get('').then(response => {
//             console.log(response);
//         })
//     }
// }
// return (
//     <div>
//         hello <Button onClick={getshift}>Get </Button>
//     </div>
// )

// export default Get;