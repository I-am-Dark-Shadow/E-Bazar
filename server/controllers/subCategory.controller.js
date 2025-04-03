import SubCategoryModel from "../models/subCategory.model.js";


export const AddSubCategoryController = async (req, res) => {
    try {
        const { name, image, category } = req.body

        // check name and image field is properly enterd or not
        if (!name && !image && !category[0]) {
            return res.status(400).json({
                message: "Please Enter Required Fields",
                error: true,
                success: false
            })
        }

        // create a payload name addCategory
        const createSubCategory = new SubCategoryModel({
            name,
            image,
            category
        })

        // create a variable saveCategory for save data using .save()
        const save = await createSubCategory.save()

        return res.json({
            message: "Sub Category Added Successfully",
            data: save,
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

export const GetSubCategoryController = async (req, res) => {
    try {
        // find all category using .find() 
        // sort category by createdAt: -1 in decending order using .sort it's mean latest category will be on top
        // populate category means it will show category name in sub category
        const data = await SubCategoryModel.find().sort({ createdAt: -1 }).populate("category")

        // if category not found
        if (!data) {
            return res.status(404).json({
                message: "Sub Category Not Found",
                error: true,
                success: false
            })
        } else {
            return res.json({
                message: "Sub Category Found Successfully",
                data: data,
                success: true,
                error: false
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const UpdateSubCategoryController = async (req, res) => {
    try {
        // get the category id from the body 
        const { _id, name, image, category } = req.body

        // check category id is exist or not
        const checkSubCategory = await SubCategoryModel.findById(_id)

        // if category not found
        if (!checkSubCategory) {
            return res.status(404).json({
                message: "Sub Category Not Found",
                error: true,
                success: false
            })
        }


        // update the category using .findByIdAndUpdate
        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {
            name,
            image,
            category
        })

        // after update the category show message
        return res.json({
            message: "Sub Category Update Successfully",
            data: updateSubCategory,
            success: true,
            error: false
        })


    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const DeleteSubCategoryController = async (req, res) => {
    try {
        const { _id } = req.body

        // check category id is exist or not
        const checkSubCategory = await SubCategoryModel.findById(_id)

        // if category not found
        if (!checkSubCategory) {
            return res.status(404).json({
                message: "Sub Category Not Found",
                error: true,                
                success: false
            })
        }

        // delete category using .deleteOne because one time only one category can be deleted
        const deleteSubCategory = await SubCategoryModel.findByIdAndDelete({ _id })

        return res.json({
            message: "Sub Category Deleted Successfully",
            data: deleteSubCategory,
            success: true,
            error: false
        })

    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}