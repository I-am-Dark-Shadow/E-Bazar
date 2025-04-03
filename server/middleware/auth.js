import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// why use next here? because we want to pass the request to the next middleware
const auth = async(req, res, next) => {
    try {
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1]; // ["Bearer", "token"];
        if (!token) {
            return res.status(401).json({
                message: "You are not Registered or not logged in",
            })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        // if token was expired,
        if (!decode) {
            return res.status(401).json({
                message: "Token was expired",
                error: true,
                success: false
            })
        }
        req.userId = decode.id;
        next();
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export default auth