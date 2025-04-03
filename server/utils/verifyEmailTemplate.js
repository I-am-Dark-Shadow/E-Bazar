const verifyEmailTemplate = ({name, url}) => {
    return `
    <div style="background-color: #f9f9f9; padding: 20px; font-family: Arial, sans-serif; font-size: 14px; color: #333;">
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="font-size: 24px; color: #333; margin-bottom: 20px;">
                Dear ${name}, Welcome to E-Bazar!
            </h2>
            <p style="margin-bottom: 20px;">
                We're excited to have you on board! To complete your registration, please click the verification button below:
            </p>
            <a href=${url}
                <button style="background-color: #007bff; color: #ffffff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                    Verify Email
                </button>
            </a>
            <p style="margin-top: 20px;">
                If you have any questions or need assistance, please don't hesitate to contact our customer support team.
            </p>
            <p style="margin-top: 20px;">
                Best regards,
            </p>
            <p style="margin-top: 10px;">
                The E-Bazar Team
            </p>
        </div>
    </div>
    
    `
}

export default verifyEmailTemplate