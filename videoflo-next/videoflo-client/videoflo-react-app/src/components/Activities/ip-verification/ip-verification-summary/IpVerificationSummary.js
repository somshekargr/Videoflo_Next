import React, { useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function IpVerificationSummary(props) {
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
          IP Address Information
        </Typography>
        <Box p={1} sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography
                sx={{ fontWeight: 600, color: "#757575", fontSize: "14px" }}
                variant="body1"
                component="div"
              >
                IP Address
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: "14px" }}
              >
                {payload?.ip}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{ fontWeight: 600, color: "#757575", fontSize: "14px" }}
                variant="body1"
                component="div"
              >
                Est. Lat/Lng
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: "14px" }}
              >
                {payload?.latitude}, {payload?.longitude}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{ fontWeight: 600, color: "#757575", fontSize: "14px" }}
                variant="body1"
                component="div"
              >
                Internet Provider
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: "14px" }}
              >
                {payload?.asn?.name}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography
                sx={{ fontWeight: 600, color: "#757575", fontSize: "14px" }}
                variant="body1"
                component="div"
              >
                City
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: "14px" }}
              >
                {payload?.city}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{ fontWeight: 600, color: "#757575", fontSize: "14px" }}
                variant="body1"
                component="div"
              >
                Country
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: "14px" }}
              >
                {payload?.country_name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{ fontWeight: 600, color: "#757575", fontSize: "14px" }}
                variant="body1"
                component="div"
              >
                Threat Assessment
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <>
                {payload?.threat?.is_threat ? (
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ fontSize: "14px", color: "red" }}
                  >
                    The client's IP Address might be malicious!
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ fontSize: "14px" }}
                  >
                    No Threats Found. The client's IP Address seems to be clean.
                  </Typography>
                )}
              </>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </>
  );
}
