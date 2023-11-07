import Map from "../components/Map"

import { Box, Button, Divider, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from "@mui/material";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react";
import { DateTime } from 'luxon';
import DataTable from "../components/DataTable";
import { searchRoute } from "../apis/searchRoute";
import { LatLngTuple } from "leaflet";
import { getDriverNames } from "../apis/getDriverNames";
import { getLicensePlate } from "../apis/getLicensePlates";

const SearchPage = () => {
    const [routeFound, setRouteFound] = useState(false)
    const [coordinates, setCoordinates] = useState<LatLngTuple[]>([]);
    const [driverNames, setDriverNames] = useState<string[]>([""]);
    const [filteredDriverNames, setFilteredDriverNames] = useState<string[]>([""]);
    const [selectedDriverName, setSelectedDriverName] = useState<string>("");
    const [licensePlates, setLicensePlates] = useState<string[]>([""]);
    const [filteredLicensePlates, setFilteredLicensePlates] = useState<string[]>([""]);
    const [selectedLicensePlate, setSelectedLicensePlate] = useState<string>("");
    const [selectedStartDate, setSelectedStartDate] = useState<null | DateTime>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<null | DateTime>(null);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [fromErrorMessage, setFromErrorMessage] = useState<string | null>(null)
    const [toErrorMessage, setToErrorMessage] = useState<string | null>(null)
    const [routeError, setRouteError] = useState(false);
    const [error, setError] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const getSelectedDriverName = (event: SelectChangeEvent<string>) => {
        setSelectedDriverName(event.target.value)
    }

    const getSelectedLicensePlate = (event: SelectChangeEvent<string>) => {
        setSelectedLicensePlate(event.target.value)
    }

    const handleDateChange = (date: DateTime | null, isFromDate: boolean) => {
        if (isFromDate) {
            setSelectedStartDate(date);
            if (selectedEndDate && date && date > selectedEndDate) {
                setFromErrorMessage("Das „Von“-Datum darf nicht größer als das „Bis“-Datum sein");
                setError(true);
            } else {
                const formattedDate = date?.toUTC().toISO({ includeOffset: false });
                setStartDate(formattedDate!!);
                setFromErrorMessage(null);
                setToErrorMessage(null);
                setError(false);
            }
        } else {
            setSelectedEndDate(date);
            if (selectedStartDate && date && date < selectedStartDate) {
                setToErrorMessage("Das „Bis“-Datum darf nicht kleiner als das „Von“-Datum sein");
                setError(true);
            } else {
                const formattedDate = date?.toUTC().toISO({ includeOffset: false });
                setEndDate(formattedDate!!);
                setToErrorMessage(null);
                setFromErrorMessage(null);
                setError(false);
            }
        }
    };


    const handleRouteSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        searchRoute(selectedDriverName, selectedLicensePlate, startDate.replace('T', ' '), endDate.replace('T', ' ')).then((data) => {
            if (data && data.length > 0) {
                const coordinates: LatLngTuple[] = data.map(point => [point.latitude, point.longitude]);
                setCoordinates(coordinates)
                setRouteFound(true)
                setRouteError(false)
            }
            else {
                setRouteFound(false)
                setRouteError(true)
            }
        });
    }

    useEffect(() => {
        getDriverNames().then((data) => {
            const driverNames = data.map((driverName) => (
                driverName.full_name
            ))
            setDriverNames(driverNames);
            setFilteredDriverNames(driverNames)
        });

        getLicensePlate().then((data) => {
            const licensePlates = data.map((licensePlate) => (
                licensePlate.license_plate
            ))
            setLicensePlates(licensePlates);
            setFilteredLicensePlates(licensePlates)

        });

    }, [])

    useEffect(() => {
        setIsButtonDisabled(selectedDriverName === "" || selectedLicensePlate === "" || startDate === "" || endDate === "" || error === true)
        setRouteError(false)

        if (selectedDriverName === "") {
            setFilteredLicensePlates(licensePlates)
        }
        else {
            setFilteredLicensePlates(licensePlates.filter((plate) => plate.includes(selectedDriverName.includes(' ') ? selectedDriverName.split(' ').map((initials) => initials.charAt(0)).join("") : selectedDriverName)))
        }

        if (selectedLicensePlate === "") {
            setFilteredDriverNames(driverNames)
        }
        else {
            // Filter driver names based on the selected letters
            const initials = selectedLicensePlate.match(/-(\w{2})/);
            setFilteredDriverNames(driverNames.filter((name) => (initials!![1]) === (name.includes(' ') ? name.split(' ').map((initials) => initials.charAt(0)).join(""): name)))
        }

    }, [selectedDriverName, selectedLicensePlate, startDate, endDate])

    return (
        <Box className="searchLayout" style={{ display: "flex", height: "100%" }}>
            <Box className="searchMapView" style={{ flex: 4, padding: "px" }}>
                <Map coordinates={coordinates} />
            </Box>
            <Box className="searchInputs" sx={{ display: "flex", flex: 1, flexDirection: "column", backgroundColor: "#f2f3f5", justifyContent: "space-evenly" }}>
                <Box sx={{ display: "flex", flex: 4, flexDirection: "column", justifyContent: "space-around", alignItems: "center", textAlign: "center", padding: "16px" }}>
                    <Typography variant="h5">
                        Welche Route suchen Sie?
                    </Typography>
                    <FormControl sx={{ width: '15.5vw', minWidth: '270px', textAlign: 'left' }}>
                        <InputLabel id="name-label">Name</InputLabel>
                        <Select labelId="name-label" input={<OutlinedInput label="Name" />} value={selectedDriverName} onChange={getSelectedDriverName}>
                            <MenuItem value="">
                                <em> {"‎"} </em>
                            </MenuItem>
                            {filteredDriverNames.map((name, index) => (
                                <MenuItem key={index} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: '15.5vw', minWidth: '270px', textAlign: 'left' }}>
                        <InputLabel id="license-plate-label">Kennzeichen</InputLabel>
                        <Select labelId="license-plate-label" input={<OutlinedInput label="Kennzeichen" />} value={selectedLicensePlate} onChange={getSelectedLicensePlate}>
                            <MenuItem value="">
                                <em> {"‎"} </em>
                            </MenuItem>
                            {filteredLicensePlates.map((name, index) => (
                                <MenuItem
                                    key={index}
                                    value={name}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                    <FormControl>
                        <Button variant="contained" disabled={isButtonDisabled} onClick={handleRouteSearch} sx={{ minWidth: "7.8vw" }}>
                            Suche
                        </Button>
                        {routeError ?
                            <FormHelperText sx={{ color: "red" }}>Keine Route gefunden</FormHelperText> :
                            <></>
                        }
                    </FormControl>
                </Box>
                <Divider sx={{ borderColor: "black", opacity: 0.25 }} />
                <Box sx={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 16px" }}>
                    <DataTable routeFound={routeFound} isVehicleData={true} trackId={null} licensePlate={selectedLicensePlate} />
                </Box>
            </Box>
        </Box>
    )
}

export default SearchPage