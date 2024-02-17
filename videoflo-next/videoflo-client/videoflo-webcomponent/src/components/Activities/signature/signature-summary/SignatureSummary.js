import React, { useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function SignatureSummary(props) {
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
          Signature Image
        </Typography>
        <Box p={1} sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Box
              component="img"
              sx={{
                height: 250,
                width: 250,
                maxHeight: { xs: 167, md: 400 },
                maxWidth: { xs: 250, md: 430 },
                borderRadius: 2,
              }}
              alt="croped_signature"
              src={payload?.base64Image}
            />
          </Grid>
        </Box>
      </CardContent>
    </>
  );
}
