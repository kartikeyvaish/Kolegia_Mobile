// Packages Imports
import * as ImagePicker from 'expo-image-picker';

interface useCameraProps {
    onCapture?: (data: any) => void;
}

// Camera Hook
export default function useCamera({ onCapture }: useCameraProps) {
    const Capture = async () => {
        try {
            const permission = await ImagePicker.requestCameraPermissionsAsync();
            if (permission.granted === false) return null;


            const capture: any = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                quality: 1,
            });

            if (capture.cancelled) return null;

            const payload = {
                ...capture,
                name: `useCameraClickerAndroid.${capture.uri.split('.').pop()}`,
                mimeType: `image/${capture.uri.split('.').pop()}`,
            }

            if (typeof onCapture === "function") onCapture(payload);
        } catch (error) {
            return null;
        }
    };

    return { Capture };
}