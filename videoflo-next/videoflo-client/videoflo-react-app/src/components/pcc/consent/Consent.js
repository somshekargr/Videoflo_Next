import React, { useEffect, useState } from "react";
import CStyle from "./Consent.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
//import { ConsentAcquired } from "../../../services/event.services";
import { useSelector } from "react-redux";
import { WorkflowEvents } from "../../../constants/workflowEvents";

export default function Consent(props) {
  const websocket = useSelector((state) => state.websocket);
  const pcc = useSelector((state) => state.pcc);
  const [body, setBody] = useState();
  const [title, setTitle] = useState();
  const [checkboxText, setcheckboxText] = useState();
  const [continueButtonText, setcontinueButtonText] = useState();
  const [subTitle, setsubTitle] = useState();
  const [footer, setfooter] = useState();
  const [validationErrorText, setvalidationErrorText] = useState();

  useEffect(() => {
    setBody(props.data.data.body);
    setTitle(props.data.data.title);
    setcheckboxText(props.data.data.checkboxText);
    setcontinueButtonText(props.data.data.continueButtonText);
    setsubTitle(props.data.data.subTitle);
    setfooter(props.data.data.footer);
    setvalidationErrorText(props.data.data.validationErrorText);
  }, []);

  // console.log(props.data.data);
  const dispatch = useDispatch();
  const [checkStatus, setCheckStatus] = useState(false);
  const setCheckVal = (e) => {
    setCheckStatus(e.target.checked);
  };

  const onConsentClick = () => {
    // console.log(websocket);
    // websocket.emit(WorkflowEvents.onConsentAcquired, {
    //   consentTimestamp: new Date().toISOString(),
    // });
    // ConsentAcquired();
    props.pccActionClicked(WorkflowEvents.onConsentAcquired, {
      consentTimestamp: new Date().toISOString(),
    })
  };

  return (
    <>
      <Box className={CStyle.boxStyle}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            <Typography
              variant="body2"
              className={CStyle.smallText}
              dangerouslySetInnerHTML={{ __html: subTitle }}
            ></Typography>
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{ __html: body }}
            ></Typography>
            <br />
            <FormControlLabel
              control={
                <Checkbox color="secondary" onChange={(e) => setCheckVal(e)} />
              }
              label={
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{ __html: checkboxText }}
                ></Typography>
              }
            />
            <Button
              disabled={!checkStatus}
              className={checkStatus ? CStyle.ebtnStyle : CStyle.dbtnStyle}
              variant="body2"
              onClick={onConsentClick}
            >
              {continueButtonText}
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
