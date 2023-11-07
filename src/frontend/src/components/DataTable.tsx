import { Box, Card, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getDriverData, getRouteData } from "../apis/getTableData"
import { Duration } from "luxon"

type DataTabelProps = {
    routeFound: boolean,
    isVehicleData: boolean,
    trackId: string | null,
    licensePlate: string,
}

const DataTable = (props: DataTabelProps) => {

    const [milage, setMileage] = useState<number>(0)
    const [avgSpeed, setAvgSpeed] = useState<number>(0)
    const [driveTime, setDriveTime] = useState<string>("")
    const [noTimeData, setNoTimeData] = useState(true)

    useEffect(() => {
        if (props.isVehicleData) {
            getDriverData(props.licensePlate).then((data) => {
                setMileage(data.milage)
                if (data.time_error) {
                    setNoTimeData(true)
                } else {
                    const duration = Duration.fromObject({ seconds: data.duration })
                    setAvgSpeed(data.avg_speed)
                    setDriveTime(duration.toFormat('hh:mm:ss'))
                    setNoTimeData(false)
                }
            });
        }
    }, [props.licensePlate])

    useEffect(() => {
        if (!props.isVehicleData) {
            getRouteData(props.trackId!!).then((data) => {
                setMileage(data.milage)
                if (data.time_error)  {
                    setNoTimeData(true)
                } else {
                    const duration = Duration.fromObject({ seconds: data.duration })
                    setAvgSpeed(data.avg_speed)
                    setDriveTime(duration.toFormat('hh:mm:ss'))
                    setNoTimeData(false)
                }
            });
        }

    }, [props.trackId] )

    return props.routeFound ? (
        <Box sx={{ justifyContent: "space-between" }}>
            <Typography fontWeight={700}>
                {props.isVehicleData ?
                    "Fahrzeuginformationen:"
                    :
                    "Fahrtinformationen:"
                }

            </Typography>
            <TableContainer component={Card} sx={{ width: "16vw", minWidth: "350px" }}>
                <Table sx={{ minWidth: 150, p: "8px", userSelect: "none" }}>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid #0003', p: "6px" }}>{props.isVehicleData ? "Kilometerstand" : "Zurückgelegte Strecke"}</TableCell>
                            <TableCell align="left" sx={{ border: '1px solid #0003', p: "4px" }}>{milage} km</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid #0003', p: "6px" }}>Durchschnittsgeschwindigkeit</TableCell>
                            {noTimeData ?
                                <TableCell align="left" sx={{ border: '1px solid #0003', p: "4px" }}>Keine Daten</TableCell>
                                :
                                <TableCell align="left" sx={{ border: '1px solid #0003', p: "4px" }}>{avgSpeed} km/h</TableCell>
                            }
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid #0003', p: "6px" }}>Gesamtfahrtdauer</TableCell>
                            {noTimeData ?
                                <TableCell align="left" sx={{ border: '1px solid #0003', p: "4px" }}>Keine Daten </TableCell>
                                :
                                <TableCell align="left" sx={{ border: '1px solid #0003', p: "4px" }}>{driveTime}</TableCell>
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