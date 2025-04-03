import UserModel from "../models/user.model.js";

export const admin = async(req, res, next) => {
    try {
        const userId = req.userId; // get the user id from middleware auth.js for only logged in user can get the details

        const user = await UserModel.findById(userId);
        if (user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Permission Denied",
                error: true,
                success: false
            })
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            message: "Permission Denied",
            error: true,
            success: false
        })
    }
}