import React from "react";
import Consent from "../consent/Consent";
import { pcc as PCC_NAMES} from "../../../constants/pcc";
import MediaPermission from "../media-permissions/media-permissions";
import CustomeChecklist from "../custom-checklist/custom-checklist";
import { useDispatch, useSelector } from "react-redux";
import { WorkflowEvents } from "../../../constants/workflowEvents";
import { CHANGE_PCC_STATUS } from "../../../store/actions/pcc-action";

export default function PccContainer() {
  const pcc = useSelector((state) => state.pcc);
  const websocket = useSelector((state) => state.websocket);
  const dispatch = useDispatch();

  const precallcheckCompleted = () => {
    websocket.emit(WorkflowEvents.onPrecallChecksCompleted, {});
    //TODO change status when quramupdate is true
    dispatch({ type: CHANGE_PCC_STATUS, payload: true });
  };


  const pccActionClicked = (eventName, eventData, isLastChild = true)=>{
    //1. Send PCC data (Timestamp etc) to the Server
    websocket.emit(eventName, eventData);
    if(!isLastChild) return;

    //2. Update PCC_CONFIG in redux
    if (pcc.activeIndex + 1 == pcc.pccConfig.length) precallcheckCompleted();
    else dispatch({ type: "NEXT_CONSENT" });
  }

  const getActivePccComponent = () => {
    if (pcc?.activePccName) {
      switch (pcc.activePccName) {
        case PCC_NAMES.CONSENT: { 
          return (
            <Consent
              data={pcc.pccConfig[pcc.activeIndex]}
              pccActionClicked={pccActionClicked}
            ></Consent>
          );
        }

        case PCC_NAMES.PERMISSION: { 
          return (
            <MediaPermission
              data={pcc.pccConfig[pcc.activeIndex]}
              pccActionClicked={pccActionClicked}
            ></MediaPermission>
          );
        }

        case PCC_NAMES.CUSTOM_CHECKLIST: { 
          return (
            <CustomeChecklist
              data={pcc.pccConfig[pcc.activeIndex]}
              pccActionClicked={pccActionClicked}
            ></CustomeChecklist>
          );
        }
        default:
          return <div>Loading....</div>;
      }
    }
  };

  return <>{getActivePccComponent()}</>;
}
