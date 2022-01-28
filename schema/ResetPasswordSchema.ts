// Packages Imports
import * as Yup from "yup";

export interface ResetPasswordProps {
    NewPassword?: string;
    ConfirmPassword?: string;
}

// ResetPassword initial values
const ResetPasswordInitialValues: ResetPasswordProps = {
    NewPassword: "",
    ConfirmPassword: "",
};

// ResetPassword validation schema
const ResetPasswordValidationSchema = () => Yup.object().shape({
    NewPassword: Yup.string().required("New Password is required").min(6, "New Password must be at least 6 characters").max(20, "New Password must be less than 20 characters"),
    ConfirmPassword: Yup.string().oneOf([Yup.ref("NewPassword"), null], "Passwords must match"),
}).unknown(true);

const ResetPasswordSchema = {
    ResetPasswordInitialValues,
    ResetPasswordValidationSchema,
}

export default ResetPasswordSchema;