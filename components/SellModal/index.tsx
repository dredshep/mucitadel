import ControlPointIcon from '@material-ui/icons/ControlPoint'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import Button from 'components/styled/Button'
import Selector from 'components/UI/Selector'
import FormStepper from 'components/UI/Stepper'
import { ethers } from 'ethers'
import { ErrorMessage, Field, FieldArray, Formik } from 'formik'
import React, { useState } from 'react'
import { toastify } from 'utils/toastify'
import * as Yup from 'yup'
import marketcontractAbi from '../../config/abi/marketplace.json'
import contractAbi from '../../config/abi/meme.json'
import tokencontractAbi from '../../config/abi/token.json'
import { CURRENCIES_BY_BLOCKCHAIN } from '../../constant'
import {
  contractAdd,
  contractAddB,
  marketcontractAdd,
  marketcontractAddB,
  tokencontractAdd,
  tokencontractAddB
} from '../../constant/blockchain'
import Modal from '../UI/Modal'

var window = require('global/window')

// let chainID = ''

const SellModal = ({ visible, tokenId, nft, onCloseModal }) => {
  const steps = []
  const [activeStep, setActiveStep] = useState(0)

  const handleSell = async (values) => {
    console.log('values', values)

    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        /* Selecting the right Blockchain */
        let ContractInteraction = ''
        let MarketPlaceAddress = ''
        let nftAddress = ''
        console.log(nft)

        if (nft.blockchain == 'ethereum') {
          ContractInteraction = tokencontractAdd
          MarketPlaceAddress = marketcontractAdd
          nftAddress = contractAdd
        } else if (nft.blockchain == 'binance') {
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
        const tokenID = parseInt(await nftcontract.functions.getTokenIdFromHash(nft.ipfsurl))
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
        if (values.currencies.length == 1 && values.currencies[0] == 'DANK') {
          /* Approve Token */
          const approval = await contractToken.functions.allowance(accounts.toString(), MarketPlaceAddress)
          var cardOwner = await nftcontract.functions.ownerOf(accounts.toString(), tokenID)
          if (cardOwner.toString() == 'false') {
            alert('Token Sold by user or already on sale')
            return false
          }

          var dbSymbol = String(values.currencies[0])
          // var dbTotal = parseInt(String(values.prices[0]).toString().concat('000000000000000000'))

          console.log(parseInt(approval))

          var fee = parseInt(await contract.functions.makerFee())
          console.log(fee)
          var feePayment = parseInt(String((values.prices[0] * fee) / 1000))

          /* 2nd Step (Approving Token) - ProgressBar to be added Below this comment */
          if (parseInt(approval) < parseInt(String(values.prices[0] * 1e18))) {
            /* If Token is not appoved for selling in contract approval dialog box will appear */
            const tokenApproval = await contractToken.functions.approve(
              MarketPlaceAddress,
              feePayment.toString().concat('000000000000000000'),
            )
            /* Waits for Transaction to complete */
            await provider.waitForTransaction(tokenApproval.hash, 1)
          }

          /* Card Approval Ends */
          var dbSymbol = String(values.currencies[0])
          var dbTotal = values.prices[0] as string

          var cardOwner = await nftcontract.functions.ownerOf(accounts.toString(), tokenID)
          if (cardOwner.toString() == 'false') {
            alert('Token Sold by user or already on sale')
            return false
          }
          /* 3rd Step (Selling NFT) - ProgressBar to be added Below this comment */
          await contract.functions
            .readyToSellToken(
              tokenID,
              values.amount,
              0,
              values.currencies[0].split(' '),
              parseInt(String(values.prices[0]).toString().concat('000000000000000000')),
            )
            .then(async function (result) {
              /* Waits for Transaction to complete */
              await provider.waitForTransaction(result.hash, 1)
              /* 4th Step (Recording NFT) - ProgressBar to be added Below this comment */

              var myHeaders = new Headers()
              myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

              var fd1 = new URLSearchParams()
              fd1.append('id', nft.id)
              fd1.append('amount', values.amount)
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
        } else if (values.currencies.length == 1 && values.currencies[0] == 'ETH') {
          var cardOwner = await nftcontract.functions.ownerOf(accounts.toString(), tokenID)
          var dbSymbol = String(values.currencies[0])
          var dbTotal = parseInt(String(values.prices[0] * 1e5))
            .toString()
            .concat('0000000000000')

          if (cardOwner.toString() == 'false') {
            alert('Token Sold by user or already on sale')
            return false
          }

          var fee = parseInt(await contract.functions.makerFee())
          console.log(fee)
          console.log(values)
          var feePayment = parseInt(String((Number(values.prices[0]) * fee) / 1000))
          console.log(feePayment)
          /* 2nd Step (Selling NFT) - ProgressBar to be added Below this comment */
          await contract.functions
            .readyToSellToken(
              tokenID,
              values.amount,
              parseInt(String(values.prices[0]).toString().concat('000000000000000000')),
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
              fd1.append('id', nft.id)
              fd1.append('amount', values.amount) // Default Mint -1
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

          var dbSymbol = String(values.currencies[0]).concat(',').concat(values.currencies[1])
          var dbTotal = parseInt(String(values.prices[0] * 1e5))
            .toString()
            .concat('0000000000000')
            .concat(',')
            .concat(String(parseInt(String(values.prices[1] * 1e5))))
            .concat('0000000000000')

          console.log('Symbols: ', dbSymbol)
          console.log('Currency: ', String(dbTotal))

          var cardOwner = await nftcontract.functions.ownerOf(accounts.toString(), tokenID)
          if (cardOwner.toString() == 'false') {
            alert('Token Sold by user or already on sale')
            return false
          }

          for (var i = 0; i < values.currencies.length; i++) {
            if (values.currencies[i] == 'DANK') {
              currencyPrice = parseInt(String(values.prices[i] * 1e5))
                .toString()
                .concat('0000000000000')
                .split(' ')
              currencySymbol = values.currencies[i].split(' ')
              console.log(currencyPrice)
              console.log(currencySymbol)
            } else {
              ethPrice = parseInt(String(values.prices[i] * 1e5))
                .toString()
                .concat('0000000000000')
            }
          }

          for (var j = 0; j < values.currencies.length; j++) {
            if (values.currencies[j] == 'DANK') {
              /* Approve Token */
              const approval = await contractToken.functions.allowance(accounts.toString(), MarketPlaceAddress)
              console.log('Approved Amount', parseInt(approval))

              var fee = parseInt(await contract.functions.makerFee())
              console.log(fee)
              var feePayment = parseInt(String((values.prices[j] * fee) / 1000))
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
            .readyToSellToken(tokenID, values.amount, ethPrice, currencySymbol, currencyPrice)
            .then(async function (result) {
              /* Waits for Transaction to complete */
              await provider.waitForTransaction(result.hash, 1)
              /* 4th Step (Recording NFT) - ProgressBar to be added Below this comment */
              var myHeaders = new Headers()
              myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

              var fd1 = new URLSearchParams()
              fd1.append('id', nft.id)
              fd1.append('amount', values.amount) // Default Mint -1
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
        toastify('Connect Metamask')
      }
    } catch (err) {
      console.log('sell error:', err)
      toastify('Something went wrong!')
    }
  }

  const currencies = CURRENCIES_BY_BLOCKCHAIN.find((e) => e.blockchain === nft.blockchain)?.currencies //['ETH', 'DANK]
  const currencyOptions = currencies.map((e) => {
    return {
      label: e,
      value: e,
    }
  })
  const [selectedCurrencies, setSelectedCurrencies] = useState([''])

  const [prices, setPrices] = useState([])
  const [amount, setAmount] = useState(null)

  const initialValues = {
    prices: prices,
    currencies: selectedCurrencies,
    amount: amount,
  }

  const validationSchema = Yup.object().shape({
    // prices: Yup.array().of(
    //   Yup.object({
    //     price: Yup.number().nullable().min(0, 'Amount should not be negative').required('Price is required'),
    //   }),
    // ),
    // currency: Yup.string().required('Currency is required'),
    amount: Yup.number()
      .min(1, 'Amount should be greater than 0')
      .max(nft.mints.totalMints - nft.mints.sold, `Amount should not be over ${nft.mints.totalMints - nft.mints.sold}`)
      .nullable(true)
      .required('Amount is required'),
  })

  return (
    <Modal visible={visible} title={'Selling'} closeModal={onCloseModal}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true)
          handleSell(values)
          setSubmitting(false)
          console.log(' VALUES VALUES VALUES VALUES VALUES VALUES ', values)
        }}
      >
        {(props) => {
          const { handleSubmit, values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting } = props
          return (
            <form onSubmit={handleSubmit}>
              {<FormStepper activeStep={activeStep} />}
              <div className="w-full max-w-2xl sm:grid sm:grid-cols-5 sm:gap-4">
                <div className="w-full sm:col-span-2">
                  <img src={nft.url} alt="meme" className="object-contain w-full h-full" />
                </div>
                <div className="w-full max-w-md sm:col-span-3 flex flex-col">
                  <p className="text-white text-4xl mt-6">{nft.name}</p>
                  <p className="text-success text-md capitalize mt-2">{nft.blockchain} blockchain</p>
                  <p className="text-secondary text-md capitalize mt-2">{nft.tier}</p>
                  <p className="text-secondary text-sm truncate mt-4">
                    Token ID: <span className="text-white ml-2">{nft.id}</span>
                  </p>
                  <p className="text-secondary text-sm mt-2">
                    Mints for Sale:
                    <span className="text-white ml-2">
                      {nft.mints.forSale} out of {nft.mints.available}
                    </span>
                  </p>

                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="col-span-2">
                      <p className="text-secondary text-sm mt-1">Price</p>
                      <FieldArray
                        name="prices"
                        render={(arrayHelpers) => {
                          return selectedCurrencies.map((item, index) => (
                            <div key={index} className="mt-1">
                              <Field
                                className="shadow w-full h-10 text-sm rounded-md bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover transition-colors duration-75 text-center focus:outline-none"
                                type="number"
                                name={`prices[${index}].price`}
                                placeholder="Please enter price"
                                value={prices[index] ?? ''}
                                onChange={(e) => {
                                  const newPrices = [...prices]
                                  newPrices[index] = e.target.value
                                  setPrices(newPrices)
                                  // setFieldValue(`prices[${index}].price`, e.target.value)
                                  setFieldValue('prices', newPrices)
                                }}
                              />
                              <ErrorMessage name={`prices[${index}].price`}>
                                {(msg) => <span className="text-xs text-red">{msg}</span>}
                              </ErrorMessage>
                            </div>
                          ))
                        }}
                      />
                    </div>
                    <div className="col-span-1">
                      <p className="text-secondary text-sm mt-1">Currency</p>
                      {selectedCurrencies.map((item, index) => (
                        <div key={index} className="mt-1">
                          <div className="flex items-center">
                            <Selector
                              options={currencyOptions.filter((e) => !selectedCurrencies.includes(e.value))}
                              value={currencyOptions.find((e) => e.value === selectedCurrencies[index]) ?? null}
                              onChange={(selectedOption) => {
                                const newSelectedCurrencies = [...selectedCurrencies]
                                newSelectedCurrencies[index] = selectedOption.value
                                setSelectedCurrencies(newSelectedCurrencies)
                                setFieldValue('currencies', newSelectedCurrencies)
                              }}
                              placeholder=""
                              className="w-full text-sm mr-2"
                            />
                            <RemoveCircleOutlineIcon
                              className="cursor-pointer"
                              onClick={() => {
                                if (selectedCurrencies.length > 1) {
                                  const newPrices = [...prices]
                                  newPrices.splice(index, 1)

                                  const newSelectedCurrencies = [...selectedCurrencies]
                                  newSelectedCurrencies.splice(index, 1)

                                  setPrices(newPrices)
                                  setSelectedCurrencies(newSelectedCurrencies)
                                }
                              }}
                            />
                          </div>
                          <ErrorMessage name="currency">
                            {(msg) => <span className="text-xs text-red">{msg}</span>}
                          </ErrorMessage>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="cursor-pointer mt-2"
                    onClick={() => {
                      if (selectedCurrencies.length < currencies.length) {
                        setSelectedCurrencies([...selectedCurrencies, ''])
                      }
                    }}
                  >
                    <ControlPointIcon />
                    <span className="text-sm text-secondary ml-1">Add Currency</span>
                  </div>

                  <div className="mt-4">
                    <p className="text-secondary text-sm my-1">Sell amount</p>
                    <input
                      className="shadow w-full h-10 text-sm rounded-md bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover transition-colors duration-75 text-center focus:outline-none"
                      type="number"
                      placeholder="Please enter amount to sell"
                      value={amount ?? ''}
                      onChange={(e) => {
                        setAmount(e.target.value)
                        setFieldValue('amount', e.target.value)
                      }}
                    />
                    <ErrorMessage name="amount">
                      {(msg) => <span className="text-xs text-red">{msg}</span>}
                    </ErrorMessage>
                  </div>

                  <Button
                    type="submit"
                    className={`text-lg mt-2 ${isSubmitting && 'cursor-not-allowed'}`}
                    disabled={isSubmitting}
                  >
                    Sell
                  </Button>
                </div>
              </div>
            </form>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default SellModal
