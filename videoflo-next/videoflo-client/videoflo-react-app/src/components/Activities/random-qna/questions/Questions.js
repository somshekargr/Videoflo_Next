import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Questions(props) {
  const [qnaArr, setQnaArr] = useState([]);
  const [qnasWithCheck, setqnasWithCheck] = useState([]);

  useEffect(() => {
    let qnasWithResult = props.qnas.map((ele) => {
      ele.isAnswerCorrect = "initial";
      return ele;
    });

    setQnaArr([qnasWithResult[0]]);

    setqnasWithCheck(qnasWithResult);
  }, []);

  const addNextQuestion = (isAnswerCorrect) => {
    //Update result property of current question
    let modifiedQnas = [...qnaArr];
    modifiedQnas[modifiedQnas.length - 1].isAnswerCorrect = isAnswerCorrect;
    setQnaArr([...modifiedQnas]);
    //Display Action Buttons if All QNAs are completed
    if (qnaArr.length == qnasWithCheck.length) {
      props.payload(modifiedQnas)
      return;
    }
    //Add Next qna to questions array
    const nextElement = qnasWithCheck[qnaArr.length];
    setQnaArr((previousState) => [...previousState, nextElement]);
  };

  const renderQuestions = () => {
    const questions = qnaArr.map((question) => {
      let ele = question;
      return (
        <>
          <Grid container mb={1} spacing={2}>
            <Grid item xs={8}>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                {ele.question}
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: "left", color: "blue" }}
              >
                {ele.expectedAnswer}
              </Typography>
            </Grid>
            <Grid sx={{ margin: "auto" }} item xs={4}>
              {
                {
                  initial: (
                    <>
                      <Grid container spacing={2}>
                        <Grid sx={{ textAlign: "center" }} xs={6}>
                          <CheckCircleIcon
                            onClick={() => addNextQuestion(true)}
                            sx={{ color: "blue", cursor: "pointer" }}
                          ></CheckCircleIcon>
                        </Grid>
                        <Grid sx={{ textAlign: "center" }} xs={6}>
                          <CancelIcon
                            onClick={() => addNextQuestion(false)}
                            sx={{ color: "red", cursor: "pointer" }}
                          ></CancelIcon>
                        </Grid>
                      </Grid>
                    </>
                  ),
                  true: (
                    <>
                      <Grid container>
                        <Grid sx={{ textAlign: "center" }} xs={12}>
                          <CheckCircleIcon
                            sx={{ color: "blue", cursor: "pointer" }}
                          ></CheckCircleIcon>
                        </Grid>
                      </Grid>
                    </>
                  ),
                  false: (
                    <>
                      <Grid>
                        <Grid sx={{ textAlign: "center" }} xs={12}>
                          <CancelIcon
                            sx={{ color: "red", cursor: "pointer" }}
                          ></CancelIcon>
                        </Grid>
                      </Grid>
                    </>
                  ),
                }[ele.isAnswerCorrect]
              }
            </Grid>
          </Grid>
          <Divider />
        </>
      );
    });
    return questions;
  };

  return renderQuestions();
}
