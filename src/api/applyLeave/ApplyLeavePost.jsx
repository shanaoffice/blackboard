import axios from "axios";

function ApplyLeavePost(formData) {
     console.log(formData)
     
     axios.post('http://192.168.0.204:8001/apply_leave', formData)
          .then((response) => {
               if (response.status === 201) {
                    // Request was successful, log the response data
                    console.log('Response Data:', response.data);
               } else {
                    // Handle unexpected status code
                    console.error('Unexpected Status Code:', response.status);
               }
          })
          .catch((error) => {
               // Handle errors here
               console.error('Request Error:', error);
          });

     return null;
}
export default ApplyLeavePost