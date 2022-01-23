// Packages Imports
import * as Yup from "yup";

export interface EditProfileProps {
    name?: string;
    email?: string;
    batch?: string;
    phone?: string;
    year?: string;
    roll_number?: string;
    hostel?: string;
    room_number?: string;
}

// EditProfile initial values
const EditProfileInitialValues: EditProfileProps = {
    name: "",
    email: "",
    batch: "",
    phone: "",
    year: "",
    hostel: "",
    roll_number: "",
    room_number: ""
};

// EditProfile validation schema
const EditProfileValidationSchema = () => Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().label("Email"),
    batch: Yup.string().required().label("Batch").length(3, "Batch must be 3 characters long"),
    phone: Yup.string().required().label("Phone").length(10).min(10).max(10),
    year: Yup.string().required().label("Year").length(4).min(4).max(4),
    hostel: Yup.string().required().label("Hostel"),
    roll_number: Yup.string().required().label("Roll Number"),
    room_number: Yup.string().required().label("Room Number")
}).unknown(true);

const EditProfileSchema = {
    EditProfileInitialValues,
    EditProfileValidationSchema,
}

export default EditProfileSchema;