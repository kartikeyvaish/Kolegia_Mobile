// Packages Imports
import * as Yup from "yup";

export interface LostFoundInitialValuesProps {
    name?: string;
    description?: string;
}

// supported file types
const supported_file_types = [
    "image/jpeg",
    "video/mp4",
    "image/png",
    "image/jpg",
    "video/mkv",
];

// BuyProduct initial values
const LostFoundInitialValues: LostFoundInitialValuesProps = {
    name: "",
    description: "",
};

// validation schema
const LostFoundValidationSchema = () => Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
}).unknown(true);

const LostFoundSchema = {
    LostFoundInitialValues,
    LostFoundValidationSchema,
    supported_file_types,
}

export default LostFoundSchema;