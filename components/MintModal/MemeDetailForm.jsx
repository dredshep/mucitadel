import {
  Checkbox,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import GetAppIcon from "@material-ui/icons/GetApp";
import clsx from "clsx";
import React from "react";
import { TIERS } from "../../constant/tiers";
import MuButton from "../UI/Button/MuButton";

const useStyles = makeStyles((theme) => ({
  formField: {
    margin: 0,
    width: "100%",
    marginBottom: theme.spacing(5),
    "& .MuiInputBase-root": {
      borderBottom: `1px solid ${theme.palette.primary.secondary}`,
      borderRadius: 0,
      padding: 0,
      "& input, textarea": {
        padding: theme.spacing(1.5, 0),
      },
    },
    "& .MuiFormHelperText-root": {
      marginLeft: 0,
      color: theme.palette.primary.main,
    },
    "& fieldset": {
      border: "none",
    },
    "&:focus": {
      outline: "none",
    },
  },
  helperText: {
    color: theme.palette.primary.main,
  },
  formLabel: {
    fontWeight: "bold",
  },
  actions: {
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  select: {
    "&.MuiInputBase-root": {
      borderBottom: `1px solid ${theme.palette.primary.secondary}`,
      width: "100%",

      "& svg": {
        color: theme.palette.text.primary,
      },

      "&::before": {
        borderBottom: "none !important",
      },
      "&::after": {
        borderBottom: "none !important",
      },
    },

    "&.MuiSelect-root": {
      padding: theme.spacing(1.5, 3, 1.5, 0),
      borderBottom: `1px solid ${theme.palette.primary.secondary}`,
    },
  },
  selectContainer: {
    width: "100%",
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(0.5),
    position: "relative",
    "& .MuiFormLabel-root": {
      position: "absolute",
      left: 0,
      top: theme.spacing(1.5),
      color: "darkgrey",
      opacity: 0.7,
    },
    "& .MuiInputBase-root": {
      height: theme.spacing(5.5),
    },
  },
  selectPaper: {
    background: theme.palette.primary.main,
  },
  formControl: {
    width: "100%",
    "& .MuiFormLabel-root": {
      margin: theme.spacing(-1.25, 0, 0, 2),
      color: "#aeaeae",
    },
  },
  forSale: {
    marginBottom: theme.spacing(3),
  },
  addCurrency: {
    whiteSpace: "nowrap",
    padding: theme.spacing(0.5, 2),
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(25),
      fontSize: theme.spacing(1.5),
    },
  },
  deleteIcon: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(2),
  },
}));

const MemeCreationForm = ({
  values,
  touched,
  errors,
  role,
  setFieldValue,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Typography className={classes.formLabel}>Name</Typography>
        <TextField
          name="Name"
          variant="outlined"
          className={classes.formField}
          value={values.Name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Please input name"
          helperText={errors.Name && touched.Name && errors.Name}
          margin="normal"
        />
      </Grid>
      {role !== "user" && (
        <Grid container>
          <Typography className={classes.formLabel}>Tier</Typography>
          <Grid className={classes.selectContainer}>
            {!values.Tier && (
              <InputLabel htmlFor="name-multiple">
                Please select tier
              </InputLabel>
            )}
            <Select
              className={classes.select}
              name="Tier"
              value={values.Tier}
              onChange={handleChange}
              onBlur={handleBlur}
              MenuProps={{
                classes: {
                  paper: classes.selectPaper,
                },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
              placeholder="Please select tier"
              labelId="label"
              id="price-selector"
            >
              {TIERS.map((tier) => (
                <MenuItem value={tier.value} key={tier.value}>
                  {tier.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText className={classes.helperText}>
              {errors.Tier && touched.Tier && errors.Tier}
            </FormHelperText>
          </Grid>
        </Grid>
      )}
      <Grid container>
        <Typography className={classes.formLabel}>Description</Typography>
        <TextField
          name="Description"
          variant="outlined"
          className={classes.formField}
          value={values.Description}
          onBlur={handleBlur}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Please input description"
          helperText={
            errors.Description && touched.Description && errors.Description
          }
          margin="normal"
        />
      </Grid>
      {/* <Grid
        container
        justify="space-between"
        alignItems="center"
        wrap="nowrap"
        className={classes.forSale}
      >
        <Grid container alignItems="center">
          <Typography className={classes.formLabel}>For sale</Typography>
          <Checkbox
            name="ForSale"
            checked={values.ForSale}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        {values.ForSale && values.Currencies.length < 2 && (
          <MuButton
            size="small"
            className={classes.addCurrency}
            onClick={() => {
              setFieldValue("Currencies", [
                ...values.Currencies,
                { Price: "", Currency: "" },
              ]);
            }}
            variant="contained"
            color="primary"
          >
            Add Currency
          </MuButton>
        )}
      </Grid> */}
      {/* {values.ForSale && (
        <>
          {values.Currencies.map((currency, index) => {
            return (
              <Grid key={`currency-${index}`} container wrap="nowrap">
                <Grid container spacing={2}>
                  <Grid container item md={6} lg={6} sm={6} xs={12}>
                    <Typography className={classes.formLabel}>Price</Typography>
                    <TextField
                      name={`Currencies[${index}].Price`}
                      variant="outlined"
                      type="number"
                      className={clsx(classes.formField, classes.numberInput)}
                      value={currency.Price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Please input meme price"
                      helperText={
                        errors[`Currencies[${index}].Price`] &&
                        touched[`Currencies[${index}].Price`] &&
                        errors[`Currencies[${index}].Price`]
                      }
                      margin="normal"
                    />
                  </Grid>
                  <Grid container item md={6} lg={6} sm={6} xs={12}>
                    <Typography className={classes.formLabel}>
                      Currency
                    </Typography>
                    <Grid className={classes.selectContainer}>
                      {!currency.Currency && (
                        <InputLabel htmlFor="name-multiple">
                          Please select currency
                        </InputLabel>
                      )}
                      <Select
                        className={classes.select}
                        name={`Currencies[${index}].Currency`}
                        value={currency.Currency}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        MenuProps={{
                          classes: {
                            paper: classes.selectPaper,
                          },
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                          getContentAnchorEl: null,
                        }}
                        placeholder="Please select currency"
                        labelId="label"
                        id="price-selector"
                      >
                        <MenuItem value="ETH">ETH</MenuItem>
                        <MenuItem value="DANK">DANK</MenuItem>
                      </Select>
                      <FormHelperText className={classes.helperText}>
                        {errors[`Currencies[${index}].Currency`] &&
                          touched[`Currencies[${index}].Currency`] &&
                          errors[`Currencies[${index}].Currency`]}
                      </FormHelperText>
                    </Grid>
                  </Grid>
                </Grid>
                {values.Currencies.length > 1 && (
                  <IconButton
                    className={classes.deleteIcon}
                    onClick={() => {
                      let newCurrencies = [...values.Currencies];
                      newCurrencies.splice(index, 1);
                      setFieldValue("Currencies", newCurrencies);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Grid>
            );
          })}
        </>
      )} */}
      <Grid container>
        <Typography className={classes.formLabel}>Blockchain</Typography>
        <Grid className={classes.selectContainer}>
          {!values.Blockchain && (
            <InputLabel htmlFor="name-multiple">
              Please select blockchain
            </InputLabel>
          )}
          <Select
            className={classes.select}
            name="Blockchain"
            value={values.Blockchain}
            onChange={handleChange}
            onBlur={handleBlur}
            MenuProps={{
              classes: {
                paper: classes.selectPaper,
              },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
            placeholder="Please select blockchain"
            labelId="label"
            id="price-selector"
          >
            <MenuItem value="ethereum">Ethereum</MenuItem>
            <MenuItem value="binance">Binance</MenuItem>
          </Select>
          <FormHelperText className={classes.helperText}>
            {errors.Blockchain && touched.Blockchain && errors.Blockchain}
          </FormHelperText>
        </Grid>
      </Grid>
      <Grid container className={classes.actions}>
        <MuButton
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          startIcon={<GetAppIcon />}
        >
          {"Mint"}
        </MuButton>
      </Grid>
    </>
  );
};

export default MemeCreationForm;
