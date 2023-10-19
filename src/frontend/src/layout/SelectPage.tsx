import { Box, Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { getLicensePlate } from "../apis/getLicensePlates";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
    const [licensePlates, setLicensePlates] = useState([ "AA_WIT-AA000", "BB_WIT-BB000", "CC_WIT-CC000" ]);// Example license plates
      const navigate = useNavigate();
    
      const handleClick = (licensePlate: string) => {
        navigate(`/select/${licensePlate}`);
      };

    useEffect(() => {
        /*getLicensePlate().then((data) => {
            setLicensePlates(data); // Set the data you receive from the backend here
        });*/
    }, []);

    return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            margin: "32px"
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
      );
};

export default AboutPage;