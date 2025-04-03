import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";

export const AddCategoryController = async (req, res) => {
    try {
        const { name, image } = req.body

        // check name and image field is properly enterd or not
        if (!name || !image) {
            return res.status(400).json({
                message: "Please Enter Required Fields",
                error: true,
                success: false
            })
        }

        // create a payload name addCategory
        const addCategory = new CategoryModel({
            name,
            image
        })

        // create a variable saveCategory for save data using .save()
        const saveCategory = await addCategory.save()

        // image not save on databse for some error
        if (!saveCategory) {
            return res.status(500).json({
                message: "Category Not Save",
                error: true,
                success: false
            })
        }

        // successfull add a category response
        return res.json({
            message: "Successfully Add A Category",
            data: saveCategory,
            success: true,
            error: false
        })



    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })

    }
}

export const GetCategoryController = async (req, res) => {
    try {

        // find all category using .find()
        // sort category by createdAt in decending order using .sort it's mean latest category will be on top
        const getCategory = await CategoryModel.find().sort({ createdAt: -1 })

        // if category not found
        if (!getCategory) {
            return res.status(404).json({
                message: "Category Not Found",
                error: true,
                success: false
            })
        }

        // if category found
        return res.json({
            message: "Successfully Get All Category",
            data: getCategory,
            success: true,
            error: false
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const UpdateCategoryController = async (req, res) => {

    try {
        // get the category id from the body
        const { _id, name, image } = req.body


        // update the category using .updateOne
        const update = await CategoryModel.updateOne({
            _id: _id
        }, {
            name,
            image
        })

        return res.json({
            message: "Category Update Successfully",
            data: update,
            success: true,
            error: false
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const DeleteCategoryController = async (req, res) => {
    try {
        const { _id } = req.body

        // if category have sub category then not delete category first delete sub category then delete category
        const checkSubCategory = await SubCategoryModel.find({
            category: {
                // dont understand this $ in then search in browser
                "$in" : [_id]
            }
        }).countDocuments()

        // if category have product then not delete category first delete product then delete category
        const checkProduct = await ProductModel.find({
            category: {
                // dont understand this $ in then search in browser
                "$in" : [_id]
            }
        }).countDocuments()

        if (checkSubCategory > 0 || checkProduct > 0) {
            return res.status(400).json({
                message: "Category Have Sub-Category Or Product",
                error: true,
                success: false
            })
        }

        // delete category using .deleteOne because one time only one category can be deleted
        const deleteCategory = await CategoryModel.deleteOne({
            _id: _id
        })

        return res.json({
            message: "Category Delete Successfully",
            data: deleteCategory,
            success: true,
            error: false
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}