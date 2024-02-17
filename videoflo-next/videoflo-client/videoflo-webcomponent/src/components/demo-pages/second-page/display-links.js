import { Container } from "@mui/system";
import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DlStyle from "./display-links.module.css";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
const { base64encode } = require('nodejs-base64');

export default function DisplayLink() {
  const location = useLocation();
  const data = location.state.data

  const agentData = {
    apiUrl: data.apiUrl,
    sessionId: data.sessionId,
    participantId : data.participants[0].participantId,
    token: data.token
  }
  const agentString = JSON.stringify(agentData);

  const customerData = {
    apiUrl: data.apiUrl,
    sessionId: data.sessionId,
    participantId : data.participants[1].participantId,
    token: data.token
  }
  const customerString = JSON.stringify(customerData);

  const encodeAgentData = base64encode(agentString);
  const encodeCustomerData = base64encode(customerString);

  const agentLink = `${window.location.origin}/join-session/${encodeAgentData}`;
  const customerLink = `${window.location.origin}/join-session/${encodeCustomerData}`;

  return (
    <Container>
      <Typography variant="h6" component="div" className={DlStyle.header}>
        Join using the links below :
      </Typography>
      <br />
      <br />
      <ButtonGroup
        fullWidth={true}
        orientation="horizontal"
        aria-label="horizontal outlined button group"
      >
        <Button className={DlStyle.btn} >
          <a href={agentLink} >Agent-Link</a>
        </Button>
        <Button className={DlStyle.btn} >
          <a href={customerLink} target="_blank">Customer-Link</a>
        </Button>
      </ButtonGroup>
    </Container>
  );
}
