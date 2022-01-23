// Packages Imports
import * as Yup from "yup";

export interface RequirementProps {
    title?: string;
    description?: string;
}

// Requirement initial values
const RequirmentInitialValues: RequirementProps = {
    title: "",
    description: "",
};

// Requirement validation schema
const RequirementValidationSchema = () => Yup.object().shape({
    title: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
}).unknown(true);

const RequirmentSchema = {
    RequirmentInitialValues,
    RequirementValidationSchema,
}

export default RequirmentSchema;