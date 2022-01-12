// Packages Imports
import * as Yup from "yup";

// BuyProduct initial values
export const BuyProductInitialValues = {
    name: "",
    price: "",
    description: "",
    category: "",
    files: [],
    purchase_datetime: "",
    type: "BUY_SELL"
};

// validation schema
export const BuyProductValidationSchema = () => Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.string().required("Price is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    purchase_datetime: Yup.string().required("Purchase date is required"),
})