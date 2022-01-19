// Packages Imports
import * as Yup from "yup";

// Possible Years
const Years = [
    "2017", "2018",
    "2019", "2020",
    "2021", "2022",
]

// Possible Batches
const Batch = [
    "BCS", "IMG", "IMT"
]

// Possible Hostels
const Hostels = [
    "BH-1", "BH-2", "BH-3", "GH-1"
]

// Terms and Conditions message
const TermsAndConditionsMessage = `By signing up, you agree to our Terms of Service and Privacy Policy.`

// Login initial values
const RegisterInitialValues = {
    name: "",
    email: "",
    roll_number: "",
    year: "",
    batch: "",
    hostel: "",
    phone: "",
    password: "",
    confirm_password: "",
    terms_accepted: false
};


// validation schema
const RegisterValidationSchema = () => Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    roll_number: Yup.string().required("Roll Number is required"),
    year: Yup.string().required("Year is required").oneOf(Years, "Year is invalid"),
    batch: Yup.string().required("Batch is required").oneOf(Batch, "Batch is invalid"),
    hostel: Yup.string().required("Hostel is required").oneOf(Hostels, "Hostel should be valid"),
    phone: Yup.string().required("Phone is required").length(10, "Phone number should be valid"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters").max(20, "Password must be less than 20 characters"),
    confirm_password: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
    terms_accepted: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
})

const RegisterSchema = {
    RegisterInitialValues,
    RegisterValidationSchema,
    Years,
    Batch,
    Hostels,
    TermsAndConditionsMessage,
}

export default RegisterSchema;