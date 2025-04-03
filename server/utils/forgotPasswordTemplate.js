import dotenv from "dotenv";
dotenv.config();

const forgotPasswordTemplate = ({ name, otp }) => {
    return `
        <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif; font-size: 14px; color: #333;">
            <div style="max-width: 500px; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); margin: auto;">
                <h2 style="font-size: 22px; color: #333; text-align: center; margin-bottom: 20px;">
                    Password Reset Request From E-Bazar
                </h2>
                <p style="text-align: center; color: #555;">
                    Hello <strong>${name}</strong>, you recently requested to reset your password.
                </p>
                <p style="text-align: center; font-size: 16px; font-weight: bold; color: #007bff; margin: 20px 0;">
                    Your OTP Code: <span style="font-size: 20px; letter-spacing: 2px;">${otp}</span>
                </p>
                <p style="text-align: center; color: #555;">
                    Enter this code in the password reset page to proceed. This OTP is valid for only 5 minutes.
                </p>
                <p style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
                    If you did not request this, please ignore this email or contact support.
                </p>
                <p style="text-align: center; font-size: 12px; color: #777;">
                    Best regards, <br> The E-Bazar Team
                </p>
            </div>
        </div>
    
    `
}

export default forgotPasswordTemplate