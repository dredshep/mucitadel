import { Dialog, Grid, Snackbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { memo, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { MAX_UPLOAD_SIZE } from "../../constant";
import MESSAGES from "../../constant/messages";
// import "react-image-crop/dist/ReactCrop.css";
import { isEmpty } from "../../utils/helpers/utility";
import PreviewCard from "../PreviewCard";
import MuButton from "../UI/Button/MuButton";
import UploadArea from "./UploadArea";
import UploadFileItem from "./UploadFileItem";

const useStyles = makeStyles((theme) => ({
  alert: {
    color: theme.palette.text.main,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    boxShadow: theme.custom.defaultBoxShadow,
  },
  error: {
    marginLeft: theme.spacing(1),
  },
  dialog: {
    backgroundColor: theme.palette.background.secondary,
    padding: theme.spacing(3, 4),
    minWidth: theme.spacing(70),
    [theme.breakpoints.down("xs")]: {
      maxHeight: `calc(100vh - ${theme.spacing(4)}px)`,
      minWidth: "unset",
      padding: theme.spacing(2, 2),
      margin: theme.spacing(2),
    },
  },
  button: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      height: theme.spacing(4),
    },
  },
  imagePanel: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    maxHeight: 500,
    "& img": {
      maxWidth: "100%",
      maxHeight: "100%",
      minWidth: theme.spacing(35),
    },
  },
  cropImage: {
    marginBottom: theme.spacing(2),
  },
  crop: {
    maxHeight: "100%",
    "& .ReactCrop__image": {
      maxHeight: theme.spacing(60),
      [theme.breakpoints.down("xs")]: {
        maxHeight: `100%`,
      },
    },
  },
  previewContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  preview: {
    width: theme.spacing(36),
    height: theme.spacing(48),
    marginRight: theme.spacing(2),
    position: "relative",
    "&:focus": {
      outline: "0 !important",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(2),
    },
  },
}));

const initialCrop = {
  x: 0,
  y: 0,
  aspect: 0.75,
};

let imageRef = null;

const UploadMedia = ({
  role,
  type,
  values,
  fileBuffer,
  setFileBuffer,
  className,
  showEmptyFileError,
}) => {
  const [popup, setPopup] = useState();
  const classes = useStyles();
  const [uploadedFile, setUploadedFile] = useState();
  const [croppedImageSrc, setCroppedImageSrc] = useState(null);
  const [crop, setCrop] = useState(initialCrop);

  const deleteFileHandler = useCallback(() => {
    setFileBuffer(null);
  }, [setFileBuffer]);

  const onDrop = async (acceptedFiles) => {
    if (!Array.isArray(acceptedFiles) || acceptedFiles.length <= 0) {
      setPopup({ text: MESSAGES.MAX_UPLOAD_ERROR });
      return;
    }

    const file = acceptedFiles[0];

    if (role === "user") {
      setUploadedFile(window.URL.createObjectURL(file));
    } else {
      setFileBuffer(window.URL.createObjectURL(file));
    }
    // setFileBuffer(window.URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: type.ACCEPT,
    maxSize: MAX_UPLOAD_SIZE,
  });

  const handleClose = () => {
    setPopup();
  };

  const handleCloseUploadFile = () => {
    setUploadedFile();
  };

  const onSaveImage = () => {
    setFileBuffer(croppedImageSrc);
    setUploadedFile();
  };

  const onCropChange = (crop, percentCrop) => {
    setCrop(crop);
  };

  const onImageLoaded = (image) => {
    imageRef = image;
    let crop = {
      ...initialCrop,
    };

    if (parseFloat(image.height) * 0.75 > image.width) {
      crop = {
        ...crop,
        width: image.width,
        height: image.width / 0.75,
        y: (image.height - image.width / 0.75) / 2,
      };
    } else {
      crop = {
        ...crop,
        height: image.height,
        width: image.height * 0.75,
        x: (image.width - image.height * 0.75) / 2,
      };
    }

    setCrop(crop);
    makeClientCrop(crop);
    return false;
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImgDataUrl(imageRef, crop);
      if (typeof croppedImageUrl === "string") {
        // if base64 code
        setCroppedImageSrc(croppedImageUrl);
      } else {
        setCroppedImageSrc(URL.createObjectURL(croppedImageUrl));
      }
    }
  };

  const getCroppedImgDataUrl = (image, crop, intl) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = Math.ceil(crop.width * scaleX);
    canvas.height = Math.ceil(crop.height * scaleY);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    const blob = new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          blob.name = "meme";
          resolve(blob);
        },
        "image/jpeg",
        1
      );
    });
    console.log("a blob lol", blob);
    return blob;
  };

  return (
    <div className={className}>
      {role === "user" ? (
        <>
          <Grid container className={classes.previewContainer}>
            <div className={classes.preview}>
              <PreviewCard
                type={"Image"}
                fileBuffer={fileBuffer}
                name={values.Name}
              />
            </div>
            {/* {isEmpty(fileBuffer) && ( */}
            <UploadArea
              mode="mini"
              placeholder={type.PLACEHOLDER}
              isDragActive={isDragActive}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              showEmptyFileError={showEmptyFileError}
            />
            {/* )} */}
          </Grid>
        </>
      ) : (
        <>
          {isEmpty(fileBuffer) ? (
            <UploadArea
              placeholder={type.PLACEHOLDER}
              isDragActive={isDragActive}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              showEmptyFileError={showEmptyFileError}
            />
          ) : (
            <UploadFileItem
              type={type.VALUE}
              fileBuffer={fileBuffer}
              onDelete={deleteFileHandler}
            />
          )}
        </>
      )}
      {popup && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          autoHideDuration={3000}
          open={popup ? true : false}
          onClose={handleClose}
        >
          <Grid container className={classes.alert}>
            <ErrorOutlineIcon />
            <Typography className={classes.error}>{popup.text}</Typography>
          </Grid>
        </Snackbar>
      )}
      {uploadedFile && (
        <Dialog
          maxWidth="lg"
          classes={{
            paper: classes.dialog,
          }}
          aria-labelledby="simple-dialog-title"
          open={true}
          onClose={handleCloseUploadFile}
        >
          <Typography variant="h6" className={classes.cropImage}>
            Crop Image
          </Typography>
          <div className={classes.imagePanel}>
            <ReactCrop
              className={classes.crop}
              src={uploadedFile}
              crop={crop}
              onImageLoaded={onImageLoaded}
              onChange={onCropChange}
              onComplete={onCropComplete}
            />
          </div>
          <Grid container justify="flex-end">
            <MuButton
              className={classes.button}
              onClick={onSaveImage}
              variant="contained"
              color="primary"
            >
              Save
            </MuButton>
          </Grid>
        </Dialog>
      )}
    </div>
  );
};

export default memo(UploadMedia);
