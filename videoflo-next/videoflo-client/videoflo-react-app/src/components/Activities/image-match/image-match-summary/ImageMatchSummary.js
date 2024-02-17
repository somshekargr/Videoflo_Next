import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const modelStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "3%",
  height: "auto",
};

export default function ImageMatchSummary(props) {
  const [payload, setpayload] = useState();
  const [openImage1, setOpenImage1] = React.useState(false);
  const [openImage2, setOpenImage2] = React.useState(false);

  const handleOpenImage1 = () => setOpenImage1(true);
  const handleCloseImage1 = () => setOpenImage1(false);
  const handleOpenImage2 = () => setOpenImage2(true);
  const handleCloseImage2 = () => setOpenImage2(false);
  useEffect(() => {
    if (props) {
      const data = props.payload.payload;
      setpayload(data);
    }
  }, [props]);

  return (
    <>
      <CardContent>
        <Typography
          mb={1}
          variant="body1"
          component="div"
          sx={{ fontWeight: 500, color: "#757575" }}
        >
          Face Recongnition
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "5%",
                cursor: "pointer",
              }}
              src={payload?.image1?.base64Image}
              onClick={handleOpenImage1}
            />
          </Grid>
          <Modal
            open={openImage1}
            onClose={handleCloseImage1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modelStyle}>
              <Box
                component="img"
                sx={{
                  height: "auto",
                  width: "auto",
                  maxWidth: 'md',
                }}
                src={payload?.image1?.base64Image}
              />
            </Box>
          </Modal>
          <Grid item xs={6}>
            <img
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "5%",
                cursor: "pointer",
              }}
              src={payload?.image2?.base64Image}
              onClick={handleOpenImage2}
            />
          </Grid>
          <Modal
            open={openImage2}
            onClose={handleCloseImage2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modelStyle}>
              <Box
                component="img"
                sx={{
                  height: "auto",
                  width: "auto",
                  maxWidth: 'md',
                }}
                src={payload?.image2?.base64Image}
              />
            </Box>
          </Modal>
        </Grid>
        <Stack sx={{ width: "100%" }} spacing={2}>
          {payload?.faceMatchingResult?.success && (
            <>
              {payload?.faceMatchingResult?.isMatching ? (
                <>
                  <Alert icon={false} severity="success">
                    <div>Faces Match!</div>
                  </Alert>
                </>
              ) : (
                <>
                  <Alert icon={false} severity="error">
                    <div>Faces Do not Match!</div>
                  </Alert>
                </>
              )}
            </>
          )}

          {(!payload?.faceMatchingResult?.success ||
            payload?.faceMatchingResult?.errorMessage) && (
            <>
              <Alert icon={false} severity="error">
                <div>Face Match Failed!</div>
                <h5>
                  Error: {payload?.faceMatchingResult?.errorCode} - &nbsp;
                  {payload?.faceMatchingResult?.errorMessage}
                </h5>
              </Alert>
            </>
          )}
        </Stack>
      </CardContent>
    </>
  );
}
