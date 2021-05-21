import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUploadOutlined";
import clsx from "clsx";
import { memo } from "react";

const useStyles = makeStyles((theme) => ({
  upload: {
    width: "100%",
    padding: theme.spacing(4),
    height: "100%",
    borderRadius: theme.spacing(2.5),
    border: `2px dashed ${theme.palette.primary.main}`,
    "&:focus": {
      outline: "0 !important",
    },
  },
  iconContainer: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginBottom: theme.spacing(0.5),
  },
  uploadIcon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    transition: "width 0.5s, height 0.5s",
    color: theme.palette.primary.main,
  },
  dragActiveIcon: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  button: {
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      background: "transparent",
    },
  },
  error: {
    color: theme.palette.primary.main,
    fontSize: theme.spacing(1.5),
    marginTop: theme.spacing(0.5),
  },
}));

const UploadArea = ({
  placeholder,
  isDragActive,
  showEmptyFileError,
  getRootProps,
  getInputProps,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        {...getRootProps()}
        className={classes.upload}
      >
        <input {...getInputProps()} />
        <Typography variant="h6" color="textSecondary" align="center">
          {placeholder}
        </Typography>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.iconContainer}
        >
          <CloudUploadIcon
            className={clsx(classes.uploadIcon, {
              [classes.dragActiveIcon]: isDragActive,
            })}
          />
        </Grid>
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="primary"
        >
          Choose file
        </Button>
      </Grid>
      {showEmptyFileError && (
        <Typography className={classes.error}>Image is required</Typography>
      )}
    </>
  );
};

export default memo(UploadArea);
