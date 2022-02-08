// Packages Imports
import { useState, useEffect, } from "react";
import { BackHandler } from "react-native";

interface useLoadingOverlayProps {
    onBackPress?: () => void;
    disableBackPressWhileLoading?: boolean;
    closeOnBackPress?: boolean;
}

// exporting function useLoadingOverlay
export default function useLoadingOverlay(props: useLoadingOverlayProps) {
    // Destructuring props
    const { onBackPress, disableBackPressWhileLoading = true, closeOnBackPress = false } = props;

    // local state
    const [IsLoading, SetIsLoading] = useState<boolean>(false);
    const [OverlayText, SetOverlayText] = useState<string>("Loading...");

    // back handler function
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", HandleBackPress);

        return () => BackHandler.removeEventListener("hardwareBackPress", HandleBackPress);
    }, [HandleBackPress]);

    // handle back press
    function HandleBackPress() {
        // Custom back press function
        if (typeof onBackPress === "function") {
            onBackPress();
        }

        if (disableBackPressWhileLoading) {
            if (IsLoading) {
                return true;
            }
            else {
                return false;
            }
        } else {
            if (closeOnBackPress) {
                return true;
            } else {
                return false;
            }
        }
    }

    // returning object
    return { IsLoading, SetIsLoading, OverlayText, SetOverlayText };
}