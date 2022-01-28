// packages Imports
import { useEffect } from "react";
import { BackHandler } from "react-native";

// A custom hook that handles the back button press.
export default function useBackHandler(handler: any) {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handler);

    return () => BackHandler.removeEventListener("hardwareBackPress", handler);
  }, [handler]);
}
