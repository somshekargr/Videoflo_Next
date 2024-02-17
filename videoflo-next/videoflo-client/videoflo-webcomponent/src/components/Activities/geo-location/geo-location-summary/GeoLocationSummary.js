import React, { useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function GeoLocationSummary(props) {
  const [payload, setpayload] = useState();
  useEffect(() => {
    if (props) {
      setpayload(props.payload.payload);
    }
  }, [props]);
  return (
    <>
      <CardContent>
        <Typography
          sx={{ fontWeight: 500, color: "#757575" }}
          mb={1}
          variant="body1"
          component="div"
        >
          Geo Location Information
        </Typography>
        <Box p={1} sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography
                sx={{ fontWeight: 600, color: "#757575", fontSize: "14px" }}
                variant="body1"
                component="div"
              >
                Lat/Lng
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: "14px" }}
              >
                {payload?.results[0]?.geometry?.location?.lat}
                ,&nbsp;
                {payload?.results[0]?.geometry?.location?.lng}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{ fontWeight: 600, color: "#757575", fontSize: "14px" }}
                variant="body1"
                component="div"
              >
                Address
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: "14px" }}
              >
                {payload?.results[0]?.formatted_address}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{ fontWeight: 600, color: "#757575", fontSize: "14px" }}
                variant="body1"
                component="div"
              >
                Accuracy
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: "14px" }}
              >
                {payload?.accuracy}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </>
  );
}
