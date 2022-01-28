// A custom hook that returns the Loading state of the component.
// Also if the Loading is true, and user presses the back button,

// packages Imports
import { useEffect, useState } from "react";
import { BackHandler } from "react-native";

interface useLoadingProps {
    initialValue?: boolean;
    onBackPress?: () => void;
}

// back handler will prevent the user from going back to the previous page.
export default function useLoading(props: useLoadingProps) {
    const [Loading, SetLoading] = useState<boolean>(props.initialValue || false);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", HandleBackPress);

        return () => BackHandler.removeEventListener("hardwareBackPress", HandleBackPress);
    }, [HandleBackPress]);

    // handle back press
    function HandleBackPress() {
        if (Loading) {
            if (typeof props.onBackPress === "function") {
                props.onBackPress();
            }
            return true;
        }

        return false;
    }

    return { Loading, SetLoading };

}