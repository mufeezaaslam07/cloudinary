// const cloudinary = require("cloudinary").v2;
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "ddmbgheq9",
  api_key: "554232271377399",
  api_secret: "6B8CVlnilGTY8GmYcNsBPLkBw00",
});

const uploadToCloudinary = async (buffer) => {
  try {
    const uploaded = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        (error, result) => {
          if (error) {
            console.log(error);
            reject(new Error("Failed to upload file to Cloudinary"));
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    return uploaded;
  } catch (error) {
    console.log("error inside uploadation" + error);
  }
};
export default uploadToCloudinary;
