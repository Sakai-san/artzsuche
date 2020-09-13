import React, { FunctionComponent, ReactElement } from "react";
import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  inputElementVisible: {
    visibility: "visible",
    opacity: 1,
    transition: "opacity 2s ease-in",
  },
  inputElementHidden: {
    visibility: "hidden",
    opacity: 0,
  },
}));

interface VisibilityTransitionProps {
  isHidden: boolean;
  children: ReactElement;
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
