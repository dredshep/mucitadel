import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      background: "transparent",
    },
  },
}));

const MuButton = ({ className, children, ...rest }) => {
  const classes = useStyles();

  return (
    <Button className={clsx(classes.button, className)} {...rest}>
      {children}
    </Button>
  );
};

export default MuButton;
