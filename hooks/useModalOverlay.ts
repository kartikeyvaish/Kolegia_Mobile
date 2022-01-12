import { useState } from "react";

export default function useModalOverlay() {
    // Local States
    const [OverlayVisible, SetOverlayVisible] = useState(false);
    const [Text, SetText] = useState("Loading...");

    return {
        OverlayVisible,
        SetOverlayVisible,
        Text,
        SetText
    }
}