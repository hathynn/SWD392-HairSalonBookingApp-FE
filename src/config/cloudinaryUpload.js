const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const formData = new FormData();
formData.append("file", file);
formData.append("upload_preset", uploadPreset);

const response = await axios.post(
  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  formData
);
