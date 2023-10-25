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
    const [position, setPosition] = useState<LatLngTuple>([51.480842, 7.224831])
    const licensePlate = useParams().licenseplate;
    const selectedRoute = useParams().trackid;
    const navigate = useNavigate();

    const handleRoute = (trackId: string) => {
        navigate(`/select/${licensePlate}/${trackId}`);
        getRouteByTrackId(trackId!!).then((data) => {
            const coordinates: LatLngTuple[] = data.map(point => [point.latitude, point.longitude]);

            // Calculate the average latitude and longitude
            const totalCoordinates = coordinates.length;
            let totalLatitude = 0;
            let totalLongitude = 0;

            for (const coordinate of coordinates) {
                totalLatitude += coordinate[0];
                totalLongitude += coordinate[1];
            }

            const middleLatitude = totalLatitude / totalCoordinates;
            const middleLongitude = totalLongitude / totalCoordinates;

            setCoordinates(coordinates)
            setPosition([middleLatitude, middleLongitude])
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
        <Box className="searchLayout" style={{ display: "flex", height: "100%" }}>
            <Box className="searchMapView" style={{ flex: 2, padding: "px" }}>
                <Map coordinates={coordinates} position={position}/>
            </Box>
            <Box sx={{ display: "flex", flex: 1, flexDirection: "column", backgroundColor: "#f2f3f5" }}>
                <Box sx={{ display: "flex", flex: 3, flexDirection: "column", flexWrap: "wrap", padding: "16px" }}>
                    {routes.map((trackId, index) => (
                        <Link key={index} onClick={() => handleRoute(trackId)} underline="hover" color={selectedRoute === trackId ? "purple" : "primary"} fontSize={24} sx={{ cursor: "pointer", width: "fit-content", padding: "2px" }}>
                            Route {index + 1}
                        </Link>
                    ))}
                </Box>
                <Divider sx={{ borderColor: "black", opacity: 0.25 }} />
                <Box sx={{ display: "flex", flex: 1, flexDirection: "row", padding: "0 16px" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", }}>
                        <Typography textAlign="left" fontWeight={700} sx={{ margin: "8px 0 0 8px" }}>Fahrerinformationen:</Typography>
                        <Box sx={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center", padding: "0 16px" }}>
                            <DataTable routeFound={routeFound} isDriverData={true} />
                        </Box>
                    </Box>
                    <Divider orientation="vertical" sx={{ borderColor: "black", opacity: 0.25 }} />
                    <Box sx={{ display: "flex", flexDirection: "column", }}>
                        <Typography fontWeight={700} sx={{ margin: "8px 0 0 8px" }}>Fahrtinformationen:</Typography>
                        <Box sx={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center", padding: "0 16px" }}>
                            <DataTable routeFound={routeFound} isDriverData={false} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default RoutePage