import React from "react";
import FcStyle from "./FinalPcc.module.css";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux"; 
import { CHANGE_PCC_STATUS } from "../../../store/actions/pcc-action";

const FinalPcc = () => {
  const dispatch = useDispatch()
  const onFinalPccSubmit = ()=> {
    dispatch({type:  CHANGE_PCC_STATUS, payload: true})
  }

  return (
    <>
      <Box className={FcStyle.boxStyle}>
        <Card>
          <Container>
            <CardContent>
              <Typography variant="h6" component="div">
                Almost there!
              </Typography>
              <Typography variant="body1">
                Do you have a strong internet connection?
              </Typography>
              <br />
              <Typography variant="body1">
                Ensure you are on a stable mobile network or, use a WiFi
                network.
              </Typography>
            </CardContent>
          </Container>
          <Button onClick={onFinalPccSubmit} className={FcStyle.btnStyle} variant="body2">
            Start Video Call
          </Button>
        </Card>
      </Box>
    </>
  );
};

export default FinalPcc;
