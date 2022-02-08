// Packages Impors
import { useEffect, useState } from "react";
import { checkForUpdateAsync, fetchUpdateAsync, reloadAsync } from "expo-updates";

// Local Imports
import configs from "../config/config";
import Helper from './../utils/Helper';

// interface for useExpoUpdates hook
interface useExpoUpdatesProps {
    SetUpdateCheck?: any;
}

// custom hook to manage expo updates
export default function useExpoUpdates({ SetUpdateCheck }: useExpoUpdatesProps) {
    // Local States
    const [UpdateDownloading, SetUpdateDownloading] = useState(false);

    // Initial Check
    useEffect(() => {
        checkForUpdates();
    }, []);

    // Check for updates function
    const checkForUpdates = async () => {
        if (configs.mode !== "development") {
            const update = await checkForUpdateAsync();

            if (update.isAvailable) {
                if (typeof SetUpdateCheck === "function") {
                    SetUpdateCheck(true);
                }
            }
        } else {
            Helper.ShowToast("You are in development mode, no updates available");
        }
    };

    // download updates function
    const downloadUpdate = async () => {
        try {
            SetUpdateDownloading(true);

            const update = await checkForUpdateAsync();

            if (update.isAvailable) {
                Helper.ShowToast("Downloading Update...");
                await fetchUpdateAsync();

                SetUpdateCheck(false);
                SetUpdateDownloading(false);

                Helper.ShowToast("Installed Latest Update...");
                await reloadAsync();
            } else {
                SetUpdateDownloading(false);
                Helper.ShowToast("You are in development mode, no updates available");
            }
        } catch (error) {
            SetUpdateCheck(false);
            SetUpdateDownloading(false);
        }
    };

    // return object
    return { downloadUpdate, UpdateDownloading, checkForUpdates };
}