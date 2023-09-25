import axios from 'axios';

const ImageUpload = async (apiUrl, data) => {
  try {
    const payload = { "Profile URL": data };
    const response = await axios.put(apiUrl, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating data', error);
    throw error;
  }
};

export default ImageUpload;


// import axios from "axios"
// const ImageUpload = async (url, id) => {
//     try {
//         const payload = { "Profile URL": url };
//         console.log(payload);

//         const response = await axios.put(`/Staff/${id}`, payload);
//         console.log(response);
//         return response.data['message']
//     }
//     catch (error) {
//         console.error("Error uploading image:", error);
//     };
//     return (null)
// };
// export default ImageUpload;
