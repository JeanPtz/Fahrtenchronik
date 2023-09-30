import Map from "../components/Map"

import { Box, Button, Divider, TextField, Typography } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";


const SearchPage = () => {

    const [selectedStartDate, setSelectedStartDate] = useState();
    const [selectedEndDate, setSelectedEndDate] = useState();
    const [routeFound, setRouteFound] = useState(false)

    const handleRouteSearch = () => {
        setRouteFound(!routeFound)
    }

    const handleStartDateChange = () => {
        setSelectedStartDate(selectedStartDate);
    };

    const handleEndDateChange = () => {
        setSelectedEndDate(selectedEndDate);
    };

    return (
        <Box className="searchLayout" style={{ display: "flex", height: "100%" }}>
            <Box className="searchMapView" style={{ flex: 4, padding: "px" }}>
                <Map />
            </Box>
            <Box className="searchInputs" sx={{ display: "flex", flex: 1, flexDirection: "column", backgroundColor: "#f2f3f5", justifyContent: "space-evenly" }}>
                <Box sx={{ display: "flex", flex: 4, flexDirection: "column", justifyContent: "space-around", textAlign: "center", padding: "16px" }}>
                    <Typography variant="h5">
                        Welche Route suchen Sie?
                    </Typography>
                    <TextField label="Name" />
                    <TextField label="Kennzeichen" />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Von" value={selectedStartDate} onChange={handleStartDateChange} format="DD-MM-YYYY" />
                        <DatePicker label="Bis" value={selectedEndDate} onChange={handleEndDateChange} format="DD-MM-YYYY" />
                    </LocalizationProvider>
                    <Button variant="contained" onClick={handleRouteSearch}>
                        Suche
                    </Button>
                </Box>
                <Divider sx={{ borderColor: "black" }} />
                <Box sx={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", padding: "0 16px" }}>
                    {routeFound ?
                        <table border={1}>
                            <tbody>
                                <tr>
                                    <td>Zurückgelegte Strecke</td>
                                    <td>50km</td>
                                </tr>
                                <tr>
                                    <td>Durchschnittsgeschwindigkeit</td>
                                    <td>50km/h</td>
                                </tr>
                                <tr>
                                    <td>Gesamtfahrtdauer</td>
                                    <td>1:35h</td>
                                </tr>
                            </tbody>
                        </table>
                        :
                        <Typography sx={{textAlign: "center", fontWeight: "700"}}>
                            Keine Routendaten vorhanden
                        </Typography>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default SearchPage