// Packages Imports
import * as Yup from "yup";

// EmailSignUp initial values
const EmailSignUpInitialValues = {
    email: "",
};

const OTP_Text = "An OTP has been sent to your Email address to verify your account. Please enter that OTP below"

// validation schema
const EmailSignUpValidationSchema = () => Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
})

const EmailSignUpSchema = {
    EmailSignUpInitialValues,
    EmailSignUpValidationSchema, OTP_Text
}

export default EmailSignUpSchema;