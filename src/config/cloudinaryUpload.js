const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL;


const formData = new FormData();
formData.append("file", file);
formData.append("upload_preset", uploadPreset);


const response = await axios.post(
  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  formData,
  {
    headers: { "Content-Type": "multipart/form-data" },
  }
);
