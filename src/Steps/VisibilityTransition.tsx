import React, { FunctionComponent } from "react";
import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  inputElementVisible: {
    visibility: "visible",
    opacity: 1,
    transition: "opacity 2s linear",
  },
  inputElementHidden: {
    visibility: "hidden",
    opacity: 0,
    transition: "visibility 0s 2s, opacity 2s linear",
  },
}));

interface VisibilityTransitionProps {
  isHidden: boolean;
  children: React.ReactElement;
}

const VisibilityTransition: FunctionComponent<VisibilityTransitionProps> = ({
  isHidden,
  children,
}) => {
  const classes = useStyles();

  return (
    <div
      className={
        isHidden ? classes.inputElementHidden : classes.inputElementVisible
      }
    >
      {children}
    </div>
  );
};

export default VisibilityTransition;
