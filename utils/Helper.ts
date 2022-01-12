// Packages imports
import { Alert, ToastAndroid, AlertButton, AlertOptions } from "react-native"

// Helper function to show toast
export const ShowToast = (message: string, duration: number = 3000) => {
    ToastAndroid.show(message, duration)
}

// Helper function to show Alert boxes
export const ShowAlert = (title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) => {
    Alert.alert(
        title,
        message,
        buttons,
        options
    );
}

// generate a random unique _id
export const GenerateUniqueID = () => {
    return Math.floor(Math.random() * Date.now()).toString();
}