import axios from "axios"
const CloudUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ihihstua");
    const response = await axios.post("https://api.cloudinary.com/v1_1/vishnu228/image/upload", formData);
    return response.data.secure_url
  } catch (error) {
    console.error("Error uploading image:", error);
  }
  return (null)
};
export default CloudUpload;
