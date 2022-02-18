// Packages Imports
import * as Yup from "yup";

export interface BuyProductInitialValuesProps {
    name?: string;
    description?: string;
    price?: number;
    brand?: string;
    category?: string;
    other_category_name?: string;
    color?: string;
    bought_datetime?: string;
    warranty_till?: string;
}

// BuyProduct initial values
const BuyProductInitialValues: BuyProductInitialValuesProps = {
    name: "",
    price: 0,
    description: "",
    brand: "",
    category: "",
    color: "",
    bought_datetime: "",
    warranty_till: "",
    other_category_name: "",
};

// supported file types
const supported_file_types = [
    "image/jpeg",
    "video/mp4",
    "image/png",
    "image/jpg",
];

// validation schema
const BuyProductValidationSchema = () => Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().min(1, "Price is required").required("Price is required"),
    description: Yup.string().required("Description is required"),
    brand: Yup.string().required("Brand is required"),
    category: Yup.string().required("Category is required"),
    other_category_name: Yup.string().when("category", {
        is: "Other",
        then: Yup.string().required("Other Category Name is required"),
        otherwise: Yup.string().optional().nullable(),
    }),
    color: Yup.string().required("Color is required"),
    bought_datetime: Yup.string().nullable().optional().required("Bought date is required"),
    warranty_till: Yup.string().nullable().optional().required("Warranty Date is required"),
}).unknown(true);

const BuySellSchema = {
    BuyProductInitialValues,
    supported_file_types,
    BuyProductValidationSchema,
}

export default BuySellSchema;