import React from "react";

interface GlobalContextProps {
  User?: any;
  SetUser?: any;
  OverlayVisible?: boolean;
  SetOverlayVisible?: any;
  Text?: string;
  SetText?: any;
  ToggleMode?: any;
}

const GlobalContext = React.createContext<GlobalContextProps>({});

export default GlobalContext;
