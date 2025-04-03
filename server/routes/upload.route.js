import { Router } from "express";
import auth from "../middleware/auth.js";
import uploadImageController from "../controllers/uploadImage.controller.js";
import upload from "../middleware/multer.js";

// upload image router 
const uploadRouter = Router()

// here we use auth middleware beacause only logged in user can upload image
// here we use upload.single('image') for at a time only one image can be uploaded
uploadRouter.post ("/upload", auth,upload.single('image') ,uploadImageController)

export default uploadRouter