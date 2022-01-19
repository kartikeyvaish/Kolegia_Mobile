// Packages Imports
import * as Yup from "yup";

// Login initial values
const LoginInitialValues = {
  email: "",
  password: "",
};

// validation schema
const LoginValidationSchema = () => Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
})

const LoginSchema = {
  LoginInitialValues,
  LoginValidationSchema,
}

export default LoginSchema;