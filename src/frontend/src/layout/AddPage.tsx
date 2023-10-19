import { Box, Button, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useState, useRef } from "react";

const AboutPage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (selectedFile?.name.toLowerCase().endsWith(".gpx"))
            setSelectedFile(file);
        else
            setSelectedFile(null)
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleFileDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0] || null;
        setSelectedFile(file);

    }, []);

    const handleChangeFile = () => {
        setSelectedFile(null);
        setMessage(null);
    };

    const handleFileUpload = async () => {
        if (!selectedFile?.name.toLowerCase().endsWith(".gpx")) {
            setMessage("Nur GPX Dateien sind zum hochladen geeignet");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setMessage("Datei erfolgreich hochgeladen");
                setSelectedFile(null);
            } else {
                setMessage("Fehler beim hochladen der Datei");
            }
        } catch (error) {
            setMessage("Fehler beim hochladen der Datei");
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
                    style={{ display: "block", cursor: "pointer", opacity: 0, height: "400px", width: "700px", }}
                />
            </Box>

            {selectedFile && (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography sx={{ p: "10px" }}>Ausgesuchte Datei: {selectedFile.name}</Typography>
                    <Box sx={{ display: "flex" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleFileUpload}
                        >
                            Hochladen
                        </Button>
                        <IconButton title="Datei Ändern" onClick={handleChangeFile}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                    {message && <Typography sx={{ color: "red" }}>{message}</Typography>}
                </Box>
            )}
        </Box>
    );
};

export default AboutPage;
