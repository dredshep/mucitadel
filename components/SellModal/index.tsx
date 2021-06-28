import {
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import clsx from 'clsx'
import { ethers } from 'ethers'
import { Formik } from 'formik'
import React from 'react'
import marketcontractAbi from '../../config/abi/marketplace.json'
import contractAbi from '../../config/abi/meme.json'
import tokencontractAbi from '../../config/abi/token.json'
import {
  contractAdd,
  contractAddB,
  marketcontractAdd,
  marketcontractAddB,
  tokencontractAdd,
  tokencontractAddB,
} from '../../constant/blockchain'
import { NFT } from '../../types/nft'
import MuButton from '../UI/Button/MuButton'
import Modal from '../UI/Modal'

var window = require('global/window')

const useStyles = makeStyles((theme) => ({
  form: {
    width: theme.spacing(60),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  formField: {
    margin: 0,
    width: '100%',
    marginBottom: theme.spacing(5),
    '& .MuiInputBase-root': {
      borderBottom: `1px solid ${theme.palette.secondary}`,
      borderRadius: 0,
      padding: 0,
      '& input, textarea': {
        padding: theme.spacing(1.5, 0),
      },
    },
    '& .MuiFormHelperText-root': {
      marginLeft: 0,
      color: theme.palette.primary.main,
    },
    '& fieldset': {
      border: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  helperText: {
    color: theme.palette.primary.main,
  },
  formLabel: {
    fontWeight: 'bold',
  },
  select: {
    '&.MuiInputBase-root': {
      borderBottom: `1px solid ${theme.palette.secondary}`,
      width: '100%',

      '& svg': {
        color: theme.palette.text.primary,
      },

      '&::before': {
        borderBottom: 'none !important',
      },
      '&::after': {
        borderBottom: 'none !important',
      },
    },

    '&.MuiSelect-root': {
      padding: theme.spacing(1.5, 3, 1.5, 0),
      borderBottom: `1px solid ${theme.palette.secondary}`,
    },
  },
  selectContainer: {
    width: '100%',
    marginBottom: theme.spacing(5),
    position: 'relative',
    '& .MuiFormLabel-root': {
      position: 'absolute',
      left: 0,
      top: theme.spacing(1.5),
      color: 'darkgrey',
      opacity: 0.7,
    },
    '& .MuiInputBase-root': {
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
}))

const SellModal = ({
  visible,
  tokenId,
  properties,
  onCloseModal,
}: {
  visible: any
  tokenId: string
  properties: NFT
  onCloseModal: () => void
}) => {
  const classes = useStyles()

  const initialValues = {
    Currencies: [{ Price: '', Currency: '' }],
  }

  const handleSave = (values, setSubmitting) => {
    setSubmitting(false)
    handleSell(values)
  }

  const handleSell = async (values) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      /* ETH Main - 1,Ropstem - 3, Binance Main :56	, Binance Testnet :97 */
      const chainID = parseInt(await window.ethereum.chainId)
      console.log(chainID)

      if (properties.blockchain == 'ethereum') {
        if (chainID == 1 || chainID == 4) {
          /* Do Nothing */
        } else {
          alert('Wrong Blockchain Connected switch to Ethereum Blockchain')
          return false
        }
      } else if (properties.blockchain == 'binance') {
        if (chainID == 56 || chainID == 97) {
          /* Do Nothing */
        } else {
          alert('Wrong Blockchain Connected switch to Binance Blockchain')
          return false
        }
      }

      /* Selecting the right Blockchain */
      let ContractInteraction = ''
      let MarketPlaceAddress = ''
      let nftAddress = ''
      if (properties.blockchain == 'ethereum') {
        ContractInteraction = tokencontractAdd
        MarketPlaceAddress = marketcontractAdd
        nftAddress = contractAdd
      } else if (properties.blockchain == 'binance') {
        ContractInteraction = tokencontractAddB
        MarketPlaceAddress = marketcontractAddB
        nftAddress = contractAddB
      }

      let contract = new ethers.Contract(MarketPlaceAddress, marketcontractAbi, provider.getSigner())

      let nftcontract = new ethers.Contract(nftAddress, contractAbi, provider.getSigner())

      let contractToken = new ethers.Contract(ContractInteraction, tokencontractAbi, provider.getSigner())

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      /* Fetch Token ID using Token Hash */
      const tokenID = parseInt(await nftcontract.functions.getTokenIdFromHash(properties.ipfsurl))
      console.log('TokenID', tokenID)
      // const tokenID = 3;
      var cardOwner = await nftcontract.functions.ownerOf(accounts.toString(), tokenID)
      if (cardOwner.toString() == 'false') {
        alert('Token has already been sold, or is already being sold, by the user.')
        return false
      }

      /* Check if Contract is Approved */
      const approval = await nftcontract.functions.isApprovedForAll(accounts.toString(), MarketPlaceAddress)
      console.log(approval.toString())
      /* 1st Step (Approving Token For Sell) - ProgressBar to be added Below this comment */

      if (approval.toString() == 'false') {
        /* If Token is not appoved for selling in contract approval dialog box will appear */
        const approveAll = await nftcontract.functions.setApprovalForAll(MarketPlaceAddress, 1)
        await provider.waitForTransaction(approveAll.hash, 1)
      }

      /* Sell Section */
      if (values.Currencies.length == 1 && values.Currencies[0].Currency == 'DANK') {
        /* Approve Token */
        const approval = await contractToken.functions.allowance(accounts.toString(), MarketPlaceAddress)
        var cardOwner = await nftcontract.functions.ownerOf(accounts.toString(), tokenID)
        if (cardOwner.toString() == 'false') {
          alert('Token Sold by user or already on sale')
          return false
        }

        var dbSymbol = String(values.Currencies[0].Currency)
        // var dbTotal = parseInt(String(values.Currencies[0].Price).toString().concat('000000000000000000'))

        console.log(parseInt(approval))

        var fee = parseInt(await contract.functions.makerFee())
        console.log(fee)
        var feePayment = parseInt(String((values.Currencies[0].Price * fee) / 1000))

        /* 2nd Step (Approving Token) - ProgressBar to be added Below this comment */
        if (parseInt(approval) < parseInt(String(values.Currencies[0].Price * 1e18))) {
          /* If Token is not appoved for selling in contract approval dialog box will appear */
          const tokenApproval = await contractToken.functions.approve(
            MarketPlaceAddress,
            feePayment.toString().concat('000000000000000000'),
          )
          /* Waits for Transaction to complete */
          await provider.waitForTransaction(tokenApproval.hash, 1)
        }

        /* Card Approval Ends */
        var dbSymbol = String(values.Currencies[0].Currency)
        var dbTotal = values.Currencies[0].Price as string

        var cardOwner = await nftcontract.functions.ownerOf(accounts.toString(), tokenID)
        if (cardOwner.toString() == 'false') {
          alert('Token Sold by user or already on sale')
          return false
        }
        /* 3rd Step (Selling NFT) - ProgressBar to be added Below this comment */
        await contract.functions
          .readyToSellToken(
            tokenID,
            1,
            0,
            values.Currencies[0].Currency.split(' '),
            parseInt(String(values.Currencies[0].Price).toString().concat('000000000000000000')),
          )
          .then(async function (result) {
            /* Waits for Transaction to complete */
            await provider.waitForTransaction(result.hash, 1)
            /* 4th Step (Recording NFT) - ProgressBar to be added Below this comment */

            var myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

            var fd1 = new URLSearchParams()
            fd1.append('id', properties.id)
            fd1.append('amount', '1') // Default Mint -1
            fd1.append('price', String(dbTotal))
            fd1.append('symbol', dbSymbol)

            console.log('form values & file => ', fd1)
            var requestOptions1 = {
              method: 'POST',
              body: fd1,
              headers: myHeaders,
              redirect: 'follow' as 'follow',
            }

            fetch('https://api.mucitadel.io/v1/nft/sellnft', requestOptions1)
              .then((response) => response.text())
              .then((result) => {
                /* End Result 100% */
                /* 5th Step (Listed Sucessfully) - ProgressBar to be added Below this comment */
                console.log(result)
              })
              .catch((error) => {
                console.log('error', error)
              })
          })
          .catch((error) => {
            console.log('error', error)
          })
      } else if (values.Currencies.length == 1 && values.Currencies[0].Currency == 'ETH') {
        var cardOwner = await nftcontract.functions.ownerOf(accounts.toString(), tokenID)
        var dbSymbol = String(values.Currencies[0].Currency)
        var dbTotal = parseInt(String(values.Currencies[0].Price * 1e5))
          .toString()
          .concat('0000000000000')

        if (cardOwner.toString() == 'false') {
          alert('Token Sold by user or already on sale')
          return false
        }

        var fee = parseInt(await contract.functions.makerFee())
        console.log(fee)
        var feePayment = parseInt(String((Number(values.Currencies[0].Price) * fee) / 1000))
        /* 2nd Step (Selling NFT) - ProgressBar to be added Below this comment */
        await contract.functions
          .readyToSellToken(
            tokenID,
            1,
            parseInt(String(values.Currencies[0].Price).toString().concat('000000000000000000')),
            [],
            [],
            { value: (feePayment * 1e5).toString().concat('0000000000000') },
          )
          .then(async function (result) {
            /* Waits for Transaction to complete */
            await provider.waitForTransaction(result.hash, 1)
            /* 3rd Step (Recording NFT) - ProgressBar to be added Below this comment */
            var myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

            var fd1 = new URLSearchParams()
            fd1.append('id', properties.id)
            fd1.append('amount', '1') // Default Mint -1
            fd1.append('price', String(dbTotal))
            fd1.append('symbol', dbSymbol)

            console.log('form values & file => ', fd1)
            var requestOptions1 = {
              method: 'POST',
              body: fd1,
              headers: myHeaders,
              redirect: 'follow' as 'follow',
            }

            fetch('https://api.mucitadel.io/v1/nft/sellnft', requestOptions1)
              .then((response) => response.text())
              .then((result) => {
                /* End Result 100% */
                /* 4th Step (Listed Sucessfully) - ProgressBar to be added Below this comment */
                console.log(result)
              })
              .catch((error) => {
                console.log('error', error)
              })
          })
          .catch((error) => {
            console.log('error', error)
          })
      } else {
        var currencySymbol = ''
        let currencyPrice = '' as unknown as string | string[]
        var ethPrice = ''

        var dbSymbol = String(values.Currencies[0].Currency).concat(',').concat(values.Currencies[1].Currency)
        var dbTotal = parseInt(String(values.Currencies[0].Price * 1e5))
          .toString()
          .concat('0000000000000')
          .concat(',')
          .concat(String(parseInt(String(values.Currencies[1].Price * 1e5))))
          .concat('0000000000000')

        console.log('Symbols: ', dbSymbol)
        console.log('Currency: ', String(dbTotal))

        var cardOwner = await nftcontract.functions.ownerOf(accounts.toString(), tokenID)
        if (cardOwner.toString() == 'false') {
          alert('Token Sold by user or already on sale')
          return false
        }

        for (var i = 0; i < values.Currencies.length; i++) {
          if (values.Currencies[i].Currency == 'DANK') {
            currencyPrice = parseInt(String(values.Currencies[i].Price * 1e5))
              .toString()
              .concat('0000000000000')
              .split(' ')
            currencySymbol = values.Currencies[i].Currency.split(' ')
            console.log(currencyPrice)
            console.log(currencySymbol)
          } else {
            ethPrice = parseInt(String(values.Currencies[i].Price * 1e5))
              .toString()
              .concat('0000000000000')
          }
        }

        for (var j = 0; j < values.Currencies.length; j++) {
          if (values.Currencies[j].Currency == 'DANK') {
            /* Approve Token */
            const approval = await contractToken.functions.allowance(accounts.toString(), MarketPlaceAddress)
            console.log('Approved Amount', parseInt(approval))

            var fee = parseInt(await contract.functions.makerFee())
            console.log(fee)
            var feePayment = parseInt(String((values.Currencies[j].Price * fee) / 1000))
            /* 2nd Step (Approving Token) - ProgressBar to be added Below this comment */
            if (parseInt(approval) < parseInt(String(feePayment)) * 1e18) {
              /* If Token is not appoved for selling in contract approval dialog box will appear */
              const tokenApproval = await contractToken.functions.approve(
                MarketPlaceAddress,
                feePayment.toString().concat('000000000000000000'),
              )
              /* Waits for Transaction to complete */
              await provider.waitForTransaction(tokenApproval.hash, 1)
            }

            /* Card Approval Ends */
          }
        }

        console.log(ethPrice.toString() + ',' + currencyPrice.toString() + '')
        console.log('ETH'.toString() + ',' + currencySymbol.toString() + '')
        /* 3rd Step (Selling NFT) - ProgressBar to be added Below this comment */
        await contract.functions
          .readyToSellToken(tokenID, 1, ethPrice, currencySymbol, currencyPrice)
          .then(async function (result) {
            /* Waits for Transaction to complete */
            await provider.waitForTransaction(result.hash, 1)
            /* 4th Step (Recording NFT) - ProgressBar to be added Below this comment */
            var myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

            var fd1 = new URLSearchParams()
            fd1.append('id', properties.id)
            fd1.append('amount', '1') // Default Mint -1
            fd1.append('price', String(dbTotal))
            fd1.append('symbol', dbSymbol)

            console.log('form values & file => ', fd1)
            var requestOptions1 = {
              method: 'POST',
              body: fd1,
              headers: myHeaders,
              redirect: 'follow' as 'follow',
            }

            fetch('https://api.mucitadel.io/v1/nft/sellnft', requestOptions1)
              .then((response) => response.text())
              .then((result) => {
                /* End Result 100% */
                /* 5th Step (Listed Sucessfully) - ProgressBar to be added Below this comment */
                console.log(result)
              })
              .catch((error) => {
                console.log('error', error)
              })
          })
          .catch((error) => {
            console.log('error', error)
          })
      }
    } else {
      alert('Connect Metamask')
    }
  }

  const validateForm = (values) => {
    let errors = {}

    for (let i = 0; i < values.Currencies.length; i++) {
      if (!values.Currencies[i].Price) {
        errors = {
          ...errors,
          [`Currencies[${i}].Price`]: 'Price is required',
        }
      }
      if (!values.Currencies[i].Currency) {
        errors = {
          ...errors,
          [`Currencies[${i}].Currency`]: 'Currency is required',
        }
      }
      if (!values.SellingAmount) {
        errors = {
          ...errors,
          [`SellingAmount`]: 'Amount of tokens to be sold is required',
        }
      }
      if (values.SellingAmount > (properties as NFT).mints.available) {
        errors = {
          ...errors,
          [`SellingAmount`]: ' must be smaller or equal to available amount',
        }
      }
    }
    console.log('ant : errors => ', errors)
    return errors
  }

  return (
    <Modal visible={visible} title={'Selling'} closeModal={onCloseModal}>
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={(values, { setSubmitting }) => {
          handleSave(values, setSubmitting)
        }}
      >
        {(props) => {
          const { handleSubmit, values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting } = props
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
                    <Grid className={classes.form} key={`currency-${index}`} container wrap="nowrap">
                      <Grid container spacing={2}>
                        <Grid container item md={6} lg={6} sm={6} xs={12}>
                          <Typography className={classes.formLabel}>Selling amount</Typography>
                          <TextField
                            name={`SellingAmount`}
                            variant="outlined"
                            type="number"
                            className={clsx(
                              classes.formField,
                              // classes.numberInput
                            )}
                            value={currency.SellingAmount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="How many tokens you're selling"
                            margin="normal"
                          />
                        </Grid>
                        <Grid container item md={6} lg={6} sm={6} xs={12} direction="column">
                          <Typography className={classes.formLabel}>Available amount</Typography>
                          <Typography className={classes.formLabel} style={{ marginTop: '10px' }}>
                            {properties.mints.available}
                          </Typography>
                        </Grid>
                        <Grid container item md={6} lg={6} sm={6} xs={12}>
                          <Typography className={classes.formLabel}>Price</Typography>
                          <TextField
                            name={`Currencies[${index}].Price`}
                            variant="outlined"
                            type="number"
                            className={clsx(
                              classes.formField,
                              // classes.numberInput
                            )}
                            value={currency.Price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Please input meme price"
                            margin="normal"
                          />
                        </Grid>
                        <Grid container item md={6} lg={6} sm={6} xs={12}>
                          <Typography className={classes.formLabel}>Currency</Typography>
                          <Grid className={classes.selectContainer}>
                            {!currency.Currency && (
                              <InputLabel htmlFor="name-multiple">Please select currency</InputLabel>
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
                                  vertical: 'bottom',
                                  horizontal: 'left',
                                },
                                transformOrigin: {
                                  vertical: 'top',
                                  horizontal: 'left',
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
                            let newCurrencies = [...values.Currencies]
                            newCurrencies.splice(index, 1)
                            setFieldValue('Currencies', newCurrencies)
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      )}
                    </Grid>
                  )
                })}
                {Object.keys(errors).length > 0 && (
                  <Grid className="mb-4" container justify="flex-start">
                    <FormHelperText className={classes.helperText}>Please input price and currency!</FormHelperText>
                  </Grid>
                )}
                <Grid container justify="space-between">
                  <MuButton
                    className=""
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                  >
                    {'Sell'}
                  </MuButton>
                  {values.Currencies.length < 2 && (
                    <MuButton
                      // className={classes.addCurrency}
                      className=""
                      onClick={() => {
                        setFieldValue('Currencies', [...values.Currencies, { Price: '', Currency: '' }])
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
          )
        }}
      </Formik>
    </Modal>
  )
}

export default SellModal
