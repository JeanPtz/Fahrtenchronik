import { Paper, Typography } from "@mui/material";


const AboutPage = () => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={10} sx={{ mt: 6, p: 2, height: "auto", width: "700px", backgroundColor: "rgba(255, 255, 255, 0.8)" }} >
                <Typography variant="h4" gutterBottom>
                    Über "Fahrtenchronik" 
                </Typography>
                <Typography variant="body1">
                    Willkommen auf der Über-Seite des Schulprojekts „Fahrtenchronik“ von JeanPtz.
                </Typography>
                <Typography variant="h5">
                    <br/>Das Projekt
                </Typography>
                <Typography variant="body1">
                Meine Web-App ermöglicht die Verarbeitung von GPX-Daten und die übersichtliche Darstellung auf einer Karte. 
                Dieses Projekt vereint Technologie und Benutzerfreundlichkeit, 
                um GPX-Tracks zu organisieren und anzuzeigen.
                </Typography>
                <Typography variant="h5">
                    <br/>Meine Mission
                </Typography>
                <Typography variant="body1">
                    Meine Mission ist es, 
                    GPX-Daten auf einer übersichtlichen Karte darzustellen und die Datenverarbeitung zu vereinfachen. 
                    Diese Web-App ist das Ergebnis meiner Leidenschaft für Technologie und Benutzerfreundlichkeit.
                </Typography>
                <Typography variant="h5">
                    <br/>Über Mich
                </Typography>
                <Typography variant="body1">
                Ich bin ein leidenschaftlicher Entwickler und Schüler, 
                der sich der Qualität, Benutzerfreundlichkeit und Innovation verschrieben hat. 
                Als Einzelkämpfer stehe ich hinter jeder Zeile Code und jeder Funktion dieser Anwendung.
                </Typography>
                <Typography variant="h5">
                    <br/>Meine Werte
                </Typography>
                <Typography variant="body1">
                    - Qualität: Ich lege Wert auf höchste Qualitätsstandards.<br/>
                    - Nutzerfreundlichkeit: Meine Projekte müssen einfach und effizient bedienbar sein.<br/>
                    - Sicherheit: Der Schutz Ihrer Daten hat oberste Priorität.<br/>
                    - Transparenz: Offenheit und Ehrlichkeit sind mir wichtig.
                </Typography>
            </Paper>
        </div>
    );
};

export default AboutPage;