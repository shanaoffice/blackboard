import axios from 'axios';
const ApplyLeavePut = async (apiUrl, data) => {
  try {
    const response = await axios.put(apiUrl, data);
    console.log(data);
    return response.data;
  } catch (error) {
    console.error('Error updating student data', error);
    throw error;
  }
};
export default ApplyLeavePut;