import { useEffect } from "react";
import { BackHandler } from "react-native";

export default function useBackHandler(handler: any) {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handler);

    return () => BackHandler.removeEventListener("hardwareBackPress", handler);
  }, [handler]);
}
