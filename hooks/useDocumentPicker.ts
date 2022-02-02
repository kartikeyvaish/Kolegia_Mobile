// packages Imports
import { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";

interface selectedFileProps {
    type?: 'success' | 'cancel';
    name?: string;
    size?: number;
    uri?: string;
    mimeType?: string;
    lastModified?: number;
    file?: File;
    message?: string;
    [key: string]: any;
}

// custom hook to pick documents from the user's device
export default function useDocumentPicker({ initial_file = null }: { initial_file?: selectedFileProps }) {
    const [selectedFile, setSelectedFile] = useState<selectedFileProps>(initial_file);
    const [SameAsInitial, SetSameAsInitial] = useState(true);

    // keep track that files has changed
    useEffect(() => {
        if (initial_file === null && selectedFile === null) SetSameAsInitial(true)
        else {
            if (selectedFile?.uri === initial_file?.uri) SetSameAsInitial(true);
            else SetSameAsInitial(false);
        }
    }, [selectedFile]);

    // Remove selected file
    const unselectFile = () => {
        try {
            if (selectedFile !== null) setSelectedFile(initial_file);
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

            setSelectedFile(initial_file);
        } catch (error) {
            setSelectedFile(initial_file);
        }
    };

    return { selectedFile, PickDocument, unselectFile, setSelectedFile, SameAsInitial };
}