import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImage = async (file) => {
  try {
    const result = await cloudinary.v2.uploader.upload(file, {
      folder: 'chat-app-images',
    });
    return result.secure_url;  // Return the image URL
  } catch (err) {
    throw new Error('Image upload failed');
  }
};
