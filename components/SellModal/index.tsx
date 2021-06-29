import ControlPointIcon from '@material-ui/icons/ControlPoint'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import Button from 'components/styled/Button'
import Selector from 'components/UI/Selector'
import { ethers } from 'ethers'
import { ErrorMessage, Field, FieldArray, Formik } from 'formik'
import React, { useState } from 'react'
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
  tokencontractAddB,
} from '../../constant/blockchain'
import Modal from '../UI/Modal'

var window = require('global/window')

let chainID = ''

const SellModal = ({ visible, tokenId, nft, onCloseModal }) => {
  const handleSell = async (values) => {
    console.log('values', values)

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
      /* Check if Contract is Approved */
      const approval = await nftcontract.functions.isApprovedForAll(accounts.toString(), MarketPlaceAddress)
      console.log(approval.toString())

      if (approval.toString() == 'false') {
        /* If Token is not appoved for selling in contract approval dialog box will appear */
        // await nftcontract.functions.setApprovalForAll(marketplace, 1)
        // return false
      }
      console.log('asdf')
      /* Fetch Token ID using Token Hash */
      const tokenID = parseInt(await nftcontract.functions.getTokenIdFromHash(nft.id))
      // const tokenID = 3;

      /* Sell Section */
      if (values.Currencies.length == 1 && values.Currencies[0].Currency == 'DANK') {
        /* Approve Token */
        const approval = await contractToken.functions.allowance(accounts.toString(), MarketPlaceAddress)
        console.log(parseInt(approval))

        if (parseInt(approval) < parseInt(values.Currencies[0].Price) * 1e18) {
          /* If Token is not appoved for selling in contract approval dialog box will appear */
          await contractToken.functions.approve(MarketPlaceAddress, 1e30)
          return false
        }

        var cardOwner = await nftcontract.functions.ownerOf(accounts.toString(), tokenID)
        if (cardOwner.toString() == 'false') {
          alert('Token Sold by user or already on sale')
          return false
        }

        await contract.functions
          .readyToSellToken(
            tokenID,
            1,
            0,
            values.Currencies[0].Currency.split(' '),
            (parseInt(values.Currencies[0].Price) * 1e18).toString().split(' '),
          )
          .then(async function (result) {
            return false
          })
      } else if (values.Currencies.length == 1 && values.Currencies[0].Currency == 'ETH') {
        // var cardOwner =  await nftcontract.functions.ownerOf(
        //   accounts.toString(),
        //   tokenID
        // );
        // if(cardOwner.toString() == "false"){
        //   alert("Token Sold by user or already on sale");
        //   return false;
        // }

        var fee = parseInt(await contract.functions.makerFee())
        console.log(fee)
        var feePayment = (parseInt(values.Currencies[0].Price) * fee) / 1000

        await contract.functions
          .readyToSellToken(tokenID, 1, (parseInt(values.Currencies[0].Price) * 1e18).toString(), [], [], {
            value: (feePayment * 1e18).toString(),
          })
          .then(async function (result) {
            return false
          })
      } else {
        var currencySymbol = ''
        var currencyPrice = ''
        var ethPrice = ''

        var cardOwner = await nftcontract.functions.ownerOf(accounts.toString(), tokenID)
        if (cardOwner.toString() == 'false') {
          alert('Token Sold by user or already on sale')
          return false
        }

        // for (var i = 0; i < values.Currencies.length; i++) {
        //   if (values.Currencies[i].Currency == 'DANK') {
        //     currencyPrice = (parseInt(values.Currencies[i].Price) * 1e18).toString().split(' ')
        //     currencySymbol = values.Currencies[i].Currency.split(' ')
        //   } else {
        //     ethPrice = (parseInt(values.Currencies[i].Price) * 1e18).toString()
        //   }
        // }

        // await contract.functions
        //   .readyToSellToken(tokenID, 1, ethPrice, currencySymbol, currencyPrice)
        //   .then(async function (result) {
        //     return false
        //   })
      }
    } else {
      alert('Connect Metamask')
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
    //   Yup.object().shape({
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
        }}
      >
        {(props) => {
          const { handleSubmit, values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting } = props
          return (
            <form onSubmit={handleSubmit}>
              <div className="w-full max-w-2xl sm:grid sm:grid-cols-5 sm:gap-4">
                <div className="w-full sm:col-span-2">
                  <img src={nft.url} alt="meme" className="object-contain w-full h-full" />
                </div>
                <div className="w-full max-w-md sm:col-span-3 flex flex-col">
                  <p className="text-success text-md capitalize">{nft.blockchain} blockchain</p>
                  <p className="text-white text-4xl mt-2">{nft.name}</p>
                  <p className="text-secondary text-md capitalize mt-2">{nft.tier}</p>
                  <p className="text-secondary text-sm truncate mt-4">
                    Token ID: <span className="text-white ml-2">{nft.id}</span>
                  </p>
                  <p className="text-secondary text-sm mt-2">
                    Mints for Sale:
                    <span className="text-white ml-2">
                      {nft.mints.sold} out of {nft.mints.totalMints}
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
                                name={`prices.${index}.price`}
                                placeholder="Please enter price"
                                value={prices[index] ?? ''}
                                onChange={(e) => {
                                  const newPrices = [...prices]
                                  newPrices[index] = e.target.value
                                  setPrices(newPrices)
                                  setFieldValue('prices', newPrices)
                                }}
                              />
                              <ErrorMessage name={`prices.${index}.price`}>
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
