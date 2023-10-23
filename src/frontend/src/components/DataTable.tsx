import { Card, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"

type DataTabelProps = {routeFound: boolean, isDriverData: boolean}

const DataTable = (props: DataTabelProps) => {

    const [milage, setMileage] = useState<number>()
    const [avgSpeed, setAvgSpeed] = useState<number>()
    const [driveTime, setDriveTime] = useState<number>()

    useEffect(() => {
    }, [])

    return props.routeFound ?(
        <TableContainer component={Card} sx={{width: "15.5vw", minWidth: "270px"}}>
            <Table sx={{ minWidth: 150, p: "8px", userSelect: "none" }}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ border: '1px solid #0003', p: "8px" }}>{props.isDriverData ? "Kilometerstand" : "Zurückgelegte Strecke"}</TableCell>
                        <TableCell align="left" sx={{ border: '1px solid #0003', p: "8px" }}>{milage}km</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ border: '1px solid #0003', p: "8px" }}>Durchschnittsgeschwindigkeit</TableCell>
                        <TableCell align="left" sx={{ border: '1px solid #0003', p: "8px" }}>{avgSpeed}km/h</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ border: '1px solid #0003', p: "8px" }}>Gesamtfahrtdauer</TableCell>
                        <TableCell align="left" sx={{ border: '1px solid #0003', p: "8px" }}>{driveTime}h</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    ) : (
    <Typography sx={{ textAlign: "center", fontWeight: "700", userSelect: "none" }}>
        Keine Routendaten vorhanden
    </Typography>)
} 

export default DataTable