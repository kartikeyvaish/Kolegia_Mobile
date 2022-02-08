// packages imports
import env_variables from "react-native-config";

// types imports
import { ConfigProps } from './../types/ConfigTypes';

const { mode, DEV_BASE_URL, PROD_BASE_URL } = env_variables;

// Prepare the export object
const configurations: ConfigProps = {
    baseUrl: mode === "development" ? DEV_BASE_URL : PROD_BASE_URL,
    ...env_variables
}

// Exports
export default configurations;
