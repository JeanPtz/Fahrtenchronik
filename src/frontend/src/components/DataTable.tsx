import { Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getRouteData } from "../apis/getTableData"

type DataTabelProps = {
    routeFound: boolean,
    isDriverData: boolean,
    trackId: string,
}

const DataTable = (props: DataTabelProps) => {

    const [milage, setMileage] = useState<number>(0)
    const [avgSpeed, setAvgSpeed] = useState<number>(0)
    const [driveTime, setDriveTime] = useState<number>(0)
    const [message, setMessage] = useState<number>(0)
    const [noTimeData, setNoTimeData] = useState(true)

    useEffect(() => {

        if (props.isDriverData) {

        }
        else {
            getRouteData(props.trackId).then((data) => {
                setMileage(data.milage)
                if (message === 0) {
                    setAvgSpeed(data.avg_speed)
                    setDriveTime(data.duration)
                } else {
                    setNoTimeData(true)
                }

            });
        }

    }, [props.trackId])

    return props.routeFound ? (
        <Box sx={{justifyContent: "space-between"}}>
            <Typography fontWeight={700}>
                { props.isDriverData ?
                    "Fahrzeuginformationen:"
                :
                    "Fahrtinformationen:"
                }
                
            </Typography>
            <TableContainer component={Card} sx={{ width: "15.5vw", minWidth: "350px" }}>
                <Table sx={{ minWidth: 150, p: "8px", userSelect: "none" }}>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid #0003', p: "4px" }}>{props.isDriverData ? "Kilometerstand" : "Zurückgelegte Strecke"}</TableCell>
                            <TableCell align="left" sx={{ border: '1px solid #0003', p: "8px" }}>{milage}km</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid #0003', p: "8px" }}>Durchschnittsgeschwindigkeit</TableCell>
                            {noTimeData ?
                                <TableCell align="left" sx={{ border: '1px solid #0003', p: "4px" }}>Keine Daten</TableCell>
                                :
                                <TableCell align="left" sx={{ border: '1px solid #0003', p: "4px" }}>{avgSpeed}km/h</TableCell>
                            }
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid #0003', p: "8px" }}>Gesamtfahrtdauer</TableCell>
                            {noTimeData ?
                                <TableCell align="left" sx={{ border: '1px solid #0003', p: "4px" }}>Keine Daten </TableCell>
                                :
                                <TableCell align="left" sx={{ border: '1px solid #0003', p: "4px" }}>{driveTime}h</TableCell>
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    ) : (
        <Typography sx={{ textAlign: "center", fontWeight: "700", userSelect: "none" }}>
            Keine Routendaten vorhanden
        </Typography>)
}

export default DataTable