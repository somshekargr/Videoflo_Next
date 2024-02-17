import React, { useState, useEffect } from "react";
import DcStyle from "./custom-checklist.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { WorkflowEvents } from "../../../constants/workflowEvents";
import { CHANGE_PCC_STATUS } from "../../../store/actions/pcc-action";
import { useDispatch, useSelector } from "react-redux";

export default function CustomeChecklist(props) {
  //Redux Subscriptions
  const dispatch = useDispatch();
  const websocket = useSelector((state) => state.websocket);

  const [customCheckList, setcustomCheckList] = useState([]);
  const [activeCheckListIndex, setactiveCheckListIndex] = useState(0);

  useEffect(() => {
    setcustomCheckList(props.data.data);
  }, []);

  const onCheckListCompleted = () => {
  let isLastChild ;
    if (activeCheckListIndex < customCheckList.length - 1) {
      isLastChild = false; 
      //Render Next Custom List
      setactiveCheckListIndex(activeCheckListIndex + 1);
    } else {
      isLastChild = true; 
    }
    props.pccActionClicked(WorkflowEvents.onPrecallCustomChecklistCompleted, {
      checklistId: customCheckList[activeCheckListIndex].id,
      timestamp: new Date().toISOString(),
    }, isLastChild)
  };

  return (
    <Box className={DcStyle.boxStyle}>
      {customCheckList.length > 0 && (
        <CustomCheckList
          data={customCheckList[activeCheckListIndex]}
          onCheckListCompleted={onCheckListCompleted}
        />
      )}
    </Box>
  );
}

const CustomCheckList = (props) => {
  const [listItems, setlistItems] = useState();
  const [ListData, setListData] = useState();
  const [checkListCompleted, setcheckListCompleted] = useState(false);

  useEffect(() => {
    if (props?.data) {
      setListData(props.data);
    }
    if (props?.data?.items) {
      setlistItems(
        props.data.items.map((item) => {
          return { value: item, checked: false };
        })
      );
    }
  }, []);

  useEffect(() => {
    setcheckListCompleted(false);
    if (props?.data?.items) {
      setlistItems(
        props.data.items.map((item) => {
          return { value: item, checked: false };
        })
      );
    } else {
      setlistItems();
      setcheckListCompleted(true);
    }

    if (props?.data) {
      setListData(props.data);
    }
  }, [props]);

  const onItemSelect = (e, listItemIndex) => {
    const updatedListItems = [...listItems];
    updatedListItems[listItemIndex].checked = e.target.checked;
    if (updatedListItems.filter((e) => !e.checked).length == 0)
      setcheckListCompleted(true);
    else setcheckListCompleted(false);
    setlistItems(updatedListItems);
  };

  return (
    <>
      <Card>
        <Container>
          <CardContent>
            <Typography variant="h6" component="div">
              {ListData?.title}
            </Typography>
            <Typography variant="body2" className={DcStyle.smallText}>
              {ListData?.subTitle}
              {/* <br /> */}
            </Typography>

            {ListData?.body && (
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{ __html: ListData.body }}
              ></Typography>
            )}

            {listItems && (
              <FormControl>
                <FormGroup>
                  {listItems.map((item, index) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="secondary"
                          onChange={(e) => onItemSelect(e, index)}
                        />
                      }
                      label={item.value}
                      key={`${ListData.id}_${index}`}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            )}
          </CardContent>
        </Container>
        {checkListCompleted && (
          <Button
            onClick={() => props.onCheckListCompleted()}
            disabled={!checkListCompleted}
            className={
              checkListCompleted ? DcStyle.ebtnStyle : DcStyle.dbtnStyle
            }
            variant="body2"
          >
            {ListData?.continueButtonText}
          </Button>
        )}
      </Card>
    </>
  );
};
