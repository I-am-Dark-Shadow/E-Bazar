import CartProductModel from "../models/cartProduct.model.js";
import UserModel from "../models/user.model.js";


export const addToCartItemController = async (req, res) => {
    try {
        const userId = req.userId;
        // get the user id from middleware auth.js for only logged in user can get the details

        // when a product only stok one then we can add only one product in cart
        const { productId } = req.body;

        if (!productId) {
            return res.status(402).json({
                message: "Product id is required",
                error: true,
                success: false
            })
        }

        // check the cart item is exist or not
        const checkItemCart = await CartProductModel.findOne({
            userId: userId,
            productId: productId
        })

        // if cart item is exist then return
        if (checkItemCart) {
            return res.status(402).json({
                message: "Product already exist in cart",
                error: true,
                success: false
            })
        }

        const cartItem = await CartProductModel({
            quantity: 1,
            userId: userId,
            productId: productId
        })

        // it is for saving the cart item in the database in cartProduct collection
        const save = await cartItem.save();


        const UpdateCartUser = await UserModel.updateOne({ _id: userId }, {
            $push: {
                shopping_cart: productId
            }
        })

        return res.json({
            message: "Product added successfully",
            data: save,
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

export const getCartItemController = async (req, res) => {
    try {
        const userId = req.userId;
        // get the user id from middleware auth.js for only logged in user can get the details

        // it is for getting the cart item from the database in cartProduct collection
        const cartItem = await CartProductModel.find({
            userId: userId
        }).populate("productId");

        return res.json({
            // message: "Cart item fetched successfully",
            data: cartItem,
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

export const updateCartItemQtyController = async (req, res) => {
    try {
        const userId = req.userId;
        // get the user id from middleware auth.js for only logged in user can get the details

        const { _id, qty } = req.body;

        if (!_id, !qty) {
            return res.status(402).json({
                message: "Product id and quantity is required",
                error: true,
                success: false
            })
        }

        // it is for getting the cart item from the database in cartProduct collection
        const updateCartItem = await CartProductModel.updateOne({
            _id: _id,
            userId: userId
        },{
            quantity: qty
        })

        return res.json({
            message: "Item's Quantity Updated",
            data: updateCartItem,
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

export const deleteCartItemController = async (req, res) => {
    try {
        const userId = req.userId;
        // get the user id from middleware auth.js for only logged in user can get the details

        const { _id } = req.body;

        if (!_id) {
            return res.status(402).json({
                message: "Product is Missing",
                error: true,
                success: false
            })
        }

        // it is for getting the cart item from the database in cartProduct collection
        const deleteCartItem = await CartProductModel.deleteOne({
            _id: _id,
            userId: userId
        })

        return res.json({
            message: "Item Removed",
            data: deleteCartItem,
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