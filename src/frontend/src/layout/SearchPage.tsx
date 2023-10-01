import Map from "../components/Map"

import { Box, Button, Divider, TextField, Typography } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import DataTable from "../components/DataTable";


const SearchPage = () => {
    const [routeFound, setRouteFound] = useState(false)
    const [selectedStartDate, setSelectedStartDate] = useState<null | Date>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<null | Date>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDateChange = (date: Date | null, isStart: boolean) => {
        if (isStart) {
            setSelectedStartDate(date!!);
            if (selectedEndDate && date && date > selectedEndDate) {
                setError("Das „Von“-Datum darf nicht größer als das „Bis“-Datum sein");
            } else {
                setError(null);
            }
        } else {
            setSelectedEndDate(date!!);
            if (selectedStartDate && date && date < selectedStartDate) {
                setError("Das „Bis“-Datum darf nicht kleiner als das „Von“-Datum sein");
            } else {
                setError(null);
            }
        }
    };
    
    const handleRouteSearch = () => {
        setRouteFound(!routeFound)
    }

    return (
        <Box className="searchLayout" style={{ display: "flex", height: "100%" }}>
            <Box className="searchMapView" style={{ flex: 4, padding: "px" }}>
                <Map />
            </Box>
            <Box className="searchInputs" sx={{ display: "flex", flex: 1, flexDirection: "column", backgroundColor: "#f2f3f5", justifyContent: "space-evenly" }}>
                <Box sx={{ display: "flex", flex: 4, flexDirection: "column", justifyContent: "space-around", alignItems: "center", textAlign: "center", padding: "16px" }}>
                    <Typography variant="h5">
                        Welche Route suchen Sie?
                    </Typography>
                    <TextField label="Name" sx={{width: "15.5vw", minWidth: "270px"}}/>
                    <TextField label="Kennzeichen" sx={{width: "15.5vw", minWidth: "270px"}}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Von"
                    value={selectedStartDate}
                    onChange={(date) => handleDateChange(date, true)}
                    format="DD.MM.YYYY"
                    sx={{ width: "15.5vw", minWidth: "270px" }}
                    slotProps={{
                        textField: {
                            helperText: error, 
                        },
                    }}
                />
                <DatePicker
                    label="Bis"
                    value={selectedEndDate}
                    onChange={(date) => handleDateChange(date, false)}
                    format="DD.MM.YYYY"
                    slotProps={{
                        textField: {
                            helperText: error                        
                        },
                    }}
                    sx={{ width: "15.5vw", minWidth: "270px" }}
                />
            </LocalizationProvider>
                    <Button variant="contained" disabled={error != null} onClick={handleRouteSearch} sx={{minWidth: "7.8vw"}}>
                        Suche
                    </Button>
                </Box>
                <Divider sx={{ borderColor: "black", opacity: 0.25}} />
                <Box sx={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 16px" }}>
                    {routeFound ?
                        <DataTable/>
                        :
                        <Typography sx={{textAlign: "center", fontWeight: "700", userSelect: "none"}}>
                            Keine Routendaten vorhanden
                        </Typography>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default SearchPage