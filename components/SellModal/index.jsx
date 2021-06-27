import {
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
import clsx from "clsx";
import { ethers } from "ethers";
import { Formik } from "formik";
import React from "react";
import marketcontractAbi from "../../config/abi/marketplace.json";
import contractAbi from "../../config/abi/meme.json";
import tokencontractAbi from "../../config/abi/token.json";
import {
  contractAdd,
  contractAddB,
  marketcontractAdd,
  marketcontractAddB,
  tokencontractAdd,
  tokencontractAddB,
} from "../../constant/blockchain";
import MuButton from "../UI/Button/MuButton";
import Modal from "../UI/Modal";

var window = require("global/window");

let chainID = "";

const useStyles = makeStyles((theme) => ({
  form: {
    width: theme.spacing(60),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
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
  deleteIcon: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(2),
  },
}));

const SellModal = ({ visible, tokenId, properties, onCloseModal }) => {
  const classes = useStyles();

  const initialValues = {
    Currencies: [{ Price: "", Currency: "" }],
  };

  const handleSave = (values, setSubmitting) => {
    setSubmitting(false);
    handleSell(values);
  };

  const handleSell = async (values) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      /* Selecting the right Blockchain */
      let ContractInteraction = "";
      let MarketPlaceAddress = "";
      let nftAddress = "";
      console.log(properties);

      if (properties.blockchain == "ethereum") {
        ContractInteraction = tokencontractAdd;
        MarketPlaceAddress = marketcontractAdd;
        nftAddress = contractAdd;
      } else if (properties.blockchain == "binance") {
        ContractInteraction = tokencontractAddB;
        MarketPlaceAddress = marketcontractAddB;
        nftAddress = contractAddB;
      }

      let contract = new ethers.Contract(
        MarketPlaceAddress,
        marketcontractAbi,
        provider.getSigner()
      );

      let nftcontract = new ethers.Contract(
        nftAddress,
        contractAbi,
        provider.getSigner()
      );

      let contractToken = new ethers.Contract(
        ContractInteraction,
        tokencontractAbi,
        provider.getSigner()
      );

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      /* Check if Contract is Approved */
      const approval = await nftcontract.functions.isApprovedForAll(
        accounts.toString(),
        MarketPlaceAddress
      );
      console.log(approval.toString());

      if (approval.toString() == "false") {
        /* If Token is not appoved for selling in contract approval dialog box will appear */
        await nftcontract.functions.setApprovalForAll(marketplace, 1);
        return false;
      }
      /* Fetch Token ID using Token Hash */
      const tokenID = parseInt(
        await nftcontract.functions.getTokenIdFromHash(properties.id)
      );
      // const tokenID = 3;

      /* Sell Section */
      if (
        values.Currencies.length == 1 &&
        values.Currencies[0].Currency == "DANK"
      ) {
        /* Approve Token */
        const approval = await contractToken.functions.allowance(
          accounts.toString(),
          MarketPlaceAddress
        );
        console.log(parseInt(approval));
        console.log(
          BigInt(parseInt(values.Currencies[0].Price) * 10 ** 18)
            .toString()
            .split(" ")
        );

        if (parseInt(approval) < parseInt(values.Currencies[0].Price) * 1e18) {
          /* If Token is not appoved for selling in contract approval dialog box will appear */
          await contractToken.functions.approve(MarketPlaceAddress, 1e30);
          return false;
        }

        var cardOwner = await nftcontract.functions.ownerOf(
          accounts.toString(),
          tokenID
        );
        if (cardOwner.toString() == "false") {
          alert("Token Sold by user or already on sale");
          return false;
        }
        await contract.functions
          .readyToSellToken(
            tokenID,
            1,
            0,
            values.Currencies[0].Currency.split(" "),
            (parseInt(values.Currencies[0].Price) * 1e18).toString().split(" ")
          )
          .then(async function (result) {
            return false;
          });
      } else if (
        values.Currencies.length == 1 &&
        values.Currencies[0].Currency == "ETH"
      ) {
        // var cardOwner =  await nftcontract.functions.ownerOf(
        //   accounts.toString(),
        //   tokenID
        // );
        // if(cardOwner.toString() == "false"){
        //   alert("Token Sold by user or already on sale");
        //   return false;
        // }

        var fee = parseInt(await contract.functions.makerFee());
        console.log(fee);
        var feePayment = (parseInt(values.Currencies[0].Price) * fee) / 1000;

        await contract.functions
          .readyToSellToken(
            tokenID,
            1,
            (parseInt(values.Currencies[0].Price) * 1e18).toString(),
            [],
            [],
            { value: (feePayment * 1e18).toString() }
          )
          .then(async function (result) {
            return false;
          });
      } else {
        var currencySymbol = "";
        var currencyPrice = "";
        var ethPrice = "";

        var cardOwner = await nftcontract.functions.ownerOf(
          accounts.toString(),
          tokenID
        );
        if (cardOwner.toString() == "false") {
          alert("Token Sold by user or already on sale");
          return false;
        }

        for (var i = 0; i < values.Currencies.length; i++) {
          if (values.Currencies[i].Currency == "DANK") {
            currencyPrice = (parseInt(values.Currencies[i].Price) * 1e18)
              .toString()
              .split(" ");
            currencySymbol = values.Currencies[i].Currency.split(" ");
          } else {
            ethPrice = (parseInt(values.Currencies[i].Price) * 1e18).toString();
          }
        }

        console.log(ethPrice.toString() + "," + currencyPrice.toString() + "");
        console.log("ETH".toString() + "," + currencySymbol.toString() + "");

        await contract.functions
          .readyToSellToken(tokenID, 1, ethPrice, currencySymbol, currencyPrice)
          .then(async function (result) {
            return false;
          });
      }
    } else {
      alert("Connect Metamask");
    }
  };

  const validateForm = (values) => {
    let errors = {};
    for (let i = 0; i < values.Currencies.length; i++) {
      if (!values.Currencies[i].Price) {
        errors = {
          ...errors,
          [`Currencies[${i}].Price`]: "Price is required",
        };
      }
      if (!values.Currencies[i].Currency) {
        errors = {
          ...errors,
          [`Currencies[${i}].Currency`]: "Currency is required",
        };
      }
      if (!values.SellingAmount) {
        errors = {
          ...errors,
          [`Currencies[${i}].Currency`]: "Currency is required",
        };
      }
    }
    console.log("ant : errors => ", errors);
    return errors;
  };

  return (
    <Modal visible={visible} title={"Selling"} closeModal={onCloseModal}>
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={(values, { setSubmitting }) => {
          handleSave(values, setSubmitting);
        }}
      >
        {(props) => {
          const {
            handleSubmit,
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            isSubmitting,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <div className={classes.form}>
                <Grid className="mb-6" container wrap="nowrap">
                  <Typography className="w-20">{`Token id : `}</Typography>
                  <Typography noWrap className="text-white">
                    {tokenId}
                  </Typography>
                </Grid>
                {values.Currencies.map((currency, index) => {
                  return (
                    <Grid
                      className={classes.form}
                      key={`currency-${index}`}
                      container
                      wrap="nowrap"
                    >
                      <Grid container spacing={2}>
                        <Grid container item md={6} lg={6} sm={6} xs={12}>
                          <Typography className={classes.formLabel}>
                            Selling amount
                          </Typography>
                          <TextField
                            name={`Currencies[${index}].Price`}
                            variant="outlined"
                            type="number"
                            className={clsx(
                              classes.formField,
                              classes.numberInput
                            )}
                            value={currency.Price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="How many tokens you're selling"
                            margin="normal"
                          />
                        </Grid>
                        <Grid
                          container
                          item
                          md={6}
                          lg={6}
                          sm={6}
                          xs={12}
                          direction="column"
                        >
                          <Typography className={classes.formLabel}>
                            Available amount
                          </Typography>
                          <Typography
                            className={classes.formLabel}
                            style={{ marginTop: "10px" }}
                          >
                            3
                          </Typography>
                        </Grid>
                        <Grid container item md={6} lg={6} sm={6} xs={12}>
                          <Typography className={classes.formLabel}>
                            Price
                          </Typography>
                          <TextField
                            name={`Currencies[${index}].Price`}
                            variant="outlined"
                            type="number"
                            className={clsx(
                              classes.formField,
                              classes.numberInput
                            )}
                            value={currency.Price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Please input meme price"
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
                {Object.keys(errors).length > 0 && (
                  <Grid className="mb-4" container justify="flex-start">
                    <FormHelperText className={classes.helperText}>
                      Please input price and currency!
                    </FormHelperText>
                  </Grid>
                )}
                <Grid container justify="space-between">
                  <MuButton
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                  >
                    {"Sell"}
                  </MuButton>
                  {values.Currencies.length < 2 && (
                    <MuButton
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
                </Grid>
              </div>
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default SellModal;
