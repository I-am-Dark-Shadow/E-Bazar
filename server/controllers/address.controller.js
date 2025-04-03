import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";


export const addAddressController = async (req, res) => {
    try {

        // get the user id from middleware auth.js for only logged in user can add address
        const userId = req.userId;
        // console.log(userId);

        const { address_line, city, state, pincode, country, mobile } = req.body;


        const createAddress = new AddressModel({
            address_line,
            city,
            state,
            pincode,
            country,
            mobile,
            userId : userId 
        })
        // save in mongodb database
        const saveAddress = await createAddress.save();
        if (!saveAddress) {
            return res.status(500).json({
                message: "Address Not Save",
                error: true,
                success: false
            })
        }

        // add the address id in user collection
        const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
            $push: {
                address_details: saveAddress._id,
            }
        });

        return res.json({
            message: "Address Added Successfully",
            data: saveAddress,
            error: false,
            success: true
        })







    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getAddressController = async (req, res) => {
try {
    const userId = req.userId; // get the user id from middleware auth.js for only logged in user can get the details

    const data = await AddressModel.find({ userId : userId });
    // const data = await AddressModel.find({ userId : userId }).sort({ createdAt: -1 }); 
    // here sort({ createdAt: -1 }) is for sorting the data in descending order or latest data will be on top

    return res.json({
        message: "Address Fetched Successfully",
        data: data,
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


export const updateAddressController = async (req, res) => {
    try {
        const userId = req.userId; // get the user id from middleware auth.js for only logged in user can get the details

        const { _id, address_line, city, state, pincode, country, mobile } = req.body;

        const updateAddress = await AddressModel.updateOne({_id : _id, userId : userId}, {
            address_line,
            city,
            state,
            pincode,
            country,
            mobile
        })

        return res.json({
            message: "Address Updated Successfully",
            data: updateAddress,
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


export const deleteAddressController = async (req, res) => {
    try {
        const userId = req.userId; // get the user id from middleware auth.js for only logged in user can get the details

        const { _id } = req.body; // get the address id from req.body

        const disableAddress = await AddressModel.updateOne({ _id : _id, userId : userId },{
            status : false
        });

        return res.json({
            message: "Address Disabled/Removed",
            data: disableAddress,
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
