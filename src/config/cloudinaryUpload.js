// uploadImage.js
export const uploadImage = async (file) => {
  const cloudName = 'dws57sxu6'; 
  const uploadPreset = 'maverick'; 

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData
  });
  console.log("Response:", response.url);
  const data = await response.json();
  if (data.secure_url) {
    return data.secure_url;
  } else {
    throw new Error("Upload thất bại");
  }
};
