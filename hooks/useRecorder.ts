// Packages Improts
import { useRef, useState } from "react";
import { Audio } from "expo-av";

// types imports
import { useRecordingProps } from "../types/ComponentTypes";

// custom hook to record audio
export default function useRecording({ onComplete }: useRecordingProps) {
    // Refs for the recorder
    const AudioRecorder = useRef<Audio.Recording>(new Audio.Recording());

    // States for UI
    const [IsRecording, SetIsRecording] = useState<boolean>(false);
    const [Progress, SetProgress] = useState<number>(0);

    const onProgressUpdate = async (event: Audio.RecordingStatus) => {
        try {
            if (event.isDoneRecording) {
                // Get the recorded URI here
                const result = AudioRecorder.current.getURI();
                if (result) {
                    if (typeof onComplete === "function") onComplete(result);
                }
            }

            if (event.isRecording) SetProgress(event.durationMillis);
        } catch (error) {
            SetProgress(0);
        }
    };

    // Function to start recording
    const StartRecording = async () => {
        try {
            // get audio permissions
            const getAudioPerm = await Audio.requestPermissionsAsync();

            // check if permission is granted or not
            if (getAudioPerm.granted) {
                // Prepare the Audio Recorder
                await AudioRecorder.current.prepareToRecordAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );

                // Set update to a function
                AudioRecorder.current.setOnRecordingStatusUpdate(onProgressUpdate);

                // Start recording
                await AudioRecorder.current.startAsync();
                SetIsRecording(true);
            }
        } catch (error) {
            SetIsRecording(false);
        }
    };

    // Function to stop recording
    const StopRecording = async () => {
        try {
            // Stop recording
            await AudioRecorder.current.stopAndUnloadAsync();

            // Reset the Audio Recorder
            AudioRecorder.current = new Audio.Recording();
            SetIsRecording(false);
        } catch (error) {
            SetIsRecording(false);
        }
    };

    return { IsRecording, StartRecording, StopRecording, Progress };
}