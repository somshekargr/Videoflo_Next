import React, { Component } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";
import { connect, useSelector } from "react-redux";
import { CustomBorderType } from "../../constants/customBorderType";

import {
  InputLabel,
  Input,
  IconButton,
  FormHelperText,
  FormControl,
} from "@mui/material";

import MicOff from "@mui/icons-material/MicOff";
import VideocamOff from "@mui/icons-material/VideocamOff";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeOff from "@mui/icons-material/VolumeOff";
import HighlightOff from "@mui/icons-material/HighlightOff";
import RectangleBoundry from "../video-boundry/rectangle-boundry/RectangleBoundry";
import FaceBoundry from "../video-boundry/human-face-boundry/FaceBoundry";
import IntegraLogo from "../video-boundry/intergra-logo/IntegraLogo";

class StreamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  handleChange(event) {
    this.setState({ nickname: event.target.value });
    event.preventDefault();
  }

  toggleNicknameForm() {
    if (this.props.user.isLocal()) {
      this.setState({ showForm: !this.state.showForm });
    }
  }

  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound });
  }

  handlePressKey(event) {
    if (event.key === "Enter") {
      console.log(this.state.nickname);
      if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
        this.props.handleNickname(this.state.nickname);
        this.toggleNicknameForm();
        this.setState({ isFormValid: true });
      } else {
        this.setState({ isFormValid: false });
      }
    }
  }

  isClient() {
    return this.props?.currentActivityData?.activity?.gatherFrom?.includes(
      this.props?.sessionInfo?.role
    );
  }

  hasConfiguration() {
    return this.props?.currentActivityData?.activity?.configuration?.customBorder?.include?.includes(
      this.props?.sessionInfo?.role
    );
  }

  render() {
    return (
      <div className="OT_widget-container">
        <div className="pointer nickname">
          {this.state.showForm ? (
            <FormControl id="nicknameForm">
              <IconButton
                color="inherit"
                id="closeButton"
                onClick={this.toggleNicknameForm}
              >
                <HighlightOff />
              </IconButton>
              <InputLabel htmlFor="name-simple" id="label">
                Nickname
              </InputLabel>
              <Input
                color="inherit"
                id="input"
                value={this.state.nickname}
                onChange={this.handleChange}
                onKeyPress={this.handlePressKey}
                required
              />
              {!this.state.isFormValid && this.state.nickname.length <= 3 && (
                <FormHelperText id="name-error-text">
                  Nickname is too short!
                </FormHelperText>
              )}
              {!this.state.isFormValid && this.state.nickname.length >= 20 && (
                <FormHelperText id="name-error-text">
                  Nickname is too long!
                </FormHelperText>
              )}
            </FormControl>
          ) : (
            <div onClick={this.toggleNicknameForm}>
              <span id="nickname">{this.props.user.getNickname()}</span>
              {/* {this.props.user.isLocal() && <span id=""> (edit)</span>} */}
            </div>
          )}
        </div>

        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            />

            {!this.isClient() &&
              this.props?.user?.type === "local" &&
              !this.props.user.isVideoActive() && <IntegraLogo />}

            {this.isClient() &&
              this.props?.user?.type === "remote" &&
              !this.props.user.isVideoActive() && <IntegraLogo />}

            {this.isClient() &&
              this.hasConfiguration() &&
              this.props?.user?.type === "local" && (
                <>
                  {this.props?.currentActivityData?.activity?.configuration
                    ?.customBorder?.type === CustomBorderType.RECTANGULAR && (
                    <RectangleBoundry />
                  )}
                  {this.props?.currentActivityData?.activity?.configuration
                    ?.customBorder?.type === CustomBorderType.HUMAN && (
                    <FaceBoundry />
                  )}
                </>
              )}
            {!this.isClient() &&
              this.hasConfiguration() &&
              this.props?.user?.type === "remote" && (
                <>
                  {this.props?.currentActivityData?.activity?.configuration
                    ?.customBorder?.type === CustomBorderType.RECTANGULAR && (
                    <RectangleBoundry />
                  )}
                  {this.props?.currentActivityData?.activity?.configuration
                    ?.customBorder?.type === CustomBorderType.HUMAN && (
                    <FaceBoundry />
                  )}
                </>
              )}
            <div id="statusIcons">
              {!this.props.user.isVideoActive() ? (
                <div id="camIcon">
                  <VideocamOff id="statusCam" />
                </div>
              ) : null}

              {!this.props.user.isAudioActive() ? (
                <div id="micIcon">
                  <MicOff id="statusMic" />
                </div>
              ) : null}
            </div>
            <div>
              {!this.props.user.isLocal() && (
                <IconButton id="volumeButton" onClick={this.toggleSound}>
                  {this.state.mutedSound ? (
                    <VolumeOff color="secondary" />
                  ) : (
                    <VolumeUp />
                  )}
                </IconButton>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default function StreamComponent_rfc(props) {
  const sessionInfo = useSelector((state) => state.sessionInfo);
  const currentActivityData = useSelector((state) => state.currentActivityData);
  return (
    <StreamComponent
      {...props}
      sessionInfo={sessionInfo}
      currentActivityData={currentActivityData}
    ></StreamComponent>
  );
}
