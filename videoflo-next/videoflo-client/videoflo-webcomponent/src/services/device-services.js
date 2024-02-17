import React from "react";

export default function DeviceServices() {
  const permissions = navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .then((stream) => {
      alert("accepted the permissions");
      // this.setState((prevState) => {
      //   havePermissions: !prevState.havePermissions;
      // });
    })
    .catch((err) => {
      console.log(`${err.name} : ${err.message}`);
    });
}
