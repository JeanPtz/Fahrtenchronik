import Map from "../components/Map"

import { Box, Divider, Link, Typography, colors } from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { getTrackIdByLicensePlate } from "../apis/getTrackIdByLicensePlate";
import { getRouteByTrackId } from "../apis/getRouteByTrackId";
import { useNavigate, useParams } from "react-router-dom";
import { LatLngTuple } from "leaflet";


const RoutePage = () => {
    const [routeFound, setRouteFound] = useState(false)
    const [routes, setRoutes] = useState<string[]>([]);
    const [coordinates, setCoordinates] = useState<LatLngTuple[]>([]);
    const [selectedRoute, setSelectedRoute] = useState<string>("")
    const licensePlate = useParams().licenseplate;
    const navigate = useNavigate();

    const handleRoute = (trackId: string) => {
        navigate(`/select/${licensePlate}/${trackId}`);
        setSelectedRoute(trackId)
        getRouteByTrackId(trackId!!).then((data) => {
            const coordinates: LatLngTuple[] = data.map(point => [point.latitude, point.longitude]);
            setCoordinates(coordinates)
            setRouteFound(true)
        });
    };

    useEffect(() => {
        getTrackIdByLicensePlate(licensePlate!!).then((data) => {
            const routes = data.map((data) => (
                data.id
            ));
            setRoutes(routes);
        });
    }, [])

    return (
        <Box sx={{ display: "flex", height: "100%" }}>
            <Box sx={{ flex: 3 }}>
                <Map coordinates={coordinates} />
            </Box>
            <Box sx={{ display: "flex", flex: 1, flexDirection: "column", backgroundColor: "#f2f3f5" }}>
                <Box sx={{ display: "flex", flex: 1.5, flexDirection: "column", flexWrap: "wrap", padding: "16px" }}>
                    {routes.map((trackId, index) => (
                        <Link key={index} onClick={() => handleRoute(trackId)} underline="hover" color={selectedRoute === trackId ? "purple" : "primary"} fontSize={24} sx={{ cursor: "pointer", width: "fit-content", padding: "2px" }}>
                            Route {index + 1}
                        </Link>
                    ))}
                </Box>
                <Divider sx={{ borderColor: "black", opacity: 0.25 }} />
                <Box sx={{ display: "flex", flex: 1, flexDirection: "column"}}>
                    <Box sx={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center", padding: "0 16px" }}>
                        <DataTable routeFound={true} isDriverData={true} trackId={selectedRoute} licensePlate={licensePlate!!}/>
                    </Box>
                    <Divider sx={{ borderColor: "black", opacity: 0.25 }} />
                    <Box sx={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center", padding: "0 16px" }}>
                        <DataTable routeFound={routeFound} isDriverData={false} trackId={selectedRoute} licensePlate={licensePlate!!}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default RoutePage