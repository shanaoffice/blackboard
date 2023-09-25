
import React, { useEffect } from 'react';
import axios from 'axios';

const GenericStaffPage = (props) => {
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(props.staffsApiUrl);
        const jsonData = response.data;

        props.onDataFetched(jsonData);
      }
      catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return null;
};
export default GenericStaffPage;