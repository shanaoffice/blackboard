import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenericGetAllData = ({ apiUrl, onDataFetched }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const jsonData = response.data;

        const transformedData = jsonData.content.map((item, index) => ({
          id: index + 1,
          ...item,
        }));

        onDataFetched(transformedData);
      }
      catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [apiUrl]);

  return null; 
};
export default GenericGetAllData;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const GenericGetAllData = (props) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(props.apiUrl);
//         const jsonData = response.data;

//         const transformedData = jsonData.content.map((item, index) => ({
//           id: index + 1,
//           ...item,
//         }));

//         props.onDataFetched(transformedData);
//       } catch (error) {
//         console.log('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [props.apiUrl]);

//   return null; 
// };

// export default GenericGetAllData;

