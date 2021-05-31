import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { memo } from "react";

const useStyles = makeStyles((theme) => ({
  image: {
    height: "90%",
    width: "90%",
    left: "5%",
    objectFit: "cover",
    borderRadius: 1,
    position: "absolute",
  },
  container: (props) => ({
    height: theme.spacing(48),
    width: theme.spacing(36),
    position: "relative",
    "&:focus": {
      outline: "0 !important",
    },
  }),
  placeholder: {
    height: "100%",
    padding: theme.spacing(1),
    width: theme.spacing(36),
    borderRadius: theme.spacing(1),
    border: `2px solid ${theme.palette.primary.main}`,
  },
  nameWrapper: {
    borderRadius: 1,
    bottom: 0,
    position: "absolute",
    paddingTop: 0,
    padding: theme.spacing(0, 5, 2),
  },
  name: {
    opacity: 0.9,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontWeight: "bold",
  },
  template: {
    width: "100%",
    height: "100%",
    position: "relative",
    boxShadow: "0px 2px 12px #fff4",
    [theme.breakpoints.down("sm")]: {
      boxShadow: "none",
    },
  },
}));

const PreviewCard = ({ type, name, fileBuffer, dialogMode }) => {
  const classes = useStyles({ dialogMode: dialogMode });

  return (
    <>
      {/* // <div className={classes.container}> */}
      {fileBuffer ? (
        <>
          {type === "Image" ? (
            <img alt="preview-img" src={fileBuffer} className={classes.image} />
          ) : (
            <video autoPlay loop controls className={classes.image}>
              <source src={fileBuffer} />
            </video>
          )}
          <img
            alt="preview-template"
            src={`/images/template.png`}
            className={classes.template}
          />
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.nameWrapper}
          >
            <Typography className={classes.name}>{name}</Typography>
          </Grid>
        </>
      ) : (
        <Grid
          className={classes.placeholder}
          container
          justify="center"
          alignItems="center"
        >
          <Typography variant="h6" color="textSecondary" align="center">
            Preview your meme
          </Typography>
        </Grid>
      )}
      {/* // </div> */}
    </>
  );
};

export default memo(PreviewCard);
