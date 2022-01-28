// packages imports
import env_variables from "react-native-config";

// types imports
import { ConfigProps } from './../types/ConfigTypes';

const { __DEV__, DEV_BASE_URL, PROD_BASE_URL, ...restEnv } = env_variables;

// Prepare the export object
const configurations: ConfigProps = {
    baseUrl: __DEV__ === "development" ? DEV_BASE_URL : PROD_BASE_URL,
    ...restEnv
}

// Exports
export default configurations;
