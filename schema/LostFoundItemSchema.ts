// Packages Imports
import * as Yup from "yup";

// LOCAL IMPORTS
import { AppPickerItemProps } from "../types/ComponentTypes";
import ColorPallete from "../utils/ColorPallete";
import IconNames from "../constants/IconNames";

export interface LostFoundInitialValuesProps {
    name?: string;
    description?: string;
    brand?: string;
    category?: string;
    color?: string;
    lost_date?: string;
    lost_time?: string;
    lost_location?: string;
}

// supported file types
const supported_file_types = [
    "image/jpeg",
    "video/mp4",
    "image/png",
    "image/jpg",
];

// List of categories for the product
export const LOST_FOUND_CATEGORY: Array<AppPickerItemProps> = [
    {
        _id: "99",
        label: "Select Category",
        value: "Select Category",
    },
    {
        _id: "1",
        label: "Electronics",
        value: "Electronics",
        iconProps: {
            family: IconNames.MaterialIcons,
            name: "devices-other",
            size: 30,
            color: ColorPallete.googleColor
        },
    },
    {
        _id: "2",
        label: "Fashion",
        value: "Fashion",
        iconProps: {
            family: IconNames.Ionicons,
            name: "ios-shirt",
            size: 30,
            color: ColorPallete.pinkRed
        },
    },
    {
        _id: "3",
        label: "Home & Garden",
        value: "Home & Garden",
        iconProps: {
            family: IconNames.AntDesign,
            name: "home",
            size: 30,
            color: ColorPallete.green
        },
    },
    {
        _id: "4",
        label: "Sports & Outdoors",
        value: "Sports & Outdoors",
        iconProps: {
            family: IconNames.MaterialIcons,
            name: "sports-cricket",
            size: 30,
            color: ColorPallete.purple
        },
    },
    {
        _id: "5",
        label: "Toys & Games",
        value: "Toys & Games",
        iconProps: {
            family: IconNames.MaterialIcons,
            name: "videogame-asset",
            size: 30,
            color: ColorPallete.primary
        },
    },
    {
        _id: "6",
        label: "Health & Beauty",
        value: "Health & Beauty",
        iconProps: {
            family: IconNames.FontAwesome,
            name: "hospital-o",
            size: 30,
            color: ColorPallete.lightgreen
        },
    },
    {
        _id: "7",
        label: "Automotive",
        value: "Automotive",
        iconProps: {
            family: IconNames.AntDesign,
            name: "car",
            size: 30,
            color: ColorPallete.warning
        },
    },
    {
        _id: '8',
        label: "Books & Audible",
        value: "Books & Audible",
        iconProps: {
            family: IconNames.MaterialIcons,
            name: "library-books",
            size: 30,
            color: ColorPallete.pinkRed
        },
    },
    {
        _id: "9",
        label: "Other",
        value: "Other",
        iconProps: {
            family: IconNames.MaterialIcons,
            name: "category",
            size: 30,
            color: ColorPallete.purple
        },
    },
];

// BuyProduct initial values
const LostFoundInitialValues: LostFoundInitialValuesProps = {
    name: "",
    description: "",
    brand: "",
    category: "",
    color: "",
    lost_date: "",
    lost_time: "",
    lost_location: "",
};

// validation schema
const LostFoundValidationSchema = () => Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    brand: Yup.string(),
    category: Yup.string(),
    color: Yup.string(),
    lost_date: Yup.string().nullable().optional(),
    lost_time: Yup.string().nullable().optional(),
    lost_location: Yup.string(),
}).unknown(true);

const LostFoundSchema = {
    LostFoundInitialValues,
    LostFoundValidationSchema,
    supported_file_types,
}

export default LostFoundSchema;