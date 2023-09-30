import { Paper, Typography } from "@mui/material";


const AboutPage = () => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={10} sx={{ mt: 6, p: 2, height: "auto", width: "500px", backgroundColor: "rgba(255, 255, 255, 0.8)" }} >
                <Typography variant="h4" gutterBottom>
                    Über "Fahrtenchronik" 
                </Typography>
                <Typography variant="body1">
                    Willkommen auf der Über-Seite des Schulprojekts „Fahrtenchronik“ von JeanPtz.
                </Typography>
            </Paper>
        </div>
    );
};

export default AboutPage;