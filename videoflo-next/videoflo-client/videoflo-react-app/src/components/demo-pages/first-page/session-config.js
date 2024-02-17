import { Grid, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import ScStyle from "../first-page/session-config.module.css";
import { useNavigate } from "react-router-dom";
import fs from 'fs'
import {
  getAccessToken,
  createSessions,
} from "../../../services/videoflo.service";
import {
  APP_ID,
  APP_URL,
  CUSTOMER_NAME,
  AGENT_NAME,
  WEBHOOKS,
  SECRET_KEY, 
  ACTIVITIES,
  PCC_FOR_AGENT,
  PCC_FOR_CUSTOMER,
  BODY,
} from "../session-config-values/config-values";

export default function SessionConfig() {
  const [apiUrl, setapiUrl] = useState(APP_URL);
  const [appid, setappid] = useState(APP_ID);
  const [secretKey, setsecretKey] = useState(SECRET_KEY);
  const [sessionName, setsessionName] = useState("Demo Session");
  const [agentName, setagentName] = useState(AGENT_NAME);
  const [customerName, setcustomerName] = useState(CUSTOMER_NAME);
  const [webhooks, setwebhooks] = useState(JSON.stringify(WEBHOOKS));
  const [precallChk, setprecallChk] = useState(
    JSON.stringify(PCC_FOR_CUSTOMER)
  );
  const [activities, setactivities] = useState(JSON.stringify(ACTIVITIES));
  const [body, setBody] = useState({});
  const navigate = useNavigate();

  const Data = {};

  useEffect(() => {
    setBody({
      name: sessionName,
      participants: [
        {
          externalParticipantId: "agent-1",
          name: agentName,
          role: "agent",
          videoLayoutSettings: {
            agent_1: "Small",
            customer_2: "Big",
          },
          precallChecks: PCC_FOR_AGENT,
        },
        {
          externalParticipantId: "customer-2",
          name: customerName,
          role: "customer",
          precallChecks: JSON.parse(precallChk),
          videoLayoutSettings: {
            agent_1: "Small",
            customer_2: "Big",
          },
        },
      ],
      activities: JSON.parse(activities),
      webhooks: JSON.parse(webhooks),
    });
  }, []);

  useEffect(() => {
    setBody({
      name: sessionName,
      participants: [
        {
          externalParticipantId: "agent-1",
          name: agentName,
          role: "agent",
          videoLayoutSettings: {
            agent_1: "Small",
            customer_2: "Big",
          },
          precallChecks: PCC_FOR_AGENT,
        },
        {
          externalParticipantId: "customer-2",
          name: customerName,
          role: "customer",
          precallChecks: JSON.parse(precallChk),
          videoLayoutSettings: {
            agent_1: "Small",
            customer_2: "Big",
          },
        },
      ],
      activities: JSON.parse(activities),
      webhooks: JSON.parse(webhooks),
    });
  }, [
    apiUrl,
    appid,
    secretKey,
    sessionName,
    agentName,
    customerName,
    webhooks,
    precallChk,
    activities
  ]);

  /** @type On Click of StartSession
   * post call is made to /getToken with @appid and @secretKey as req.body and we get @accessToken as res.body
   * and then post call is made to /createSessions with @accessToken as AuthencationBearer with @activities @precallChk
   * @webhooks and others as req.body and get @sessionId and array of @participants
   * then nagivate to join links
   */
  const OnStartSession = async () => {
    const token = await getAccessToken(appid, secretKey);
    console.warn('__SessionConfigs....',body)
    const { sessionId, participants } = await createSessions(token, body);
    Data.token = token;
    Data.sessionId = sessionId;
    Data.participants = participants;
    Data.apiUrl = apiUrl;
    navigate("/get-links", { state: { data: Data } });
  };

  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Grid container className={ScStyle.space}>
              <TextField
                fullWidth={true}
                value={apiUrl}
                onChange={(e) => {
                  setapiUrl(e.target.value);
                }}
                label="API URL"
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid container className={ScStyle.space}>
              <TextField
                fullWidth={true}
                value={agentName}
                onChange={(e) => {
                  setagentName(e.target.value);
                }}
                label="Agent Name"
                variant="outlined"
              ></TextField>
            </Grid>

            <Grid container className={ScStyle.space}>
              <TextField
                fullWidth={true}
                value={secretKey}
                onChange={(e) => {
                  setsecretKey(e.target.value);
                }}
                label="Secret Key"
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid container className={ScStyle.space}>
              <TextField
                fullWidth={true}
                value={sessionName}
                onChange={(e) => {
                  setsessionName(e.target.value);
                }}
                label="Session Name"
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid container className={ScStyle.space}>
              <TextField
                fullWidth={true}
                value={precallChk}
                onChange={(e) => {
                  setprecallChk(e.target.value);
                }}
                label="Pre-call checks for Customer"
                multiline
                minRows={11}
                maxRows={11}
                variant="outlined"
              ></TextField>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Grid container className={ScStyle.space}>
              <TextField
                fullWidth={true}
                value={appid}
                onChange={(e) => {
                  setappid(e.target.value);
                }}
                label="App ID"
                variant="outlined"
              ></TextField>
            </Grid>

            <Grid container className={ScStyle.space}>
              <TextField
                fullWidth={true}
                value={customerName}
                onChange={(e) => {
                  setcustomerName(e.target.value);
                }}
                label="Customer Name"
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid container className={ScStyle.space}>
              <TextField
                fullWidth={true}
                multiline
                minRows={4.5}
                maxRows={4.5}
                value={webhooks}
                onChange={(e) => {
                  setwebhooks(e.target.value);
                }}
                label="Webhooks"
                variant="outlined"
              ></TextField>
            </Grid>

            <Grid container className={ScStyle.space}>
              <TextField
                fullWidth={true}
                value={activities}
                onChange={(e) => {
                  setactivities(e.target.value);
                }}
                label="Activites"
                multiline
                minRows={11}
                maxRows={11}
                variant="outlined"
              ></TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item fullWidth={true} md={12} sm={12} xs={12}>
            <Button
              variant="contained"
              className={ScStyle.submitbtn}
              onClick={OnStartSession}
            >
              Start Videoflo Session
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
