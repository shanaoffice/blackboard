
import React, { useEffect } from 'react';
import axios from 'axios';

const GenericStudentPage = (props) => {
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(props.studentApiUrl);
        const jsonData = response.data;
        // console.log(response.data);

        // console.log(jsonData);
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
export default GenericStudentPage;