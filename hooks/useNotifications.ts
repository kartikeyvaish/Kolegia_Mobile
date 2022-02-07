// Import Packages
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";

import configurations from "../config/config"

// Fucntion to get device FCM Token
async function GetDevicePushToken() {
    try {
        let fcmToken = await messaging().getToken();
        if (fcmToken) return fcmToken;
        else return null;
    } catch (error) {
        return null;
    }
}

// // largeIconUrl = Icon for topmost image url without expansion
// // bigLargeIconUrl = Icon for image when expanded icon logo
// // bigPictureUrl = expanded picture here
// This is a function to display local notifications to the user
export const showLocalNotification = (props) => {
    const {
        body = "",
        message = "",
        channelId = configurations.default_channel_id,
        ...otherProps
    } = props;

    if (body !== "" || message !== "") {
        PushNotification.localNotification({
            ...otherProps,
            message: body || message,
            channelId: channelId,
            importance: "high",
            visibility: "public",
        });
    }
};

export default function useNotifications(PushToken, SetPushToken) {
    useEffect(() => {
        Init();

        messaging().onMessage((message) => {
            showLocalNotification({ ...message.notification, ...message.data });
        });
    }, []);

    const Init = async () => {
        try {
            const token = await GetDevicePushToken();
            if (token && PushToken !== token) SetPushToken(token);
        } catch (error) { }
    };
}