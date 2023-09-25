import { useEffect } from 'react';
import axios from 'axios';

const ApplyLeaveRequests = ({ apiUrl, onDataFetched }) => {
     console.log(apiUrl);
     useEffect(() => {
          const fetchData = async () => {
               try {
                    const response = await axios.get(apiUrl);
                    console.log(response)
                    const jsonData = response.data;
                    onDataFetched(jsonData);
               }
               catch (error) {
                    console.log('Error fetching data:', error);
               }
          };

          fetchData();
     }, [apiUrl]);

     return null;
};
export default ApplyLeaveRequests;