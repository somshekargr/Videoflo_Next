import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function RandomQnaSummary(props) {
  const [totalAnswers, setTotalAnswers] = useState(0)
  const [correctAnswers, setCorrectlAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  useEffect(() => {
    if (props) {
      const qnaResponses = props.payload.payload;
      setTotalAnswers(qnaResponses?.length);
      setCorrectlAnswers(qnaResponses?.filter((r) => r.isAnswerCorrect).length)
      setIncorrectAnswers(qnaResponses?.filter((r) => !r.isAnswerCorrect).length)
    }
  }, [props]);

  return (
    <>
      <CardContent>
        <Typography
          mb={1}
          variant="body1"
          component="div"
          sx={{ fontWeight: 500, color: "#757575" }}
        >
          Q&A Responses
        </Typography>
        <Stack sx={{ width: "100%" }} spacing={2}>
          {correctAnswers > 0 && (
            <Alert icon={false} severity="success">
              <div>
                {correctAnswers} of {totalAnswers} were correct.
              </div>
            </Alert>
          )}
          {incorrectAnswers > 0 && (
            <Alert icon={false} severity="error">
              <div>
                {incorrectAnswers} of {totalAnswers} were incorrect.
              </div>
            </Alert>
          )}
        </Stack>
      </CardContent>
    </>
  );
}
