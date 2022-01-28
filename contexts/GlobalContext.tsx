import React from "react";

interface GlobalContextProps {
  User?: any;
  SetUser?: any;
  visible?: boolean;
  setVisible?: any;
  text?: string;
  setText?: any;
  ToggleMode?: any;
  [key: string]: any;
}

const GlobalContext = React.createContext<GlobalContextProps>({});

export default GlobalContext;
