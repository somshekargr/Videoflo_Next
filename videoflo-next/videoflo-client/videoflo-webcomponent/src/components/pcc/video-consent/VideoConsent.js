import React, { useState } from "react";
import VcStyle from "./VideoConsent.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";

const VideoConsent = () => {
  const dispatch = useDispatch();
  const onConsentClick = () => {
    dispatch({ type: "NEXT_CONSENT" });
  };
  const [checkOneStatus, setCheckOneStatus] = useState(false);
  const [checkTwoStatus, setCheckTwoStatus] = useState(false);

  const setCheckOne = (e) => {
    setCheckOneStatus(e.target.checked);
  };
  const setCheckTwo = (e) => {
    setCheckTwoStatus(e.target.checked);
  };

  return (
    <>
      <Box className={VcStyle.boxStyle}>
        <Card>
          <Container>
            <CardContent>
              <Typography variant="h6" component="div">
                Are you ready for the video call?
              </Typography>
              <Typography variant="body2" className={VcStyle.smallText}>
                Ensure that:
                <br />
              </Typography>
              <br />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    onChange={(e) => setCheckOne(e)}
                  />
                }
                label={"You are in a well lit surrounding"}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    onChange={(e) => setCheckTwo(e)}
                  />
                }
                label={"There are no background noises or disturbance"}
              />
            </CardContent>
          </Container>
          <Button
            onClick={onConsentClick}
            disabled={!(checkOneStatus && checkTwoStatus)}
            className={
              checkOneStatus && checkTwoStatus
                ? VcStyle.ebtnStyle
                : VcStyle.dbtnStyle
            }
            variant="body2"
          >
            Yes, I am ready
          </Button>
        </Card>
      </Box>
    </>
  );
};

export default VideoConsent;
