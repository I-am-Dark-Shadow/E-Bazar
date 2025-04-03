import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const uploadImageCloudinary = async(image) => {
    // what is buffer? buffer is a raw binary data that is stored in memory or in a file
    const buffer = image?.buffer || Buffer.from(await iamge.arrayBuffer());

  const uploadImage = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({
          folder: 'ebazar'
      }, (error, uploadResult) => {
          if (error) {
              reject(error); // reject the Promise with the error message
          } else {
              resolve(uploadResult); // resolve the Promise with the upload result
          }
      }).end(buffer); // .end() is used to end the stream and trigger the upload
  })

  return uploadImage
}

export default uploadImageCloudinary