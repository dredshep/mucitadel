import { ethers } from 'ethers'
import { ErrorMessage, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import WhiteButton from '../../components/styled/WhiteButton'
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
import Modal from '../UI/Modal'

var window = require('global/window')

let chainID = ''

const BuyModal = ({ visible, tokenId, nft, onCloseModal }) => {
  const handleBuy = async (values) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      /* Selecting the right Blockchain */
      let ContractInteraction = ''
      let MarketPlaceAddress = ''
      let nftAddress = ''

      if (nft.blockchain == 'ethereum') {
        ContractInteraction = tokencontractAdd
        MarketPlaceAddress = marketcontractAdd
        nftAddress = contractAdd
      } else if (nft.blockchain == 'binance') {
        ContractInteraction = tokencontractAddB
        MarketPlaceAddress = marketcontractAddB
        nftAddress = contractAddB
      }

      /* Taking Mannual Approach for Test */
      const currencyAmount = 5560
      const currencySymbol = 'DANK'
      // const currencyAmount = 1;
      // const currencySymbol = "ETH";

      let contract = new ethers.Contract(MarketPlaceAddress, marketcontractAbi, provider.getSigner())

      let nftcontract = new ethers.Contract(nftAddress, contractAbi, provider.getSigner())

      let contractToken = new ethers.Contract(ContractInteraction, tokencontractAbi, provider.getSigner())

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      /* Fetch Token ID using Token Hash */

      const tokenID = parseInt(await nftcontract.functions.getTokenIdFromHash(nft.id))

      const userAsk = await contract.functions.getAsksByUser(
        (
          await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
        ).toString(),
      )

      const userAskOrder = await contract.functions.getOrdersKeyFromUser(
        (
          await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
        ).toString(),
      )

      if (currencySymbol == 'DANK') {
        /* Check if Contract is Approved */
        const approval = await contractToken.functions.allowance(accounts.toString(), MarketPlaceAddress)
        console.log(parseInt(approval))

        if (parseInt(approval) < currencyAmount * 1e18) {
          /* If Token is not appoved for selling in contract approval dialog box will appear */
          await contractToken.functions.approve(MarketPlaceAddress, 1e30)
          return false
        }

        for (var i = 0; i < userAsk[0].length; i++) {
          if (parseInt(userAsk[0][i][3]) == tokenID) {
            var OrderID = parseInt(userAskOrder[0][i])

            /* This Will Buy The Token */
            await contract.functions
              .buyToken(OrderID, currencySymbol, parseInt(userAsk[0][i][2]))
              .then(async function (result) {
                console.log(result)
                return false
              })
          } else {
            alert('No Sell Order for the NFT Found')
            return false
          }
        }
      } else if (currencySymbol == 'ETH') {
        for (var i = 0; i < userAsk[0].length; i++) {
          if (parseInt(userAsk[0][i][3]) == tokenID) {
            var OrderID = parseInt(userAskOrder[0][i])

            /* This Will Buy The Token */
            await contract.functions
              .buyToken(OrderID, currencySymbol, parseInt(userAsk[0][i][2]), {
                value: (currencyAmount * 1e18).toString(),
              })
              .then(async function (result) {
                console.log(result)
                return false
              })
          } else {
            alert('No Sell Order for the NFT Found')
            return false
          }
        }
      }
    } else {
      alert('Connect Metamask')
    }
  }

  const priceOptions = [
    { label: '25690 DANK', value: 25690, currency: 'DANK' },
    { label: '0.8 ETH', value: 0.8, currency: 'ETH' },
    { label: '456.18 USD', value: 456.18, currency: 'USD' },
  ]
  const [selectedPrice, setSelectedPrice] = useState(null)
  const [amount, setAmount] = useState(null)

  const initialValues = {
    price: selectedPrice?.value,
    amount: amount,
  }

  const validationSchema = Yup.object().shape({
    price: Yup.number().required('Price is required'),
    amount: Yup.number()
      .min(1, 'Amount should be greater than 0')
      .max(nft.mints.totalMints - nft.mints.sold, `Amount should not be over ${nft.mints.totalMints - nft.mints.sold}`)
      .nullable(true)
      .required('Amount is required'),
  })

  return (
    <Modal visible={visible} title={'Buying'} closeModal={onCloseModal}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // handleBuy(values)
          // setSubmitting(false)
          console.log('submit', JSON.stringify(values, null, 2))
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
                  <p className="text-secondary text-sm truncate mt-2">
                    Owner Address: <span className="text-white ml-2">{nft.owner}</span>
                  </p>
                  <p className="text-secondary text-sm mt-2">
                    Mints for Sale:
                    <span className="text-white ml-2">
                      {nft.mints.sold} out of {nft.mints.totalMints}
                    </span>
                  </p>

                  <div className="mt-4">
                    <p className="text-secondary text-sm mt-2">Price</p>
                    {/* <Selector
                      options={priceOptions}
                      value={selectedPrice}
                      onChange={(selectedPrice) => {
                        setSelectedPrice(selectedPrice)
                        setFieldValue('price', selectedPrice.value)
                      }}
                      placeholder="Choose a price"
                      className="text-sm"
                    /> */}
                    "price selector is bugged rn"
                    <ErrorMessage name="price">{(msg) => <span className="text-xs text-red">{msg}</span>}</ErrorMessage>
                  </div>

                  <div className="mt-4">
                    <p className="text-secondary text-sm mt-2">Buy amount</p>
                    <input
                      className="shadow w-full h-10 text-sm rounded-md mb-2 bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover transition-colors duration-75 text-center focus:outline-none"
                      type="number"
                      placeholder="Please enter amount to buy"
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

                  <WhiteButton type="submit" className="text-lg mt-2">
                    Buy
                  </WhiteButton>
                </div>
              </div>
            </form>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default BuyModal
