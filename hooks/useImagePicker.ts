// Packages Imports
import { useEffect, useRef, useState } from "react";
import * as DocumentPicker from "expo-document-picker";

// Local Imports
import Helper from "../utils/Helper";

// Constants
const supported_file_types = [
    "image/jpeg",
    "video/mp4",
    "image/png",
    "image/jpg",
    "video/mkv",
];

// Default File Limit
const DEFAULT_FILE_LIMIT = 5;

// useImagePicker hook
export default function useImagePicker({ limit = DEFAULT_FILE_LIMIT, initial_files = [] }) {
    // ref to keep count of images
    const picked_count = useRef(initial_files.length);
    // ref to keep track of deleted Files
    const deleted_files = useRef([]);

    // Local State to store picked images
    const [Files, SetFiles] = useState(initial_files);

    // Whenever Files array changes, update picked_count
    useEffect(() => {
        picked_count.current = Files.length;
    }, [Files])

    // function to pick image
    const PickDocument = async () => {
        try {
            // Check if limit is less than current count
            if (picked_count.current >= limit) {
                Helper.ShowToast("You can only pick " + limit + " files");
                return { document: null, ok: false, message: `You have already picked ${picked_count.current} files` }
            }

            // Pick the file
            const pickedFile = await DocumentPicker.getDocumentAsync({
                type: supported_file_types,
            });

            // if user did not cancel the picker, then add it to the state
            if (pickedFile.type === "success") {
                let unique_id = Helper.GenerateUniqueID();

                let document = { _id: unique_id, ...pickedFile };

                SetFiles([...Files, document]);

                return { document: document, ok: true }
            }
        } catch (error) {
            return { document: null, ok: false, message: "Some Error Occurred." }
        }
    };

    // function to remove image
    const RemoveDocument = async (_id: any) => {
        try {
            let files = [...Files];

            // finc index of the file to be deleted
            let index = files.findIndex((file) => file._id === _id);

            // if the file is not found then return
            if (index === -1) return;

            // if file is found push it into the deleted_files array
            if (files[index].public_id)
                deleted_files.current.push(files[index].public_id);

            // if the file is found then delete it from the array
            files.splice(index, 1);

            SetFiles(files);

            return;
        } catch (error) {
            return;
        }
    };

    return { PickDocument, RemoveDocument, Files, deleted_files: deleted_files.current };
}