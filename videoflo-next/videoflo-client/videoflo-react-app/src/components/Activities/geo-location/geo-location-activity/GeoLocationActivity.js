import React, { useState, useEffect, useRef } from "react";
import GlStyles from "./GeoLocationActivity.module.css";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { getGeocodeLocation } from "../../../../services/videoflo.service";
import { WorkflowEvents } from "../../../../constants/workflowEvents";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import BlockUI from "../../../BlockUI/BlockUI";
import CircularProgress from "@mui/material/CircularProgress";

export default function GeoLocationActivity(props) {
  const sessionInfo = useSelector((state) => state.sessionInfo);
  const websocket = useSelector((state) => state.websocket);
  const [activityData, setActicityData] = useState();
  const [isDataAvailable, setisDataAvailable] = useState(false);
  const [geoCodeInfo, setgeoCodeInfo] = useState();
  const [blockUI, setblockUI] = useState(false);
  const [isLocationFetched, setisLocationFetched] = useState(false);
  const dataFetchedRef = useRef(false);

  const isClient = () => {
    return props?.activityData?.activity?.gatherFrom?.includes(
      sessionInfo.role
    );
  };

  //Names to be change
  const isAgent = () => {
    return props?.activityData?.activity?.displayTo?.includes(sessionInfo.role);
  };

  useEffect(() => {
    setActicityData(props.activityData);
    let timerId = setTimeout(() => {
      websocket.on(
        WorkflowEvents.onActivityDataAvailable,
        (activityDataAvaiable) => {
          const payload = Object.entries(activityDataAvaiable.data)[0][1]
            .payload;
          setgeoCodeInfo(payload);
          setisDataAvailable(true);
        }
      );
      timerId = null;
    }, 500);

    // cleanup
    return () => clearTimeout(timerId);
  }, []);

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async function (resp) {
          const geoCodingResults = await getGeocodeLocation({
            latitude: resp.coords.latitude,
            longitude: resp.coords.longitude,
            accuracy: resp.coords.accuracy,
          });
          setisLocationFetched(true);
          setTimeout(() => {
            websocket.emit(WorkflowEvents.onActivityDataGathered, {
              activityId: props?.activityData?.activity?.id,
              activityData: {
                gatheredFrom: Object.entries(props?.activityData?.data)[0][0],
                payload: geoCodingResults,
              },
            });
          }, 1000);
        },
        function error(msg) {
          alert("Please enable your GPS position feature.");
        },
        { maximumAge: 0, timeout: 5000 }
      );
    } else {
      alert("Geolocation API is not supported in your browser.");
    }
  };

  useEffect(async () => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    let timerId = null;
    let ac = new AbortController();
    if (isClient()) {
      timerId = setTimeout(() => {
        getGeoLocation();
      }, 1000);
    }
    timerId = null;
    return () => {
      ac.abort();
      clearTimeout(timerId);
    };
  }, [activityData]);

  const onActivityAction = (accepted) => {
    setblockUI(true);

    websocket.emit(WorkflowEvents.onActivityAction, {
      activityData: {
        accepted: accepted,
        acceptedBy: sessionInfo.participantId,
        gatheredFrom: Object.keys(activityData?.data)[0],
        payload: geoCodeInfo,
      },
    });
  };

  return (
    <>
      {activityData?.activity ? (
        <Grid container>
          <Grid item sx={{ width: "100%" }}>
            <Box>
              <Paper elevation={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Geo Location
                    </Typography>
                  </CardContent>

                  {/* This renders UI for Admin side */}
                  {isAgent() && (
                    <>
                      {!isDataAvailable ? (
                        <Container maxWidth="sm">
                          <div>Fetching Geo Location from participants...</div>
                          <br />
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                          <br />
                        </Container>
                      ) : (
                        <>
                          <CardContent>
                            <TableContainer component={Paper}>
                              <Table aria-label="simple table">
                                <TableBody>
                                  <TableRow>
                                    <TableCell>Lat/Lng</TableCell>
                                    <TableCell>
                                      {
                                        geoCodeInfo?.results[0]?.geometry
                                          ?.location?.lat
                                      }
                                      ,&nbsp;
                                      {
                                        geoCodeInfo?.results[0]?.geometry
                                          ?.location?.lng
                                      }
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Address </TableCell>
                                    <TableCell>
                                      {
                                        geoCodeInfo?.results[0]
                                          ?.formatted_address
                                      }
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Accuracy</TableCell>
                                    <TableCell>
                                      {geoCodeInfo?.accuracy}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </CardContent>
                          <>
                            {blockUI ? (
                              <>
                                <CardActions
                                  sx={{ justifyContent: "flex-end" }}
                                >
                                  <Stack p={2}>
                                    <Box>
                                      <CircularProgress />
                                    </Box>
                                  </Stack>
                                </CardActions>
                              </>
                            ) : (
                              <>
                                <CardActions
                                  sx={{ justifyContent: "flex-end" }}
                                >
                                  <Stack
                                    spacing={1}
                                    direction="row"
                                    className={GlStyles.combobtns}
                                  >
                                    <Button
                                      variant="contained"
                                      className={GlStyles.errorbtn}
                                      onClick={() => onActivityAction(false)}
                                    >
                                      Reject
                                    </Button>
                                    <Button
                                      variant="contained"
                                      className={GlStyles.btn}
                                      onClick={() => onActivityAction(true)}
                                    >
                                      Next
                                    </Button>
                                  </Stack>
                                </CardActions>
                              </>
                            )}
                          </>
                        </>
                      )}
                    </>
                  )}
                  {/* This renders UI for Client Side */}
                  {isClient() && (
                    <>
                      <Container maxWidth="sm">
                        <div>
                          Your Geo Location is now being queried from your
                          browser for security purposes. When prompted by your
                          browser, please choose "allow" or "accept" to
                          continue.
                        </div>
                        <br />
                        <Box sx={{ width: "100%" }}>
                          <LinearProgress />
                        </Box>
                        <br />
                      </Container>
                    </>
                  )}
                </Card>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <>Loading Activity..</>
      )}
      <BlockUI blocking={blockUI} />
    </>
  );
}
