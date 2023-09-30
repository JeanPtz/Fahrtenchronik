import Map from "../components/Map"

import { Box, Button, Divider, TextField, Typography } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const SearchPage = () => {

    return (
        <Box className="searchLayout" style={{ display: "flex", height: "100%" }}>
            <Box className="searchMapView" style={{ flex: 4, padding: "px" }}>
                <Map />
            </Box>
            <Box className="searchInputs" sx={{ display: "flex", flex: 1, flexDirection: "column", backgroundColor: "#f2f3f5", justifyContent: "space-evenly" }}>
                <Box sx={{ display: "flex", flex: 4, flexDirection: "column", justifyContent: "space-around", padding: "16px" }}>
                    <Typography>
                        Welche Route suchen Sie?
                    </Typography>
                    <TextField label="Name" />
                    <TextField label="Kennezeichen" />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Von" />
                        <DatePicker label="Bis" />
                    </LocalizationProvider>
                    <Button variant="contained">
                        Suche
                    </Button>
                </Box>
                <Divider sx={{ borderBottomWidth: "4px", color: "black" }} />
                <Box sx={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-around", padding: "16px" }}>
                    <table border={1}>
                        <tr>
                            <td>Zurückgelegte Strecke</td>
                            <td>50km</td>
                        </tr>
                        <tr>
                            <td>Durchschnittlsgeschwindigkeit</td>
                            <td>50km/h</td>
                        </tr>
                        <tr>
                            <td>Gesamtfahrtdauer</td>
                            <td>1:35h</td>
                        </tr>
                    </table>
                </Box>
            </Box>
        </Box>
    )
}

export default SearchPage