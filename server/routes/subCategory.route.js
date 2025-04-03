import {Router} from "express";
import { AddSubCategoryController, DeleteSubCategoryController, GetSubCategoryController, UpdateSubCategoryController } from "../controllers/subCategory.controller.js";
import auth from "../middleware/auth.js";


const subCategoryRouter = Router();

// here we use auth middleware beacause only logged in user can add sub category
subCategoryRouter.post("/create",auth, AddSubCategoryController)

// here we don't need to use auth middleware beacause anyone can get sub category
subCategoryRouter.post("/get", GetSubCategoryController)

// here we use auth middleware beacause only logged in user can update sub category
subCategoryRouter.put("/update",auth,UpdateSubCategoryController)

// here we use auth middleware beacause only logged in user can delete sub category
subCategoryRouter.delete("/delete",auth,DeleteSubCategoryController)


export default subCategoryRouter