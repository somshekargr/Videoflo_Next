import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function LiveSummary(props) {
  const [isFailed, setisFailed] = useState(false);
  const [totalPoses, settotalPoses] = useState(0);
  const [passedPoses, setpassedPoses] = useState(0);
  const [failedPoses, setfailedPoses] = useState(0);
  const [isResultProcessed, setisResultProcessed] = useState(false);

  useEffect(() => {
    if (props) {
      let passed = 0;
      let failed = 0;

      const finalResults = props.payload.payload;
      settotalPoses(finalResults.length);

      finalResults.forEach((poseResults) => {
        const results = poseResults.result.response.results;

        const totalItems = results.length;

        const poseMatchingItems = results.filter(
          (item) => item.result === true
        ).length;

        const matchingProportion = poseMatchingItems / totalItems;

        // If 3/4th of the poses are matching, then we are good.
        const isSuccess = matchingProportion >= 0.75;

        if (isSuccess) {
          passed = passed + 1;
        } else {
          failed = failed + 1;
        }
      });

      setpassedPoses(passed);
      setfailedPoses(failed);
    }
  }, [props]);

  useEffect(() => {
    if (passedPoses != 0 || failedPoses != 0) {
      setisFailed(passedPoses / totalPoses < 0.75);
      setisResultProcessed(true);
    }
  }, [passedPoses, failedPoses]);

  return (
    <>
      <CardContent>
        <Typography
          mb={1}
          variant="body1"
          component="div"
          sx={{ fontWeight: 500, color: "#757575" }}
        >
          Liveness Check
        </Typography>
        {isResultProcessed && (
          <>
            {!isFailed && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert icon={false} severity="success">
                  Liveness Check Passed: {passedPoses} out of {totalPoses}{" "}
                  passed.
                </Alert>
              </Stack>
            )}
            {isFailed && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert icon={false} severity="error">
                  Liveness Check Failed!: {failedPoses} out of {totalPoses}{" "}
                  failed.
                </Alert>
              </Stack>
            )}
          </>
        )}
      </CardContent>
    </>
  );
}
