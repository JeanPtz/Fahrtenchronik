import Map from "../components/Map"

import { Box, Divider, Link, Typography, colors } from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { getTrackIdByLicensePlate } from "../apis/getTrackIdByLicensePlate";
import { getRouteByTrackId } from "../apis/getRouteByTrackId";
import { useNavigate, useParams } from "react-router-dom";


const RoutePage = () => {
    const [routeFound, setRouteFound] = useState(false)
    const [routes, setRoutes] = useState<string[]>([]);
    const [points, setPoints] = useState<number[]>([]);
    const licensePlate = useParams().licenseplate;
    const selectedRoute = useParams().trackid;
    const navigate = useNavigate();

    const handleRoute = (trackId: string) => {
        navigate(`/select/${licensePlate}/${trackId}`);
        getRouteByTrackId(trackId!!).then((data) => {
            const points = data.map((data) => (
                data.latitude,
                data.longitude
            ));
            setPoints(points)
            console.log(points)
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
                <Map />
            </Box>
            <Box sx={{ display: "flex", flex: 1, flexDirection: "column", backgroundColor: "#f2f3f5" }}>
                <Box sx={{ display: "flex", flex: 3, flexDirection: "column", flexWrap: "wrap", padding: "16px" }}>
                    {routes.map((routes, index) => (
                        <Link key={index} onClick={() => handleRoute(routes)} underline="hover" color={selectedRoute === routes ? "purple" : "primary"} fontSize={24} sx={{ cursor: "pointer", width: "fit-content", padding: "2px" }}>
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