import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

const uploadImageController = async (req, res) => {
    try {
        const image = req.file; // get the image from multer middleware multer.js

        const uploadImage = await uploadImageCloudinary(image);

        return res.json({
            message: "Image uploaded successfully",
            data: uploadImage,
            error: false,
            success: true,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export default uploadImageController