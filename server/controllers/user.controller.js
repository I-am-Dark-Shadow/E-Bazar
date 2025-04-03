import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import sendEmail from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import dotenv from "dotenv";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken";
dotenv.config();

// register new user controller
export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide email, name and password",
                error: true,
                success: false
            });
        }

        // why we use await here? because we want to wait for the user to be saved in the database
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                error: true,
                success: false
            });
        }

        const salt = await bcryptjs.genSalt(10); // 10 is the number of rounds of hashing
        const hashedPassword = await bcryptjs.hash(password, salt);

        const payload = {
            name,
            email,
            password: hashedPassword,
        };

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
        // explain above line of code?
        // we are using the id of the user to verify the email of the user and save it in the database

        // ${process.env.FRONTEND_URL}/verify-email?code=${save?._id}
        // FRONTEND_URL is the base URL of the frontend app
        // /verify-email is the path for email verification
        // code is a query parameter set to the user's unique ID (save?._id)

        // we use for varifying the mail using resend website
        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify your email from E-Bazar",
            html: verifyEmailTemplate({
                name,
                url: VerifyEmailUrl,
            }),
        });

        return res.status(201).json({
            message: "User registered successfully",
            error: false,
            success: true,
            data: save,
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// verify email controller
export async function verifyEmailController(req, res) {
    try {
        const { code } = req.body;

        const user = await UserModel.findOne({ _id: code });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const updateUser = await UserModel.updateOne(
            { _id: code },
            { verify_email: true }
        );

        return res.status(200).json({
            message: "Email verified successfully",
            error: false,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


// login controller
export async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        // email and password is provided or not
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password",
                error: true,
                success: false
            });
        }

        // user exist or not
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // user active or not
        if (user.status !== "Active") {
            return res.status(400).json({
                message: "User is not active Please contact to Admin",
                error: true,
                success: false
            })
        }

        // password dicripted or not
        const checkPassword = await bcryptjs.compare(password, user.password);


        // password is correct or not
        if (!checkPassword) {
            return res.status(400).json({
                message: "Password is incorrect",
                error: true,
                success: false
            });
        }

        // access token and refresh token make it in utils folder

        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        const updateUser = await UserModel.findByIdAndUpdate(
            user?._id,
            {
                last_login_date: new Date(),
            }
        )

        // why use cookiesOption because we want to secure the cookies in the browser
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None" // when frontend and backend are on different domains 
        };

        // set cookie in response
        res.cookie("accessToken", accessToken, cookiesOption);
        res.cookie("refreshToken", refreshToken, cookiesOption);

        return res.status(200).json({
            message: "User logged in successfully",
            error: false,
            success: true,
            // sometime in mobile version not able to get the token so we need to send the access token and refresh token
            data: {
                accessToken,
                refreshToken,
            },
        });

    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// get lofin user details controller
export async function getUserDetails(req, res) {
    try {
        const userId = req.userId; // get the user id from middleware auth.js for only logged in user can get the details

        const user = await UserModel.findById(userId).select("-password -refresh_token");

        return res.status(200).json({
            message: "User details fetched successfully",
            error: false,
            success: true,
            data: user,
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error || "Something went wrong in user details controller", 
            error: true,
            success: false
        })
        
    }
}


// logout controller
export async function logoutController(req, res) {
    try {
        // only logged in user can logout so we use middleware
        // so create a folder middleware and create file auth.js
        // now add the middleware in the route

        const userid = req.userId; // get the user id from middleware

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None" // when frontend and backend are on different domains 
        };

        res.clearCookie("accessToken", cookiesOption);
        res.clearCookie("refreshToken", cookiesOption);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(
            userid,
            { refresh_token: "" }
        );

        return res.json({
            message: "User logged out successfully",
            error: false,
            success: true,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// upload user avatar controller
export async function uploadAvatar(req, res) {
    try {
        const userId = req.userId; // get the user id from middleware auth.js
        const image = req.file; // get the image from multer middleware multer.js

        const upload = await uploadImageCloudinary(image);

        // this section is for saving the image url in the database
        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            { avatar: upload.secure_url }
        );

        // this section is for sending the image url in the response as a json format
        return res.json({
            message: "Uploaded profile picture successfully",
            error: false,
            success: true,
            data: {
                _id: userId,
                avatar: upload.secure_url
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}


// update user details controller
export async function updateUserDetails(req, res) {
    try {
        const userId = req.userId; // get the user id from middleware auth.js for only logged in user can update the details
        const { name, email, mobile, password } = req.body

        let hashedPassword = "";

        if (password) {
            const salt = await bcryptjs.genSalt(10); // 10 is the number of rounds of hashing
            hashedPassword = await bcryptjs.hash(password, salt);
        }

        // ********* Difference between findByIdAndUpdate and updateOne *********
        // **findByIdAndUpdate** 
        // Is used to update the user details and show previous details in json response
        // **updateOne**
        // Is used to update the user details and it show any data was modified it's count in json response

        const updateUser = await UserModel.updateOne(
            { _id: userId }, {
            // ... its means spread operator 
            // what is spread operator? it is used to spread the object or array and get the value of the object or array
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: hashedPassword })
        });

        return res.json({
            message: "Updated Successfully",
            error: false,
            success: true,
            data: updateUser
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// forgot password controller when user not logged in
// a digram of forgot password
// controller -> send email -> controller -> cotroller
// ForgotPassword -> Send OTP -> Verify OTP -> Reset Password
export async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not Found Or Email is Incorrect",
                error: true,
                success: false
            });
        }

        // generate otp
        // create a file in utils folder and file name generateOtp.js

        const otp = generateOtp();

        // otp expire time
        const expireTime = new Date() + 5 * 60 * 1000; // 5 minutes
        // (5 x 60 seconds x 1000 milliseconds)

        // save otp in database
        const update = await UserModel.findByIdAndUpdate(
            user._id,
            {
                forgot_password_otp: otp,
                forgot_password_expiry: new Date(expireTime).toISOString()
                // for standard time format use new Date() and .toISOString() for indian standard time
            });


        // send otp to user email
        await sendEmail({
            sendTo: email,
            subject: "Forgot Password Email from E-bazar",
            // we use custom html template for forgot password file name forgotPasswordTemplate.js
            html: forgotPasswordTemplate({
                name: user.name,
                otp: otp
            })
        });

        return res.json({
            message: "OTP sent successfully to your Email",
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


// verify forgot password otp controller
export async function verifyForgotPasswordOtp(req, res) {
    try {
        const { email, otp } = req.body;

        // email and otp is provided or not
        if (!email || !otp) {
            return res.status(400).json({
                message: "Provide Email and OTP",
                error: true,
                success: false
            });
        }

        // why here use email because we want to get the user details from the database by email and otp match
        const user = await UserModel.findOne({ email });

        // if user not found
        if (!user) {
            return res.status(400).json({
                message: "User not Found Or Email is Incorrect",
                error: true,
                success: false
            });
        }

        // otp expire time for checking the otp is expired or not
        const currentTime = new Date().toISOString();
        console.log(currentTime);

        if (user.forgot_password_expiry < currentTime) {
            return res.status(400).json({
                message: "OTP Expired",
                error: true,
                success: false
            });
        }

        // otp match or not
        if (user.forgot_password_otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false
            });
        }

        // if otp is not expired
        // if otp is match [user.forgot_password_otp === otp]

        // delete otp from database
        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            forgot_password_otp: "",
            forgot_password_expiry: ""
        });

        return res.json({
            message: "OTP verified successfully",
            error: false,
            success: true,
        })


    } catch (error) {
        // 500 is internal server error
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// reset password controller
export async function resetPassword(req, res) {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        // email and password is provided or not
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "Provide Email and Password and Confirm Password",
                error: true,
                success: false
            });
        }

        // user exist or not
        const user = await UserModel.findOne({ email });

        // if user not found
        if (!user) {
            return res.status(400).json({
                message: "User not Found Or Email is Incorrect",
                error: true,
                success: false
            });
        }

        // if password and confirm password not match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "Password and Confirm Password not match",
                error: true,
                success: false
            });
        }

        // if password and confirm password match
        const salt = await bcryptjs.genSalt(10); // 10 is the number of rounds of hashing
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        const update = await UserModel.findByIdAndUpdate(
            user._id,
            {
                password: hashedPassword,
                forgot_password_otp: null,
                forgot_password_expiry: null
            });

        return res.json({
            message: "Password reset successfully",
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


// refresh token controller
export async function refreshToken(req, res) {
    try {
        const  refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1]; // ["Bearer", "token"];
        // req?.header?.authorization?.split(" ")[1]; this is for mobile version because mobile version dont eccept req.cookies.refreshToken

        if (!refreshToken) {
            return res.status(401).json({
                message: "Invalid Refresh Token",
                error: true,
                success: false
            });
        }

        // check the refresh token is expired or not
        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN); 
        // why jwt.verify use because we want to verify the refresh token

        if (!verifyToken) {
            return res.status(401).json({
                message: "Refresh Token not found or Refresh Token Expired",
                error: true,
                success: false
            });
        }

        // get the user id by help of refresh token
        // console.log("verifyToken", verifyToken);
        // ? this simbol mean if verifyToken is null then userId will be null
        const userId = verifyToken?.id;

        // if refresh token is not expired generate new access token
        const newAccessToken = await generateAccessToken(userId);

        // why use cookiesOption because we want to secure the cookies in the browser
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None" // when frontend and backend are on different domains 
        };

        // set the new access token in the cookie
        res.cookie("accessToken", newAccessToken, cookiesOption);

        // if refresh token is not expired
        return res.json({
            message: "New Access Token Generated Successfully",
            error: false,
            success: true,
            data : {
                accessToken: newAccessToken
            }
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

