// Packages Imports
import * as Yup from "yup";

// Login initial values
export const LoginInitialValues = {
  email: "",
  password: "",
};

// validation schema
export const LoginValidationSchema = () => Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
})