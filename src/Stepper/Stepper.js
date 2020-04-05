import React, { useContext } from "react";
import { useStyles } from "./Styles";
import { StyledStepper } from "./Styles";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddresInput from "../AddressInput";
import { Context } from "../Context";
import { Wrapper } from "../FullAddress";

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const { isError, fullAddress } = useContext(Context);
  const steps = getSteps();
  const showAdress = fullAddress.map(component => {
    return (
      <Wrapper key={`${component.long_name}  ${component.types}`}>
        <h3>{`${component.types}:`}</h3>
        <p>{component.long_name}</p>
      </Wrapper>
    );
  });
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddresInput />;
      case 1:
        return showAdress;
      default:
        return "Unknown step";
    }
  }
  function getSteps() {
    return ["Please enter the address", "Here's your separated address"];
  }
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div className={classes.root}>
      <StyledStepper activeStep={activeStep}>
        {steps.map(label => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </StyledStepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you're finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}

            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={isError}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
