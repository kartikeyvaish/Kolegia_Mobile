// Packages Imports
import { checkForUpdateAsync, fetchUpdateAsync, reloadAsync } from "expo-updates";

// Local Imports
import configs from "../config/config";
import Helper from './../utils/Helper';

// custom hook to manage expo updates
export default function useExpoUpdates() {
    // Check for updates function
    const checkForUpdates = async () => {
        if (configs.mode !== "development") {
            const update = await checkForUpdateAsync();

            if (update.isAvailable) {
                Helper.ShowToast("Downloading Update...");
                await fetchUpdateAsync();
                Helper.ShowToast("Installed Latest Update...");
                await reloadAsync();
            } else {
                Helper.ShowToast("Already on Latest Version.");
            }
        }
    };

    // return object
    return { checkForUpdates };
}