import React, { useState, useEffect } from "react";
import LiveCheck from "../liveness-detection/LivenessDetection";
import PancardDetection from "../pancard/pancard-detection/PancardDetection";
import ImageMatchActivity from "../image-match/image-match-activity/ImageMatchActivity";
import RandomQnaActivity from "../random-qna/random-qna-activity/RandomQnaActivity";
import { activityName } from "../../../constants/activities";
import { WorkflowEvents } from "../../../constants/workflowEvents";
import IpVerificationActivity from "../ip-verification/ip-verification-acvivity/IpVerificationActivity";
import GeoLocationActivity from "../geo-location/geo-location-activity/GeoLocationActivity";
import SignatureDetection from "../signature/signature-detection/SignatureDetection";
import ImageCaptureActivity from "../generic-image-capture/image-capture-activity/ImageCaptureActivity";
import { useSelector, useDispatch } from "react-redux";
import AssistForm from "../assist-form/assist-from-activity/AssistForm";
import ImageCaptureNewActivity from "../generic-image-capture/image-capture-new-activity/ImageCaptureNewActivity";
import ConditionsActivity from "../conditions/conditions-activity/ConditionsActivity";

export default function ActivityContainer(props) {
  const activity = useSelector((state) => state.currentActivityData);
  const [activityData, setActivityData] = useState();
  // useEffect(() => {
  //   console.log('Activity Container Mounted',props.activityData)
  //   setActivityData(props.activityData);
  // }, [ ]);

  /**Whenever any participant rejoin or reconnect it should restart that activity */
  useEffect(() => {
    setActivityData(props.activityData);
  }, [props]);

  const getActivity = () => {
    switch (activityData.activity.activityType) {
      case activityName.LIVENESS_DETECTION_ACTIVITY: {
        return (
          <LiveCheck
            remoteUsers={props.remoteUsers}
            activityData={activityData}
          ></LiveCheck>
        );
      }
      case activityName.PANCARD_DETECTION_ACTIVITY: {
        return (
          <PancardDetection activityData={activityData}></PancardDetection>
        );
      }
      case activityName.IMAGE_MATCH_ACTIVITY: {
        return (
          <ImageMatchActivity activityData={activityData}></ImageMatchActivity>
        );
      }
      case activityName.RANDOM_QnA_ACTIVITY: {
        return (
          <RandomQnaActivity activityData={activityData}></RandomQnaActivity>
        );
      }
      case activityName.IP_VERIFICATION_ACTIVTIY: {
        return (
          <IpVerificationActivity
            activityData={activityData}
          ></IpVerificationActivity>
        );
      }
      case activityName.GEO_LOCATION_ACTIVITY: {
        return (
          <GeoLocationActivity
            activityData={activityData}
          ></GeoLocationActivity>
        );
      }
      case activityName.SIGNATURE_MATCH_ACTIVITY: {
        return (
          <SignatureDetection activityData={activityData}></SignatureDetection>
        );
      }
      case activityName.IMAGE_CAPTURE_ACTIVITY: {
        return (
          <ImageCaptureActivity
            activityData={activityData}
          ></ImageCaptureActivity>
        );
      }
      case activityName.ASSIST_FORM_FILLING: {
        return <AssistForm activityData={activityData}></AssistForm>;
      }
      case activityName.IMAGE_CAPTURE_NEW_ACTIVITY: {
        return (
          <ImageCaptureNewActivity
            activityData={activityData}
          ></ImageCaptureNewActivity>
        );
      }
      case activityName.TERMS_AND_CONDITIONS: {
        return (
          <ConditionsActivity activityData={activityData}></ConditionsActivity>
        );
      }
      case activityName.TEST: {
        return <>THIS IS TEST ACTIVITY</>;
      }
      default: {
        return (
          <>
            <p>
              Unknown Activity Recieved from Server. Seems like you need to
              upgrade Videoflo UI Library!
            </p>
          </>
        );
      }
    }
  };

  return <>{activityData ? getActivity() : <>Please Wait....</>}</>;
}
