import React, { useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function PancardSummary(props) {
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
          Pan Recognition Information
        </Typography>
        <Box p={1} sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography
                sx={{ fontWeight: 600, color: "#757575", fontSize: "14px" }}
                variant="body1"
                component="div"
              >
                Name
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: "14px" }}
              >
                {payload?.result?.name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{ fontWeight: 600, color: "#757575", fontSize: "14px" }}
                variant="body1"
                component="div"
              >
                Father/Spouse Name
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: "14px" }}
              >
                {payload?.result?.father_name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{ fontWeight: 600, color: "#757575", fontSize: "14px" }}
                variant="body1"
                component="div"
              >
                Pan Number
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: "14px" }}
              >
                {payload?.result?.pan_num}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{ fontWeight: 600, color: "#757575", fontSize: "14px" }}
                variant="body1"
                component="div"
              >
                Date Of Birth
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: "14px" }}
              >
                {payload?.result?.dob}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </>
  );
}
