import React, { useState, useEffect } from "react";
import LdStyle from "./LivenessDetection.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { delay, shuffleArray } from "../../../services/util.services";
import { WorkflowEvents } from "../../../constants/workflowEvents";
import CardData from "./card-data/card-data/card-data";
import { renderMatches } from "react-router-dom";
import { RemoteUserService } from "../../../services/remoteUser.service";
import { posematch } from "../../../services/videoflo.service";
import BlockUI from "../../BlockUI/BlockUI";

export default function LiveCheck(props) {
  const remoteUsers = props.remoteUsers;
  let activeRemoteUser;
  //Reedux Subscription 
  const sessionInfo = useSelector((state) => state.sessionInfo);
  const websocket = useSelector((state) => state.websocket);
  const dispatch = useDispatch();

  const [activityDataGathered, setActivityDataGathered] = useState(false);
  const [activityData, setActicityData] = useState();
  const [stateData, setStateData] = useState();
  const [isDataAvailable, setisDataAvailable] = useState(false);
  const [blockUI, setblockUI] = useState(false);

  //Names to be change
  const isClient = () => {
    return activityData?.activity?.gatherFrom?.includes(sessionInfo.role);
  };

  //Names to be change
  const isAgent = () => {
    return activityData?.activity?.displayTo?.includes(sessionInfo.role);
  };

  useEffect(() => {
    setActicityData(props.activityData);
    initializeEventHandlers();
  }, []);

  /**Whenever any participant rejoin or reconnect it should restart that activity */
  useEffect(() => {
    setActicityData(props.activityData);
    initializeEventHandlers();
  }, [props]);

  useEffect(() => {
    if (activityData && isAgent()) {
      /**Randomly select Poses from Agent and inform others */
      const selectedPoses = shuffleArray(
        activityData?.activity?.configuration?.poses
      ).splice(0, activityData?.activity?.configuration?.noOfPosesToCheck);
      initializeActivityState(selectedPoses);
      // setPosesToCheck(selectedPoses);
    }
  }, [activityData]);

  const getCurrentPoseFromState = (stateDataCopy = stateData) => {
    return {
      ...stateData.stateData.payload.items[
        stateData.stateData.payload.curItemIndex
      ],
    };
  };

  /**
       * @user audioActive: false
connectionId: "con_TuY2fFfLab"
nickname: "VideoFlo_User37"
screenShareActive: false
streamManager: Subscriber {userHandlerArrowHandler: WeakMap, ee: EventEmitter, videos: Array(1), lazyLaunchVideoElementCreatedEvent: false, stream: Stream, …}
type: "remote"
videoActive: true 
       */
  const onStartCaptureClick = async (ignorePoseMatch = false) => {
    
    if (!remoteUsers) {
      Promise.resolve();
      return;
    }

    //1. Select remote user
    for (let i = 0; i < remoteUsers.length; i++) {
      const user = remoteUsers[i];
      // if (this.activity.gatherFrom.includes(user.data.role)) {
      if (user.type == "remote") {
        activeRemoteUser = user;
        break;
      }
    }

    if (!activeRemoteUser) return;

    let base64ImagesArray;
    try {
      //2. Get images from remote stream
      base64ImagesArray = await getImageFromStream();
    } catch (err) {
      return;
    }

    //3. Intert image base64 in activity state (for agent)
    //So,  Modification in current state

    let stateDataCopy_one = { ...stateData };
    let ongoingPoseData = getCurrentPoseFromState();
    ongoingPoseData.isCheckingHeadPoses = true;
    ongoingPoseData.frames = base64ImagesArray;
    stateDataCopy_one.stateData.payload.items[
      stateDataCopy_one.stateData.payload.curItemIndex
    ] = ongoingPoseData;

    setStateData(stateDataCopy_one);
    activityStateChanged(stateDataCopy_one);
    const ongoingPoseDataWithCapturedImagesResultOrError = await verifyImages(
      base64ImagesArray,
      ignorePoseMatch
    );
    //Wether result or error below 3 props needs to be updated
    ongoingPoseDataWithCapturedImagesResultOrError.isCaptureButtonVisible = false;
    ongoingPoseDataWithCapturedImagesResultOrError.isCheckingHeadPoses = false;
    // setStateData(currentState);
    // activityStateChanged(currentState);
    let stateDataCopy = { ...stateData };
    stateDataCopy.stateData.payload.items[
      stateDataCopy.stateData.payload.curItemIndex
    ] = ongoingPoseDataWithCapturedImagesResultOrError;

    //6. If result from verify succeed than jump to next post match and save data to server
    if (
      isCaptureImageSuccess(
        ongoingPoseDataWithCapturedImagesResultOrError,
        ignorePoseMatch
      )
    ) {
      //Modification in current state
      // let stateDataCopy = {... stateData}
      // stateDataCopy.stateData.payload.curItemIndex++;
      //Push dataGAthered to server
      // await delay(500)
      ongoingPoseDataWithCapturedImagesResultOrError.isInProgress = false;
      ongoingPoseDataWithCapturedImagesResultOrError.error = null;
      initCurrentPoseCheck(stateDataCopy);
    } else {
      ongoingPoseDataWithCapturedImagesResultOrError.isInProgress = true;
      // ongoingPoseDataWithCapturedImagesResultOrError.isInProgress = false;
      // ongoingPoseDataWithCapturedImagesResultOrError.isCheckingHeadPoses = false;
    }
    setStateData(stateDataCopy);
    activityStateChanged(stateDataCopy);
    Promise.resolve();
  };

  /**Will add result or error baed on pose match */
  const verifyImages = async (base64ImagesArray, ignorePoseMatch = false) => {
    //4. Veryfy images
    let ongoingPoseData = getCurrentPoseFromState();
    const requestInfo = {
      pose: ongoingPoseData.pose,
      images: base64ImagesArray.map((imgBase64, index) => {
        return {
          imageid: index + 1,
          image: imgBase64,
        };
      }),
    };

    if (ignorePoseMatch) { 
      const mock_success_results = {
        pose: ongoingPoseData.pose,
        response: {
          errorCode: null,
          errorMessage: null,
          results: requestInfo.images.map((image) => {
            return {
              imageId: image.imageid,
              errorCode: null,
              errorMessage: null,
              result: false,
            };
          }),
          success: true,
        },
      };

      ongoingPoseData.result = mock_success_results;
      return ongoingPoseData;
    }

    try {
      // ongoingPoseData.result = await posematch(requestInfo);
      ongoingPoseData.result = await posematch(requestInfo); 
    } catch (error) {
      ongoingPoseData.error = error;
    } finally {
      //5. Insert result in activity state
      return ongoingPoseData;
    }
  };

  /**Retruns true if 3 out of 5 frames matches and adds process property to pose data with value 100 if pose matches*/
  const isCaptureImageSuccess = (ongoingPoseData, ignorePoseMatch = false) => {
    if (ignorePoseMatch) {
      ongoingPoseData.progress = 100;
      return true;
    } else if (ongoingPoseData.result?.response?.results) {
      const totalItems = ongoingPoseData.result.response.results.length;

      const poseMatchingItems = ongoingPoseData.result.response.results.filter(
        (item) => item.result === true
      ).length;

      const matchingProportion = poseMatchingItems / totalItems;

      // If 3/4th of the poses are matching, then we are good.
      if (matchingProportion >= 0.75) {
        ongoingPoseData.progress = 100;
        return true;
      }
      ongoingPoseData.progress = 0;
    }
    ongoingPoseData.progress = 0;
    return false;
  };

  /**Will initialize next pose, Aand send Data to Server if last pose  sets allPoseCompleted as true */
  const initCurrentPoseCheck = async (stateDataCopy) => {
    const nextIndex = 1 + stateDataCopy.stateData.payload.curItemIndex;
    //if all poses completed
    if (nextIndex >= stateDataCopy.stateData.payload.items.length) {
      // All poses are verified, push data to the server.
      const payload = {
        activityId: activityData?.activity?.id,
        activityData: {
          gatheredFrom: Object.keys(activityData?.data)[0],
          payload: stateData.stateData.payload.items.map((item) => ({
            pose: item.result.pose,
            result: {
              success: item.result.response.success,
              errorCode: item.result.response.errorCode,
              errorMessage: item.result.response.errorMessage,
              frameResults: item.result.response.results.map(
                (r, frameIndex) => ({
                  imageId: r.imageId,
                  image: item.frames[frameIndex],
                  result: r.result,
                  errorCode: r.errorCode,
                  errorMessage: r.errorMessage,
                })
              ),
            },
          })),
        },
      };
      websocket.emit(WorkflowEvents.onActivityDataGathered, payload);
      stateDataCopy.stateData.payload.allPoseCompleted = true;
      return;
    }

    //Modification in current state
    // let currentState = { ...props.stateData };
    stateDataCopy.stateData.payload.curItemIndex = nextIndex;
    let ongoingPoseData = stateDataCopy.stateData.payload.items[nextIndex];
    ongoingPoseData.isCaptureButtonVisible = true;
    ongoingPoseData.isInProgress = false;
    stateDataCopy.stateData.payload.items[nextIndex] = ongoingPoseData;
  };

  const getImageFromStream = async () => {
    const video = activeRemoteUser?.streamManager?.videos[0]?.video;
    if (video) {
      const arr = [];
      for (
        let i = 0;
        i < activityData.activity.configuration.noOfFramesToCheck;
        i++
      ) {
        const canvas = document.createElement("canvas");
        // scale the canvas accordingly
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // grab the frame from the video element and draw it on the canvas
        canvas
          .getContext("2d")
          .drawImage(video, 0, 0, canvas.width, canvas.height);

        arr.push(canvas.toDataURL("image/jpeg"));
        await delay(300);
      }
      return arr;
    }
  };

  const initializeActivityState = (selectedPoses) => {
    const payload = {
      activityId: activityData?.activity?.id,
      publishedBy: sessionInfo.participantId,
      stateData: {
        gatheredFrom: sessionInfo.participantId,
        payload: {
          curItemIndex: 0,
          items: selectedPoses.map((pose, index) => {
            return {
              pose: pose,
              isCaptureButtonVisible: index == 0 ? true : false,
              isInProgress: false,
              progress: 0,
            };
          }),
        },
      },
    };
    setStateData(payload);
    websocket.emit(WorkflowEvents.onActivityStateChanged, payload);
  };

  const initializeEventHandlers = () => {
    websocket.on(WorkflowEvents.onActivityStateChanged, (data) => { 
      if (data.publishedBy != sessionInfo.participantId && data != stateData)
        setStateData(data);
    });

    websocket.on(WorkflowEvents.onActivityDataAvailable, (data) => {
      setisDataAvailable(true);
    });
  };

  //  useEffect(() => {
  //   if(stateData){
  //     console.log("Emmiting Event ***************", stateData)
  //     websocket.emit(WorkflowEvents.onActivityStateChanged, stateData)
  //   }
  //  }, [stateData])

  const activityStateChanged = (stateData) => {
    const filtered_stateData = stateData;
    websocket.emit(WorkflowEvents.onActivityStateChanged, filtered_stateData);
  };

  const isBlockUI = (data) => {
    if (data) setblockUI(true);
  };

  return (
    <>
      <Box>
        {stateData && (
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Liveness Detection
              </Typography>
              <Typography variant="body2" className={LdStyle.smallText}>
                Please turn your head in the direction prompted
              </Typography>
              <br />
              <CardData
                captureRemoteFrames={onStartCaptureClick}
                activityStateChanged={activityStateChanged}
                isAgent={isAgent()}
                setStateData={setStateData}
                stateData={stateData}
                activityData={activityData}
                isDataAvailable={isDataAvailable}
                blockUI={isBlockUI}
              />
            </CardContent>
          </Card>
        )}
      </Box>
      <BlockUI blocking={blockUI} />
    </>
  );
}
