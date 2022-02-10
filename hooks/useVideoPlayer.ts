// Packages Imports
import { Video } from "expo-av";
import { useRef, useState } from "react";

const multiplier = Math.pow(10, 1 || 0);

export interface useVideoPlayerProps { autoplay?: boolean }

export default function useVideoPlayer({ autoplay = true }: useVideoPlayerProps) {
    // refs
    const VideoPlayer = useRef<Video>(null);

    // Local States
    const [progress, Setprogress] = useState(0);
    const [IsPlaying, SetIsPlaying] = useState(autoplay);
    const [CurrentTime, SetCurrentTime] = useState(0);
    const [Duration, SetDuration] = useState(0);

    // a function to manage the video player progressUpdate update
    const onProgressUpdate = (progressUpdate: any) => {
        const duration = progressUpdate.durationMillis;
        const currentTime = progressUpdate.positionMillis;
        const progress = (currentTime / duration);

        Setprogress(Math.round(progress * multiplier) / multiplier);

        if (duration !== Duration) SetDuration(duration);

        if (currentTime !== CurrentTime) SetCurrentTime(currentTime);
    }

    // function to play the video
    const PlayVideo = async () => {
        try {
            if (VideoPlayer.current) {
                await VideoPlayer.current.playAsync();
                SetIsPlaying(true);
            } else {
                SetIsPlaying(false);
            }
        } catch (error) {
            SetIsPlaying(false);
        }
    };

    // function to pause the video
    const PauseVideo = async () => {
        try {
            if (VideoPlayer.current) {
                await VideoPlayer.current.pauseAsync();
                SetIsPlaying(false);
            } else {
                SetIsPlaying(false);
            }
        } catch (error) {
            SetIsPlaying(false);
        }
    };

    // toggle playback
    const TogglePlayback = async () => {
        try {
            if (IsPlaying) {
                await PauseVideo();
            } else {
                await PlayVideo();
            }
        } catch (error) {
        }
    };

    // function to seek the video
    const SeekVideo = async (to: any) => {
        try {
            if (VideoPlayer.current) {
                let percent = Math.ceil(to * 100);
                let seekTo = Math.ceil(Duration * percent / 100);
                await VideoPlayer.current.setPositionAsync(seekTo);
                await PlayVideo();
            }
        } catch (error) { }
    };

    // return
    return { onProgressUpdate, progress, VideoPlayer, IsPlaying, PlayVideo, PauseVideo, TogglePlayback, CurrentTime, Duration, SeekVideo };
}