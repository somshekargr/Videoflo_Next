import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Mdstyle from "./model-data.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //bgcolor: "white",
  bgcolor: "background.paper",
  //border: "2px solid #000",
  boxShadow: 24,
};

export default function ModalData(props) {
  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={Mdstyle.boxstyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Customer OnBoarding in progress
          </Typography>
          <br />
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props?.description
              ? props?.description
              : " Please wait for the customer onboarding to complete"}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
