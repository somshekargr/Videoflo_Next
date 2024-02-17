import React from "react";
import RbStyles from "./RectangleBoundry.module.css";

export default function RectangleBoundry() {
  return (
    <>
      <div className={RbStyles.boundryTop} style={{opacity: '0.3'}}></div>
      <div className={RbStyles.boundryLeft} style={{opacity: '0.3'}}></div>
      <div className={RbStyles.boundryRight} style={{opacity: '0.3'}}></div>
      <div className={RbStyles.boundryBottom} style={{opacity: '0.3'}}></div>
    </>
  );
}
