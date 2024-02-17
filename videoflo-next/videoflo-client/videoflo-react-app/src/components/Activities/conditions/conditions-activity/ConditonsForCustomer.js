import React, { useState } from "react";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";

const CustomerConditionsComponent = ({
  conditions,
  onConditionsCompleted,
  onEachCondition,
}) => {
  const [checkedConditions, setCheckedConditions] = useState([]);
  const [currentConditionIndex, setCurrentConditionIndex] = useState(0);
  const [allConditionsCompleted, setAllConditionsCompleted] = useState(false);

  const handleCheckButtonClick = () => {
    onEachCondition();
    setCheckedConditions([
      ...checkedConditions,
      conditions[currentConditionIndex],
    ]);
    setCurrentConditionIndex(() => currentConditionIndex + 1);
    if (currentConditionIndex + 1 === conditions.length) {
      setAllConditionsCompleted(true); // Mark all conditions as completed
      onConditionsCompleted(); // Notify parent component that all conditions are completed
    }
  };

  return (
    <div>
      {checkedConditions.map((condition, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <p>
            {index + 1}. {condition}
          </p>
          <CheckIcon style={{ marginLeft: "10px", color: "green" }} />
        </div>
      ))}
      {!allConditionsCompleted && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>
            {checkedConditions.length + 1}. {conditions[currentConditionIndex]}
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckButtonClick}
          >
            <CheckIcon />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerConditionsComponent;
