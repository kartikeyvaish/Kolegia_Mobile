// Packages Imports
import * as Yup from "yup";

// OTP Schema initial values
const OTPInitialValues = {
    otp: "",
};

// validation schema
const OTPValidationSchema = () => Yup.object().shape({
    otp: Yup.string().required("OTP is required")
        .matches(/^[0-9]+$/, "OTP must contain only digits."),
})

const OTPSchema = {
    OTPInitialValues,
    OTPValidationSchema,
}

export default OTPSchema;