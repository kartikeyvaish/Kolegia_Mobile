// Packages Imports
import * as Yup from "yup";

export interface ChangePasswordProps {
    CurrentPassword?: string;
    NewPassword?: string;
    ConfirmPassword?: string;
}

// ChangePassword initial values
const ChangePasswordInitialValues: ChangePasswordProps = {
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
};

// ChangePassword validation schema
const ChangePasswordValidationSchema = () => Yup.object().shape({
    CurrentPassword: Yup.string().required("Current Password is required"),
    NewPassword: Yup.string().required("New Password is required").min(6, "New Password must be at least 6 characters").max(20, "New Password must be less than 20 characters"),
    ConfirmPassword: Yup.string().oneOf([Yup.ref("NewPassword"), null], "Passwords must match"),
}).unknown(true);

const ChangePasswordSchema = {
    ChangePasswordInitialValues,
    ChangePasswordValidationSchema,
}

export default ChangePasswordSchema;