import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",

      "& .MuiPaper-root": {
        background: "transparent",
      },

      "& .MuiStepIcon-root": {
        fontSize: theme.spacing(5),
        marginTop: -theme.spacing(1),
      },

      "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
        fontWeight: "bold",
        fontSize: theme.spacing(2.5),
      },
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

const DEFAULT_STEPS = ["Upload Image", "Mint NFT", "Record NFT"];

export default function MUStepper({ steps = DEFAULT_STEPS, activeStep }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
