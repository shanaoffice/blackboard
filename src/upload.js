import React, { useState } from 'react';
import axios from 'axios';

const CloudinaryUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'your_upload_preset');

      const response = await axios.post('https://api.cloudinary.com/v1_1/{your_cloud_name}/image/upload', formData);

      const cloudinaryUrl = response.data.secure_url;
      setImageUrl(cloudinaryUrl);

      await sendImageUrlToBackend(cloudinaryUrl); // Call the function to send the URL to your backend
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const sendImageUrlToBackend = async (url) => {
    try {
      await axios.put('your_backend_url', { imageUrl: url });
      console.log('Image URL sent to the backend successfully!');
    } catch (error) {
      console.error('Error sending image URL to the backend:', error);
    }
  };

  return (
    <div>
      <h2>Cloudinary Image Upload</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Send URL</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default CloudinaryUpload;
