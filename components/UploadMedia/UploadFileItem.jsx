import { Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import { memo } from "react";

const useStyles = makeStyles((theme) => ({
  fileContainer: {
    position: "relative",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2.5),
    height: "100%",
    border: `2px dashed ${theme.palette.primary.main}`,
  },
  image: {
    width: "100%",
    height: theme.spacing(27.5),
    objectFit: "contain",
    imageRendering: "pixelated",
  },
  deleteIcon: {
    position: "absolute",
    top: theme.spacing(0.75),
    right: theme.spacing(0.75),
    width: theme.spacing(3.75),
    height: theme.spacing(3.75),
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

const UploadFileItem = ({ type, fileBuffer, onDelete, className }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={clsx(classes.fileContainer, className)}
    >
      {fileBuffer && (
        <img alt="media" src={fileBuffer} className={classes.image} />
      )}
      <IconButton className={classes.deleteIcon} onClick={onDelete}>
        <CloseIcon />
      </IconButton>
    </Grid>
  );
};

export default memo(UploadFileItem);
