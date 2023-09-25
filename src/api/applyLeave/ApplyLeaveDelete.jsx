import axios from 'axios';
const ApplyLeaveDelete = async (apiUrl,data) => {
   try {
      const response = await axios.delete(apiUrl,{data : data}); //<---------- formData is not used for the delete method, only used for data.]
      console.log(response.data);
   } catch (error) {
      console.error(error);
   }
};
export default ApplyLeaveDelete