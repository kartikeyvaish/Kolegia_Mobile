import { useState } from "react";

export default function useModalOverlay() {
    // Local States
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState("Loading...");

    return {
        visible,
        setVisible,
        text,
        setText
    }
}