// Modules imports
import { createContext } from "react";

// Local Imports
import { GlobalContextProps } from "../types/ComponentTypes";

// Context
const GlobalContext = createContext<GlobalContextProps>({});

// exports
export default GlobalContext;
