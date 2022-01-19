// Packages Imports
import * as Yup from "yup";

export interface BuyProductInitialValuesProps {
    name?: string;
    description?: string;
    price?: number;
}

// BuyProduct initial values
const BuyProductInitialValues: BuyProductInitialValuesProps = {
    name: "",
    price: 0,
    description: "",
};

// supported file types
const supported_file_types = [
    "image/jpeg",
    "video/mp4",
    "image/png",
    "image/jpg",
    "video/mkv",
];

// validation schema
const BuyProductValidationSchema = () => Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    description: Yup.string().required("Description is required"),
}).unknown(true);

const BuySellSchema = {
    BuyProductInitialValues,
    supported_file_types,
    BuyProductValidationSchema,
}

export default BuySellSchema;