import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';

function SearchDatePicker() {
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

    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="From"
                    value={selectedStartDate}
                    onChange={(date) => handleDateChange(date, true)}
                    format="dd.MM.yyyy"
                    sx={{ width: "15.5vw", minWidth: "270px" }}
                    slotProps={{
                        textField: {
                            helperText: error,
                        },
                    }}
                />
                <DatePicker
                    label="To"
                    value={selectedEndDate}
                    onChange={(date) => handleDateChange(date, false)}
                    format="dd.MM.yyyy"
                    slotProps={{
                        textField: {
                            helperText: error,
                        },
                    }}
                    sx={{ width: "15.5vw", minWidth: "270px" }}
                />
            </LocalizationProvider>
        </Box>
    );
}

export default SearchDatePicker;
