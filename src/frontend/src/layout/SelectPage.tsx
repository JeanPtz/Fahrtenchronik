import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getLicensePlate } from "../apis/getLicensePlates";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const [licensePlates, setLicensePlates] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleClick = (licensePlate: string) => {
    navigate(`/select/${licensePlate}`);
  };

  useEffect(() => {
    getLicensePlate().then((data) => {
      const licensePlates = data.map((licensePlates) => (
        licensePlates.license_plate
      ))
      setLicensePlates(licensePlates);
    });
  }, []);

  return (
    <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
      <Typography textAlign="center" fontSize={24} fontWeight={700} sx={{ m: "16px" }}>
        Wähle zwischen den verschieden Kennzeichen aus und sehe alle gefahrenen Routen des Kennzeichens
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {licensePlates.map((licensePlate, index) => (
          <Paper
            key={index}
            elevation={5}
            sx={{
              height: "100px",
              width: "125px",
              margin: "8px",
              borderRadius: 4
            }}
          >
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100px",
                width: "125px",
                padding: "8px",
                color: "black",
              }}
              onClick={() => handleClick(licensePlate)}
            >
              {licensePlate}
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default AboutPage;