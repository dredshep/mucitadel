import { ErrorMessage, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import WhiteButton from '../../components/styled/WhiteButton'
import { NFT } from '../../types/nft'
import Modal from '../UI/Modal'
import Selector from '../UI/Selector'
import smartContractBuy from './smartContractBuy'

var window = require('global/window')

let chainID = ''

const BuyModal = ({
  visible,
  tokenId,
  nft,
  onCloseModal,
}: {
  visible: boolean
  tokenId: string
  nft: NFT
  onCloseModal: () => void
}) => {
  const handleBuy = async (values: { formData: { price: number; currency: string; amount: number }; nft: NFT }) => {
    if (window.ethereum) {
      smartContractBuy(values)
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
        onSubmit={(values: { price: number; currency: string; amount: number }, { setSubmitting }) => {
          // handleBuy(values)
          // setSubmitting(false)
          const returnValue = {
            formData: { price: selectedPrice, currency: values.currency, amount: values.amount },
            nft,
          }
          handleBuy(returnValue)

          console.log('submit', JSON.stringify(returnValue, null, 2))
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
                      {nft.mints.forSale} out of {nft.mints.available}
                    </span>
                  </p>

                  <div className="mt-4">
                    <p className="text-secondary text-sm mt-2">Price</p>
                    <Selector
                      options={priceOptions}
                      value={selectedPrice}
                      onChange={(selectedPrice) => {
                        setSelectedPrice(selectedPrice)
                        setFieldValue('price', selectedPrice.value)
                      }}
                      placeholder="Choose a price"
                      // className="text-sm"
                    />
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
