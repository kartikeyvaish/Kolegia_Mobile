// Packages Imports
import * as Yup from "yup";

// Login initial values
export const LoginInitialValues = {
  Email: "",
  Password: "",
  StaySignedIn: false,
};

// Stay Signed in message
export const StaySignedInLabel = "Remember me";

// validation schema
export const LoginValidationSchema = () => Yup.object().shape({
  Email: Yup.string().email().required("Email is required"),
  Password: Yup.string().required("Password is required"),
  StaySignedIn: Yup.boolean(),
})