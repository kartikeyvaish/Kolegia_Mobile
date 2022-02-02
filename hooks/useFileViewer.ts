import { useState } from "react";

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

export default function useFileViewer() {
    const [viewing_file, Setviewing_file] = useState<selectedFileProps>(null);

    const stop_viewing = () => {
        try {
            if (viewing_file !== null) Setviewing_file(null);
        } catch (error) { }
    };

    const view_file = (file: selectedFileProps) => {
        try {
            Setviewing_file(file);
        } catch (error) { }
    };

    return { viewing_file, view_file, stop_viewing };
}