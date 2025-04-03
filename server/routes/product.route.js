import { Router } from "express";
import auth from "../middleware/auth.js";
import { createProductController, deleteProductController, getAllProductController, getProductByCategoryAndSubCategoryController, getProductByCategoryController, getProductDetailsController, searchProductController, updateProductDetailsController } from "../controllers/product.controller.js";
import { admin } from "../middleware/Admin.js";

const productRouter = Router()

productRouter.post("/create", auth,admin, createProductController)

productRouter.post("/get", getAllProductController)

productRouter.put("/update-product-details", auth,admin, updateProductDetailsController)

productRouter.delete("/delete-product", auth,admin, deleteProductController)

productRouter.post("/get-product-by-category", getProductByCategoryController)

productRouter.post("/get-product-by-category-and-subcategory", getProductByCategoryAndSubCategoryController);

productRouter.post("/get-product-details", getProductDetailsController);

productRouter.post("/search-product", searchProductController)




export default productRouter
