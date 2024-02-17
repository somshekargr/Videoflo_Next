import React, { useState, useEffect, useRef } from "react";
import IpStyles from "./IpVerificationActivity.module.css";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { getCustomerIpInfo } from "../../../../services/videoflo.service";
import { WorkflowEvents } from "../../../../constants/workflowEvents";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import BlockUI from "../../../BlockUI/BlockUI";
import CircularProgress from "@mui/material/CircularProgress";

export default function IpVerificationActivity(props) {
  const sessionInfo = useSelector((state) => state.sessionInfo);
  const websocket = useSelector((state) => state.websocket);
  const [activityData, setActicityData] = useState();
  const [isDataAvailable, setisDataAvailable] = useState(false);
  const [ipInformation, setipInformation] = useState();
  const [blockUI, setblockUI] = useState(false);
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

  useEffect(async () => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    let timerId = null;
    let ac = new AbortController();
    if (isClient()) {
      const customerIpInfo = await getCustomerIpInfo();
      timerId = setTimeout(() => {
        websocket.emit(WorkflowEvents.onActivityDataGathered, {
          activityId: props?.activityData?.activity?.id,
          activityData: {
            gatheredFrom: Object.entries(props?.activityData?.data)[0][0],
            payload: customerIpInfo,
          },
        });
      }, 1000);
    }
    timerId = null;

    return () => {
      ac.abort();
      clearTimeout(timerId);
    };
  }, [activityData]);

  useEffect(() => {
    setActicityData(props.activityData);
    websocket.on(
      WorkflowEvents.onActivityDataAvailable,
      (activityDataAvaiable) => {
        const payload = Object.entries(activityDataAvaiable.data)[0][1].payload;
        setipInformation(payload);
        setisDataAvailable(true);
      }
    );
  }, []);

  const onActivityAction = (accepted) => {
    setblockUI(true);

    websocket.emit(WorkflowEvents.onActivityAction, {
      activityData: {
        accepted: accepted,
        acceptedBy: sessionInfo.participantId,
        gatheredFrom: Object.keys(activityData?.data)[0],
        payload: ipInformation,
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
                      IP Address Information
                    </Typography>
                  </CardContent>

                  {/* This renders UI for Admin side */}
                  {isAgent() && (
                    <>
                      {!isDataAvailable ? (
                        <Container maxWidth="sm">
                          <div>Fetching IP Verification data...</div>
                          <br />
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                          <br />
                        </Container>
                      ) : (
                        <>
                          <CardContent sx={{ p: 0 }}>
                            <TableContainer component={Paper}>
                              <Table aria-label="simple table">
                                <TableBody>
                                  <TableRow>
                                    <TableCell>IP Addres</TableCell>
                                    <TableCell>{ipInformation?.ip}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Internet Provider</TableCell>
                                    <TableCell>
                                      {ipInformation?.asn?.name}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>City</TableCell>
                                    <TableCell>{ipInformation?.city}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Country</TableCell>
                                    <TableCell>
                                      {ipInformation?.country_name}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Est. Lat/Lng</TableCell>
                                    <TableCell>
                                      {ipInformation?.latitude} ,{" "}
                                      {ipInformation?.longitude}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </CardContent>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              sx={{ fontWeight: 300 }}
                            >
                              Threat Assessment
                            </Typography>
                            <Box sx={{ width: "100%" }}>
                              <Stack spacing={2}>
                                <>
                                  {ipInformation?.threat?.is_threat ? (
                                    <>
                                      <Alert icon={false} severity="error">
                                        <AlertTitle>Threat</AlertTitle>
                                        <strong>
                                          The client's IP Address might be
                                          malicious!
                                        </strong>{" "}
                                        &nbsp; See below for more details.
                                      </Alert>
                                    </>
                                  ) : (
                                    <>
                                      <Alert icon={false} severity="success">
                                        <AlertTitle>Threat</AlertTitle>
                                        The client's IP Address seems to be
                                        clean.
                                      </Alert>
                                    </>
                                  )}

                                  {ipInformation?.threat?.is_anonymous ? (
                                    <>
                                      <Alert icon={false} severity="error">
                                        The client's IP Address seems to be an
                                        exit node or relay for an anonymization
                                        service such as Tor!
                                      </Alert>
                                    </>
                                  ) : (
                                    <>
                                      <Alert icon={false} severity="success">
                                        Not Anonymous
                                      </Alert>
                                    </>
                                  )}
                                  {ipInformation?.threat?.is_proxy ? (
                                    <>
                                      <Alert icon={false} severity="error">
                                        Is using Proxy Anonymization?{" "}
                                        <span>
                                          The client's IP Address seems to be an
                                          exit node or relay for an
                                          anonymization service!
                                        </span>
                                      </Alert>
                                    </>
                                  ) : (
                                    <>
                                      <Alert icon={false} severity="success">
                                        Is using Proxy Anonymization?{" "}
                                        <span>No</span>
                                      </Alert>
                                    </>
                                  )}
                                  {ipInformation?.threat?.is_tor ? (
                                    <>
                                      <Alert icon={false} severity="error">
                                        Is using Tor Anonymization?{" "}
                                        <span>
                                          The client's IP Address seems to be an
                                          exit node or relay for an
                                          anonymization service!
                                        </span>
                                      </Alert>
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <Alert icon={false} severity="success">
                                        Is using Tor Anonymization?{" "}
                                        <span>No</span>
                                      </Alert>
                                    </>
                                  )}
                                  {ipInformation?.threat?.is_known_abuser ? (
                                    <>
                                      <Alert icon={false} severity="error">
                                        Known Abuser?{" "}
                                        <span>
                                          The client's IP address is a known
                                          (reported) source of abuse!
                                        </span>
                                      </Alert>
                                    </>
                                  ) : (
                                    <>
                                      <Alert icon={false} severity="success">
                                        Known Abuser? <span>No</span>
                                      </Alert>
                                    </>
                                  )}
                                  {ipInformation?.threat?.is_known_attacker ? (
                                    <>
                                      <Alert icon={false} severity="error">
                                        Known Attacker?{" "}
                                        <span>
                                          The client's IP address is a known
                                          (reported) source of malicious
                                          activity!
                                        </span>
                                      </Alert>
                                    </>
                                  ) : (
                                    <>
                                      <Alert icon={false} severity="success">
                                        Known Attacker? <span>No</span>
                                      </Alert>
                                    </>
                                  )}
                                  {ipInformation?.threat?.is_bogon ? (
                                    <>
                                      <Alert icon={false} severity="error">
                                        Bogus IP Address?{" "}
                                        <span>
                                          The client's IP address is not in any
                                          range allocated or delegated by the
                                          Internet Assigned Numbers Authority
                                          (IANA) or a delegated regional
                                          Internet registry (RIR) and allowed
                                          for public Internet use. This could be
                                          an indicator of malicious activity!
                                        </span>
                                      </Alert>
                                    </>
                                  ) : (
                                    <>
                                      <Alert icon={false} severity="success">
                                        Bogus IP Address? <span>No</span>
                                      </Alert>
                                    </>
                                  )}
                                </>
                              </Stack>
                            </Box>
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
                                    className={IpStyles.combobtns}
                                  >
                                    <Button
                                      variant="contained"
                                      className={IpStyles.errorbtn}
                                      onClick={() => onActivityAction(false)}
                                    >
                                      Reject
                                    </Button>
                                    <Button
                                      variant="contained"
                                      className={IpStyles.btn}
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
                        <div>Please wait. Verifying your IP Address...</div>
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
      {/* <BlockUI blocking={blockUI} /> */}
    </>
  );
}
