import Map from "../components/Map"

import { Box, Button, Divider, FormControl, FormHelperText, TextField, Typography } from "@mui/material";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react";
import { DateTime } from 'luxon';
import DataTable from "../components/DataTable";
import { searchRoutes } from "../apis/SearchApi";


const SearchPage = () => {
    const [routeFound, setRouteFound] = useState(false)
    const [driverName, setdriverName] = useState<string>("")
    const [licensePlate, setlicensePlate] = useState<string>("")
    const [selectedStartDate, setSelectedStartDate] = useState<null | DateTime>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<null | DateTime>(null);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [fromErrorMessage, setFromErrorMessage] = useState<string | null>(null)
    const [toErrorMessage, setToErrorMessage] = useState<string | null>(null)
    const [error, setError] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const getDriverName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setdriverName(event.target.value)
    }

    const getLicensePlate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setlicensePlate(event.target.value)
    }

    const handleDateChange = (date: DateTime | null, isFromDate: boolean) => {
        if (isFromDate) {
          setSelectedStartDate(date);
          if (selectedEndDate && date && date > selectedEndDate) {
            setFromErrorMessage("Das „Von“-Datum darf nicht größer als das „Bis“-Datum sein");
            setError(true);
          } else {
            const zuluDate = date!!.toUTC().toISO({ format: 'extended' });
            setStartDate(zuluDate!!)
            setFromErrorMessage(null);
            setToErrorMessage(null)
            setError(false);
          }
        } else {
          setSelectedEndDate(date);
          if (selectedStartDate && date && date < selectedStartDate) {
            setToErrorMessage("Das „Bis“-Datum darf nicht kleiner als das „Von“-Datum sein");
            setError(true);
          } else {
            const zuluDate = date!!.toUTC().toISO({ format: 'extended' });
            setEndDate(zuluDate!!)
            setToErrorMessage(null);
            setFromErrorMessage(null);
            setError(false);
          }
        }
      };

    const handleRouteSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setRouteFound(!routeFound)
        console.log(startDate)
        console.log(endDate)
        //searchRoutes(driverName, licensePlate, startDate, endDate)
    }

    useEffect(() => {
        setIsButtonDisabled(driverName === "" || licensePlate === "" || startDate === "" || endDate === "" || error === true)
    })

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
                    <TextField label="Name" value={driverName} onChange={getDriverName} sx={{ width: "15.5vw", minWidth: "270px" }} />
                    <TextField label="Kennzeichen" value={licensePlate} onChange={getLicensePlate} sx={{ width: "15.5vw", minWidth: "270px" }} />
                    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de-DE">
                        <FormControl>
                            <DatePicker
                                label="Von"
                                value={selectedStartDate}
                                onChange={(date) => handleDateChange(date, true)}
                                format="dd.MM.yyyy"
                                sx={{ width: "15.5vw", minWidth: "270px" }}
                            />
                            <FormHelperText sx={{ color: "red", maxWidth: "270px" }}>{fromErrorMessage}</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <DatePicker
                                label="Bis"
                                value={selectedEndDate}
                                onChange={(date) => handleDateChange(date, false)}
                                format="dd.MM.yyyy"
                                sx={{ width: "15.5vw", minWidth: "270px" }}
                            />
                            <FormHelperText sx={{ color: "red", maxWidth: "270px" }}>{toErrorMessage}</FormHelperText>
                        </FormControl>
                    </LocalizationProvider>
                    <Button variant="contained" disabled={isButtonDisabled} onClick={handleRouteSearch} sx={{ minWidth: "7.8vw" }}>
                        Suche
                    </Button>
                </Box>
                <Divider sx={{ borderColor: "black", opacity: 0.25 }} />
                <Box sx={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 16px" }}>
                    {routeFound ?
                        <DataTable />
                        :
                        <Typography sx={{ textAlign: "center", fontWeight: "700", userSelect: "none" }}>
                            Keine Routendaten vorhanden
                        </Typography>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default SearchPage