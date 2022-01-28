// packages Imports
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";

interface selectedFileProps {
    type?: 'success' | 'cancel';
    name?: string;
    size?: number;
    uri?: string;
    mimeType?: string;
    lastModified?: number;
    file?: File;
    [key: string]: any;
}

// custom hook to pick documents from the user's device
export default function useDocumentPicker() {
    const [selectedFile, setSelectedFile] = useState<selectedFileProps>(null);

    // Remove selected file
    const unselectFile = () => {
        try {
            if (selectedFile !== null) setSelectedFile(null);
        } catch (error) { }
    };

    // function to pick document
    const PickDocument = async () => {
        try {
            const picked = await DocumentPicker.getDocumentAsync({});
            if (picked.type !== "cancel") {
                setSelectedFile(picked);
                return;
            }

            setSelectedFile(null);
        } catch (error) {
            setSelectedFile(null);
        }
    };

    return { selectedFile, PickDocument, unselectFile, setSelectedFile };
}