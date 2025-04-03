import ProductModel from "../models/product.model.js";


export const createProductController = async (req, res) => {
    try {
        const { name, description, image, category, subCategory, unit, stock, price, discount, more_details } = req.body;

        // check name and image field is properly enterd or not
        if (!name || !description || !image[0] || !category[0] || !subCategory[0] || !unit || !stock || !price || !discount) {
            return res.status(400).json({
                message: "Please Enter Required Fields",
                error: true,
                success: false
            })
        }

        // create a payload name addCategory
        const product = new ProductModel({
            name,
            description,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            more_details

        })

        // create a variable saveCategory for save data using .save()
        const saveProduct = await product.save()

        return res.json({
            message: "Product Created Successfully",
            data: saveProduct,
            error: false,
            success: true
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getAllProductController = async (req, res) => {
    try {
        // pagination part
        let { page, limit, search } = req.body;

        // if page or limit is not provided then set default value
        if (!page) {
            page = 1;
        }

        if (!limit) {
            limit = 10;
        }

        const skip = (page - 1) * limit

        const query = search ? {
            $text: {
                $search: search
            }
        } : {}

        // why use promise.all() because we want to get data and total count at same time
        // why use populate() because we want to get category and sub category whats problem without populate it will not show category and sub category
        const [data, totalCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("category").populate("subCategory"),
            ProductModel.countDocuments(query)
        ])

        return res.json({
            message: "Successfully Get All Product",
            data: data,
            totalCount: totalCount,
            // why ceil because we want to get total page number
            totalNoPage: Math.ceil(totalCount / limit),
            error: false,
            success: true
        })




    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const updateProductDetailsController = async (req, res) => {
    try {
        const { _id } = req.body

        if (!_id) {
            return res.status(400).json({
                message: "Product Not Found missing Product Id",
                error: true,
                success: false
            })
        }

        const updateProduct = await ProductModel.updateOne({ _id: _id }, {
            ...req.body
        })

        return res.json({
            message: "Product Updated Successfully",
            data: updateProduct,
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}

export const deleteProductController = async (req, res) => {
    try {
        const { _id } = req.body

        if (!_id) {
            return res.status(400).json({
                message: "Product Not Found missing Product Id",
                error: true,
                success: false
            })
        }

        const deleteProduct = await ProductModel.deleteOne({ _id: _id })

        return res.json({
            message: "Product Deleted Successfully",
            data: deleteProduct,
            error: false,
            success: true
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getProductByCategoryController = async (req, res) => {
    try {
        const { id } = req.body

        if (!id) {
            return res.status(400).json({
                message: "Please Enter Category Id",
                error: true,
                success: false
            })
        }

        // here .limit is 15 because we want to get 15 product by category because all product fetch at a time is consume so much time
        const product = await ProductModel.find({
            category: { $in: id }
        }).limit(15)

        return res.json({
            message: "Successfully Get Product By Category",
            data: product,
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getProductByCategoryAndSubCategoryController = async (req, res) => {

    try {
        const { categoryId, subCategoryId, page, limit } = req.body;

        if (!categoryId || !subCategoryId) {
            return res.status(400).json({
                message: "Provide Category Id and Sub Category Id",
                error: true,
                success: false
            })
        }

        // pagination part
        if (!page) {
            page = 1;
        }

        if (!limit) {
            limit = 10;
        }

        const query = {
            category: { $in: categoryId },
            subCategory: { $in: subCategoryId }
        };

        const skip = (page - 1) * limit

        const [data, dataCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            // about this line here we want to get total count of product how here 
            // we use .countDocuments because we want to get total count of product 
            // and we use query because we want to get total count of product by category and sub category
            ProductModel.countDocuments(query)
        ])
        return res.json({
            message: "Successfully Get Product By Category and Sub Category",
            data: data,
            totalCount: dataCount,
            page: page,
            limit: limit,
            // why ceil because we want to get total page number
            // totalNoPage: Math.ceil(totalCount / limit),
            error: false,
            success: true
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getProductDetailsController = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await ProductModel.findOne({
            _id: productId
        })

        if (!product) {
            return res.status(400).json({
                message: "Please Enter Product Id",
                error: true,
                success: false
            })
        }

        return res.json({
            message: "Successfully Get Product Details",
            data: product,
            error: false,
            success: true
        })




    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const searchProductController = async (req, res) => {
    try {
        let { search, page, limit } = req.body

        if (!page) {
            page = 1;
        }

        if (!limit) {
            limit = 12;
        }

        const query = search ? {
            $text: {
                $search: search
            }
        } : {}

        const skip = (page - 1) * limit
        const [data, dataCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("category").populate("subCategory"),
            ProductModel.countDocuments(query)
        ])

        return res.json({
            message: "Successfully Search Product",
            data: data,
            totalCount: dataCount,
            // why ceil because we want to get total page number
            totalPage: Math.ceil(dataCount / limit),
            page: page,
            limit: limit,
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}