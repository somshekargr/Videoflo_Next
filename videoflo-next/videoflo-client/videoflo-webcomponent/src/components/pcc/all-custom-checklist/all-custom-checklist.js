import React, { useEffect, useState } from "react";
import CustomChecklist from "../custom-checklist/custom-checklist";
import { useSelector } from "react-redux";
 

export function TestCheckList(props) {
  let [eachCheckList, seteachCheckList] = useState([]);
  let [checkListWithStatus, setcheckListWithStatus] = useState([]);

  useEffect(() => {
    let checkListWithStatus = props.data.data.map((ele, index) => {
      ele.Index = index;
      return ele;
    });
    seteachCheckList([checkListWithStatus[0]]);
    setcheckListWithStatus(checkListWithStatus);
  }, []);

  useEffect(() => {
    CustomCheckList();
  }, [eachCheckList]);

  const onNextChecklist = (index) => {
    if (checkListWithStatus.length < index)
      seteachCheckList([checkListWithStatus[index + 1]]); 
  };

  const CustomCheckList = () => {
    const checkList = eachCheckList.map((ele, index) => {
      let element = ele;
      console.log(element);
      return (
        <>
          <CustomChecklist
            data={element}
            key={index}
            nextChecklist={onNextChecklist}
          />
        </>
      );
    });
    return checkList;
  };

  return CustomCheckList();
}
