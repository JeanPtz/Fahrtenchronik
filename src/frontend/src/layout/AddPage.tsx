import { Box, IconButton, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useCallback, useState, useRef } from "react";
import { uploadGpxFile } from "../apis/uploadGpxFile";

const AddPage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file?.name.toLowerCase().endsWith(".gpx")) {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleFileDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0] || null;
        setSelectedFile(file);
    }, []);

    const handleDeleteFile = () => {
        setSelectedFile(null);
        setMessage(null);
    };

    const handleFileUpload = async () => {
        if (!selectedFile?.name.toLowerCase().endsWith(".gpx")) {
            setMessage("Nur GPX Dateien sind zum Hochladen geeignet");
            return;
        }

        const formData = new FormData();
        formData.append("gpxFile", selectedFile);

        try {
            setLoading(true)
            const response = await uploadGpxFile(formData);
            if (response) {
                setSelectedFile(null);
                setLoading(false)
            } else {
                setMessage("Fehler beim Hochladen der Datei");
                setLoading(false)
            }
        } catch (error) {
            setMessage("Fehler beim Hochladen der Datei");
            setLoading(false)
        }
    };

    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}
        >
            <Box
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                sx={{
                    border: "2px dashed ",
                    textAlign: "center",
                    height: "400px",
                    width: "700px",
                    backgroundColor: "#edf0f1",
                }}
            >
                <Typography sx={{ width: "700px", padding: "20px", position: "absolute", textAlign: "center" }}>
                    Ziehen Sie eine GPX-Datei per Drag & Drop hierher <br /> oder klicken Sie, um eine auszuwählen
                </Typography>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".gpx"
                    onChange={handleFileChange}
                    style={{ display: "block", cursor: "pointer", opacity: 0, height: "400px", width: "700px" }}
                />
            </Box>

            {selectedFile && (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography sx={{ p: "10px" }}>Ausgesuchte Datei: {selectedFile.name}</Typography>
                    <Box sx={{ display: "flex" }}>
                        <LoadingButton
                            variant="contained"
                            color="primary"
                            onClick={handleFileUpload}
                            startIcon={<CloudUploadIcon />}
                            loading={loading}
                        >
                            Hochladen
                        </LoadingButton>
                        <IconButton title="Datei löschen" onClick={handleDeleteFile}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                    {message && <Typography sx={{ color: "red" }}>{message}</Typography>}
                </Box>
            )}
        </Box>
    );
};

export default AddPage;
