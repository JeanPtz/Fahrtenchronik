import { Box, Button, IconButton, Typography, } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback, useState } from "react";

const AboutPage = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file!!);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleFileDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
    }, []);

    const handleChangeFile = () => {
        setSelectedFile(null);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('File uploaded successfully');
                setSelectedFile(null);
            } else {
                alert('Error uploading file');
            }
        } catch (error) {
            console.error('Error uploading file', error);
        }
    };

    return (
        <Box style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Box
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                sx={{
                    border: '2px dashed ',
                    textAlign: 'center',
                    cursor: 'pointer',
                    height: "400px",
                    width: "700px",
                    backgroundColor: "#edf0f1"
                }}
            >
                <Typography sx={{ padding: "20px" }}>
                    Ziehen Sie eine GPX-Datei per Drag & Drop hierher <br /> oder klicken Sie, um eine auszuwählen
                </Typography>
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
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
                </Box>
            )}
        </Box>
    );
};

export default AboutPage;