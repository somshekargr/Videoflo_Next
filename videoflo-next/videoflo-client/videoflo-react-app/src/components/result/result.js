import React, { useState, useEffect } from "react";
import LiveSummary from "../Activities/liveness-detection-summary/live-detection-summary";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import RsStyle from "./result.module.css";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import ImageMatchSummary from "../Activities/image-match/image-match-summary/ImageMatchSummary";
import RandomQnaSummary from "../Activities/random-qna/random-qna-summary/RandomQnaSummary";
import PancardSummary from "../Activities/pancard/pancard-summary/PancardSummary";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import { activityId, activityName } from "../../constants/activities";
import { WorkflowEvents } from "../../constants/workflowEvents";
import IpVerificationSummary from "../Activities/ip-verification/ip-verification-summary/IpVerificationSummary";
import GeoLocationSummary from "../Activities/geo-location/geo-location-summary/GeoLocationSummary";
import SignatureSummary from "../Activities/signature/signature-summary/SignatureSummary";
import ImageCaptureSummary from "../Activities/generic-image-capture/image-capture-summary/ImageCaptureSummary";
import ImageCaptureNewSummary from "../Activities/generic-image-capture/image-capture-new-summary/ImageCaptureNewSummary";

export function ResultLayout(props) {
  const [eachActivityType, seteachActivityType] = useState();
  const [eachActivityPayload, seteachActivityPayload] = useState();
  const sessionInfo = useSelector((state) => state.sessionInfo);

  useEffect(() => {
    if (props) {
      seteachActivityType(Object.keys(props.result)[0]);
      const result =
        props.result[Object.keys(props.result)[0]][
          Object.keys(props.result[Object.keys(props.result)[0]])[0]
        ];
      seteachActivityPayload(result);
    }
  }, [props]);

  const getSummary = () => {
    switch (eachActivityType) {
      case activityName.LIVENESS_DETECTION_ACTIVITY: {
        return <LiveSummary payload={eachActivityPayload}></LiveSummary>;
      }
      case activityName.IMAGE_MATCH_ACTIVITY: {
        return (
          <ImageMatchSummary payload={eachActivityPayload}></ImageMatchSummary>
        );
      }
      case activityName.RANDOM_QnA_ACTIVITY: {
        return (
          <RandomQnaSummary payload={eachActivityPayload}></RandomQnaSummary>
        );
      }
      case activityName.PANCARD_DETECTION_ACTIVITY: {
        return <PancardSummary payload={eachActivityPayload}></PancardSummary>;
      }
      case activityName.IP_VERIFICATION_ACTIVTIY: {
        return (
          <IpVerificationSummary
            payload={eachActivityPayload}
          ></IpVerificationSummary>
        );
      }
      case activityName.GEO_LOCATION_ACTIVITY: {
        return (
          <GeoLocationSummary
            payload={eachActivityPayload}
          ></GeoLocationSummary>
        );
      }
      case activityName.SIGNATURE_MATCH_ACTIVITY: {
        return (
          <SignatureSummary payload={eachActivityPayload}></SignatureSummary>
        );
      }
      case activityName.IMAGE_CAPTURE_ACTIVITY: {
        return (
          <ImageCaptureSummary
            payload={eachActivityPayload}
          ></ImageCaptureSummary>
        );
      }

      case activityName.IMAGE_CAPTURE_NEW_ACTIVITY: {
        return (
          <ImageCaptureNewSummary
            payload={eachActivityPayload}
          ></ImageCaptureNewSummary>
        );
      }

      case activityName.ASSIST_FORM_FILLING: {
        return <></>;
      }

      case activityName.TERMS_AND_CONDITIONS: {
        return <></>;
      }

      default: {
        return <>Loading..</>;
      }
    }
  };
  return <>{eachActivityType && getSummary()}</>;
}

export default function DisplayResult(props) {
  const sessionInfo = useSelector((state) => state.sessionInfo);
  const websocket = useSelector((state) => state.websocket);

  const [resultData, setresultData] = useState();
  const [showActionButtons, setshowActionButtons] = useState(false);
  // const navigate = useNavigate();

  const initializeEventHandlers = () => {
    websocket.on(WorkflowEvents.onWorkflowFinished, (data) => {
      props.leaveSession(data);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      initializeEventHandlers();
    }, 1000);
  }, []);

  const onActivityAction = (accepted) => {
    websocket.emit(WorkflowEvents.onWorkflowFinished, {
      accepted: accepted,
    });
  };

  useEffect(() => {
    if (props?.result) {
      /** @type {*} gets customers particpantId from props */
      const clientId = Object.keys(
        props.result[Object.keys(props.result)[0]]
      )[0];

      /*
       *if @cliendId is not equal to @sessionInfo.participantId then particpant is an agent else is a customer
       */
      if (clientId !== sessionInfo.participantId) {
        setshowActionButtons(true);
      }
      let activityTypeArr = [];
      sessionInfo.activities.forEach((ele) =>
        activityTypeArr.push(ele.activityType)
      );

      /** @type {*}
       * converting objects to array of objects
       */
      const arrayOfObj = Object.entries(props?.result).map((ele, index) => ({
        [activityTypeArr[index]]: ele[1],
      }));
      console.log(arrayOfObj);
      setresultData(arrayOfObj);
    }
  }, [props]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <Card>
            <CardHeader
              title="Work Completed"
              sx={{ fontWeight: "500" }}
            ></CardHeader>
            <CardContent>
              {resultData &&
                resultData.map((name) => (
                  <ResultLayout result={name}></ResultLayout>
                ))}
            </CardContent>
            <Divider></Divider>
            <br />
            {showActionButtons && (
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Stack
                  spacing={1}
                  direction="row"
                  className={RsStyle.combobtns}
                >
                  <Button
                    variant="contained"
                    className={RsStyle.errorbtn}
                    onClick={() => onActivityAction(false)}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    className={RsStyle.btn}
                    onClick={() => onActivityAction(true)}
                  >
                    Accept & Finish
                  </Button>
                </Stack>
              </CardActions>
            )}
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}
