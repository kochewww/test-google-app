import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Stepper from "@material-ui/core/Stepper";
export const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export const StyledStepper = styled(Stepper)`
  padding: 0;
  margin: 1rem 0rem 1rem -8px;
`;
