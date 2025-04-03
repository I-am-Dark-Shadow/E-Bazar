import express from "express";
import { forgotPasswordController, getUserDetails, loginController, logoutController, refreshToken, registerUserController, resetPassword, updateUserDetails, uploadAvatar, verifyEmailController, verifyForgotPasswordOtp } from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post('/register', registerUserController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login', loginController)


// Here we use .get because we doesn't need to send any data from client when he will logs out
// here we use auth middleware beacause only logged in user can logout
userRouter.get('/logout',auth, logoutController)

// here we use auth middleware beacause only logged in user can get user details
// here we use .get because we doesn't need to send any data from client
userRouter.get('/user-details', auth, getUserDetails)

// here we use auth middleware beacause only logged in user can upload avatar
// here we use .put for upload avatar
// here we use upolad.single('avatar') for at a time only one image can be uploaded
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar)

// here we use auth middleware beacause only logged in user can update user details
userRouter.put('/update-user', auth, updateUserDetails)

// forgot password controller path when user not logged in or logged in
userRouter.put('/forgot-password', forgotPasswordController)

// forgot password otp path when user will not logged in or logged in
userRouter.put('/verify-forgot-password-otp', verifyForgotPasswordOtp)

// reset password path when user will not logged in or logged in
userRouter.put('/reset-password', resetPassword)

// refresh token path
userRouter.post('/refresh-token', refreshToken)


export default userRouter