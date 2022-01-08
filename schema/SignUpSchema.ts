// Packages Imports
import * as Yup from "yup";

// Possible Years
export const Years = [
    "2017", "2018",
    "2019", "2020",
    "2021", "2022",
]

// Possible Batches
export const Batch = [
    "BCS", "IMG", "IMT"
]

// Possible Hostels
export const Hostels = [
    "BH-1", "BH-2", "BH-3", "GH-1"
]

// Terms and Conditions message
export const TermsAndConditionsMessage = `By signing up, you agree to our Terms of Service and Privacy Policy.`

// Login initial values
export const RegisterInitialValues = {
    Name: "",
    Email: "",
    Year: "",
    Batch: "",
    Hostel: "",
    Phone: "",
    Picture: {},
    Password: "",
    ConfirmPassword: "",
    TermsAccepted: false
};

// validation schema
export const RegisterValidationSchema = () => Yup.object().shape({
    Name: Yup.string().required("Name is required"),
    Email: Yup.string().email().required("Email is required"),
    Year: Yup.string().required("Year is required").oneOf(Years, "Joining Year should be valid"),
    Batch: Yup.string().required("Batch is required").oneOf(Batch, "Batch should be valid"),
    Hostel: Yup.string().required("Hostel is required").oneOf(Hostels, "Hostel should be valid"),
    Phone: Yup.string().required("Phone is required").length(10, "Phone number should be valid"),
    Password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters").max(20, "Password must be less than 20 characters"),
    ConfirmPassword: Yup.string().oneOf([Yup.ref("Password"), null], "Passwords must match"),
    TermsAccepted: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
})