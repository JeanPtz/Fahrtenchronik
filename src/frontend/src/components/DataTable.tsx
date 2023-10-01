import { Card, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"

const DataTable = () => {
    return (
        <TableContainer component={Card} sx={{width: "15.5vw", minWidth: "270px"}}>
            <Table sx={{ minWidth: 150, p: "8px", userSelect: "none" }}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ border: '1px solid #0003', p: "8px" }}>Zurückgelegte Strecke</TableCell>
                        <TableCell align="left" sx={{ border: '1px solid #0003', p: "8px" }}>50km</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ border: '1px solid #0003', p: "8px" }}>Durchschnittsgeschwindigkeit</TableCell>
                        <TableCell align="left" sx={{ border: '1px solid #0003', p: "8px" }}>50km/h</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ border: '1px solid #0003', p: "8px" }}>Gesamtfahrtdauer</TableCell>
                        <TableCell align="left" sx={{ border: '1px solid #0003', p: "8px" }}>1h</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
} 

export default DataTable