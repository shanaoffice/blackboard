import axios from 'axios';
const StaffIdPut = async (apiUrl, data) => {
  try {
    const response = await axios.put(apiUrl, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating student data', error);
    throw error;  
  }
};
export default StaffIdPut;