import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null
    //upload the file
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    })
    // file has been uploaded sucessfully
    // console.log("File is Uploaded on Cloudinary",response.url);
    fs.unlinkSync(localFilePath);
    return response;


  } catch (error) {
    fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got failed
    return null;
  }
}

const deleteCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'video',
      invalidate: true // Optional: clears cached copies from CDN
    });
    fs.unlinkSync(publicId);
    return result;

    console.log(result); // Outputs: { result: 'ok' }

  } catch (error) {
    fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got failed
    return null;
    console.error('Error deleting video:', error);


  }

}

export { uploadCloudinary, deleteCloudinary }

