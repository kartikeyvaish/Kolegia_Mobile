// Pakcages imports
import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";

// types imports
import { PlaybackStatus, useAudioPlayerProps } from "../types/ComponentTypes";

// custom hook for useAudioPlayer
export default function useAudioPlayer({ uri, duration = 0 }: useAudioPlayerProps) {
    // Refs for the audio
    const AudioPlayer = useRef(new Audio.Sound());

    // States for UI
    const [IsPLaying, SetIsPLaying] = useState<boolean>(false);
    const [PlayerLoading, SetPlayerLoading] = useState<boolean>(false);
    const [Loaded, SetLoaded] = useState<boolean>(false);
    const [Duration, SetDuration] = useState<number>(duration);
    const [ElapsedTime, SetElapsedTime] = useState<number>(0);
    const [Progress, SetProgress] = useState<number>(0);

    // unload the player when the component unmounts
    useEffect(() => {
        return () => {
            if (AudioPlayer.current) AudioPlayer.current.unloadAsync();
        }
    }, []);

    const onProgress = async (event: PlaybackStatus) => {
        try {
            if (AudioPlayer.current) {
                const duration = event.durationMillis;
                const currentTime = event.positionMillis;
                const progress = (currentTime / duration);

                if (!isNaN(currentTime)) SetElapsedTime(currentTime);
                if (!isNaN(progress)) SetProgress(progress * 100);

                if (event.isLoaded === true) {
                    if (!Loaded) SetLoaded(true);
                }

                if (event.isPlaying === true) {
                    SetIsPLaying(true)
                } else if (event.isPlaying === false) {
                    SetIsPLaying(false)
                }

                if (event.didJustFinish === true) {
                    SetIsPLaying(false);
                    SetPlayerLoading(false);
                    SetElapsedTime(0);
                    SetProgress(0);

                    await AudioPlayer.current.stopAsync();
                }
            }
        } catch (error) {
            SetElapsedTime(0);
            SetProgress(0);
        }
    };

    // function to load the given uri
    const LoadAudio = async () => {
        try {
            if (!Loaded) {
                // Load the Recorded URI
                SetPlayerLoading(true);
                const player = await AudioPlayer.current.loadAsync({ uri }, {}, true);
                SetPlayerLoading(false);

                if (player.isLoaded) {
                    if (Duration !== player.durationMillis) SetDuration(player.durationMillis);
                    AudioPlayer.current.setOnPlaybackStatusUpdate(onProgress);
                    return { loaded: true };
                }

                return { loaded: false };
            } else {
                SetPlayerLoading(false);
                return { loaded: true };
            }
        } catch (error) {
            SetPlayerLoading(false);
            return { loaded: false };
        }
    };

    // Function to play the audio
    const PlayAudio = async () => {
        try {
            if (!IsPLaying) {
                if (Loaded) AudioPlayer.current.playAsync();
                else {
                    const loadResponse = await LoadAudio();

                    if (loadResponse.loaded) AudioPlayer.current.playAsync();
                }
            }
        } catch (error) {
        }
    };

    // function to pause the audio
    const PauseAudio = async () => {
        try {
            if (IsPLaying) {
                if (Loaded) AudioPlayer.current.pauseAsync();
            }
        } catch (error) {
            SetIsPLaying(false);
        }
    };

    // Function to stop the playing audio
    const StopPlaying = async () => {
        try {
            if (Loaded && IsPLaying) {
                await AudioPlayer.current.unloadAsync();
            }
        } catch (error) {
        };
    };

    // seek to a position
    const SeekPlayer = async (to: any) => {
        try {
            if (AudioPlayer.current) {
                let seekTo = Math.ceil(Duration * to / 100);
                if (Loaded) {
                    await AudioPlayer.current.setPositionAsync(seekTo);
                    await AudioPlayer.current.playAsync();
                } else {
                    PlayAudio();
                }
            }
        } catch (error) { }
    };

    // return the states and functions
    return { PlayAudio, StopPlaying, IsPLaying, PlayerLoading, PauseAudio, ElapsedTime, Duration, Progress, SeekPlayer };
}