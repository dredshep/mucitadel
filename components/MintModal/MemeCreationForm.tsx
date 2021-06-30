import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { ethers } from 'ethers'
import { Formik } from 'formik'
import html2canvas from 'html2canvas'
import React, { useMemo, useRef, useState } from 'react'
import { MintFormValues } from 'types/formValues'
import * as Yup from 'yup'
import { RequiredStringSchema } from 'yup/lib/string'
import contractAbi from '../../config/abi/meme.json'
import { contractAdd, contractAddB } from '../../constant/blockchain'
// import ConnectWalletDialog from 'components/ConnectWalletDialog';
import { FILE_TYPES } from '../../constant/file-types'
import Modal from '../UI/Modal'
// import PreviewCard from 'pages/MemeCreationPage/PreviewCard';
import UploadMedia from '../UploadMedia'
import MemeDetailForm from './MemeDetailForm'
import MUStepper from './Stepper'
var window = require('global/window')

/* SMART CONTRACT STARTS */

// let chainID = ''

/* SMART CONTRACT ENDS */

// interface TypeBackground2 extends TypeBackground{
//   secondary: any;
// }

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
  },
  subtitle: {
    marginBottom: theme.spacing(1),
  },
  uploadContainer: {
    marginBottom: theme.spacing(8),
    width: '100%',
  },
  previewWrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  dialog: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0.5),
    },
  },
  preview: {
    width: theme.spacing(36),
    height: theme.spacing(48),
    position: 'relative',
    '&:focus': {
      outline: '0 !important',
    },
  },
  button: {
    marginTop: theme.spacing(2),
  },
  memeTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },
  mint: {
    marginLeft: `0 !important`,
  },
}))

const MemeCreationForm = ({ role, closeModal }: { role: 'user' | 'admin' | 'guest'; closeModal: () => void }) => {
  const classes = useStyles()
  const [fileBuffer, setFileBuffer] = useState('')
  const [showEmptyFileError, setShowEmptyFileError] = useState(false)
  const previewRef = useRef(null)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const [activeStep, setActiveStep] = useState(0)
  const [isSaving, setIsSaving] = useState(false)

  const initialValues = {
    Name: '',
    Description: '',
    Tier: '',
    Blockchain: 'ethereum',
    ForSale: true,
    Currencies: [{ Price: '', Currency: '' }],
    Amount: 1,
  }

  const convertCanvasToBlob = (canvas) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          blob.name = 'meme'
          console.log('updated file', blob)
          resolve(blob)
        },
        'image/jpeg',
        1,
      )
    })
  }

  const getUrl = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        function () {
          // convert image file to base64 string
          return resolve(reader.result)
        },
        false,
      )
      reader.readAsDataURL(blob)
    })
  }

  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
          }),
      )

  /* Detects Chain Change needs to run all time */
  // const chainChange = async()=>{
  //   // await window.ethereum.on('chainChanged', (_chainId) => window.location.reload())

  //   chainID = await window.ethereum.request({ method: 'eth_chainId' });
  //   console.log(chainID);
  // };
  // chainChange();

  const handleMintToken = async (values: MintFormValues, ref, setSubmitting) => {
    let chainID
    if (fileBuffer) {
      setSubmitting(true)
      let croppedImageUrl = ''
      if (role === 'admin') {
        croppedImageUrl = (await toDataURL(fileBuffer)) as string
      } else {
        const canvas = await html2canvas(ref.current, {
          useCORS: true,
          scale: 3,
          scrollX: -window.scrollX,
          scrollY: matches ? 0 : -window.scrollY,
          windowWidth: document.documentElement.offsetWidth,
          windowHeight: window.innerHeight,
        })

        const croppedBlob = await convertCanvasToBlob(canvas)
        croppedImageUrl = (await getUrl(croppedBlob)) as string
      }
      console.log('ant : croppedImageUrl => ', croppedImageUrl)
      if (window.ethereum) {
        /* ETH Main - 1,Ropstem - 3, Binance Main :56	, Binance Testnet :97 */
        chainID = parseInt(await window.ethereum.chainId)
        console.log(chainID)

        if (values.Blockchain == 'ethereum') {
          if (chainID == 1 || chainID == 4) {
            /* Do Nothing */
          } else {
            alert('Wrong Blockchain Connected switch to Ethereum Blockchain')
            return false
          }
        } else if (values.Blockchain == 'binance') {
          if (chainID == 56 || chainID == 97) {
            /* Do Nothing */
          } else {
            alert('Wrong Blockchain Connected switch to Binance Blockchain')
            return false
          }
        }

        setIsSaving(true)
        /* Step 1 - Create an image Blob File 0% */
        const blob = await fetch(croppedImageUrl).then((res) => res.blob())
        const fd = new FormData()
        const file = new File([blob], values.Name + '.jpeg')
        fd.append('imageupload', file)
        fd.append(
          'walletadd',
          await window.ethereum.request({
            method: 'eth_requestAccounts',
          }),
        )
        fd.append('title', values.Description)

        console.log('ant : form values & file => ', values, fd)
        var requestOptions = {
          method: 'POST',
          body: fd,
          redirect: 'follow' as 'follow',
        }

        /* Step 2 - Upload to IPFS 25%*/
        fetch('https://api.mucitadel.io/v1/upload/ipfs', requestOptions)
          .then((response) => response.text())
          .then((result) => {
            setActiveStep(1)
            console.log(JSON.parse(result))
            const JsonResult = JSON.parse(result)
            /* Step 3 - Mint Token to Smart Contract 50%*/
            const final = async () => {
              if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                let ContractInteraction = ''

                if (values.Blockchain == 'ethereum') {
                  ContractInteraction = contractAdd
                } else if (values.Blockchain == 'binance') {
                  ContractInteraction = contractAddB
                }

                let contract = new ethers.Contract(ContractInteraction, contractAbi, provider.getSigner())
                const accounts = await window.ethereum.request({
                  method: 'eth_requestAccounts',
                })
                const account = accounts[0]
                const hash = JsonResult.data.path
                const s3 = JsonResult.data.s3
                let nextTokenID

                await contract.functions.nextID().then(async function (result) {
                  nextTokenID = parseInt(result[0]._hex, 16)
                })

                console.log('TRYING TO MINT ' + values.Amount + ' NFT')

                /* Mint Token - 1/1 NFT  */
                await contract.functions
                  .mint(account, values.Amount, hash, [])
                  .then(async function (result) {
                    console.log(result)
                    /* Waits for Transaction to complete */
                    await provider.waitForTransaction(result.hash, 1)
                    setActiveStep(2)

                    /* Step 4 - Upload to API 75%*/
                    var myHeaders = new Headers()
                    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

                    /* Currencies Division */
                    // var symbols = "";
                    // var prices = [];
                    // console.log(values.Currencies[0]);
                    // for (var i = 0; i < values.Currencies.length; i++) {
                    //   prices[i] = parseInt(
                    //     parseFloat(values.Currencies[i]) * 1e18
                    //   );
                    // }
                    // console.log(prices.join());

                    var fd1 = new URLSearchParams()
                    fd1.append(
                      'owneraddress',
                      await window.ethereum.request({
                        method: 'eth_requestAccounts',
                      }),
                    )
                    fd1.append('ipfsurl', hash)
                    fd1.append('s3bucketurl', s3)
                    fd1.append('name', values.Name)
                    fd1.append('tier', values.Tier)
                    fd1.append('description', values.Description)
                    fd1.append('amount', '1')
                    fd1.append('blockchain', values.Blockchain)
                    fd1.append('collection', 'mucitadel')
                    fd1.append('tokenid', nextTokenID)
                    fd1.append('txhash', result.hash)

                    console.log('form values & file => ', fd1)
                    var requestOptions1 = {
                      method: 'POST',
                      body: fd1,
                      headers: myHeaders,
                      redirect: 'follow' as 'follow',
                    }

                    fetch('https://api.mucitadel.io/v1/nft/recordnft', requestOptions1)
                      .then((response) => response.text())
                      .then((result) => {
                        setSubmitting(false)
                        setActiveStep(3)
                        setTimeout(() => {
                          setIsSaving(false)
                        }, 500)
                        /* End Result 100% */
                        console.log(result)
                      })
                      .catch((error) => {
                        setSubmitting(false)
                        setActiveStep(0)
                        setIsSaving(false)
                        console.log('error', error)
                      })
                  })
                  .catch((error) => {
                    setSubmitting(false)
                    setActiveStep(0)
                    setIsSaving(false)
                    console.log('error', error)
                  })
              } else {
                alert('Please install MetaMask or Trust Wallet in order to use blockchain features.')
              }
            }
            final()
          })
          .catch((error) => {
            setSubmitting(false)
            setActiveStep(0)
            setIsSaving(false)
            console.log('error', error)
          })
      } else {
        alert('Connect Metamask')
      }
    }
  }

  const handleSave = async (values: MintFormValues, setSubmitting) => {
    if (!fileBuffer) {
      setShowEmptyFileError(true)
    } else {
      handleMintToken(values, previewRef, setSubmitting)
    }
  }

  const handleSetFileBuffer = (fileBuffer) => {
    if (fileBuffer) {
      setShowEmptyFileError(false)
    } else {
      setShowEmptyFileError(true)
    }
    setFileBuffer(fileBuffer)
  }

  type ValidationObject = {
    Name: RequiredStringSchema<string, Record<string, any>>
    Description: RequiredStringSchema<string, Record<string, any>>
    Blockchain: RequiredStringSchema<string, Record<string, any>>
    Amount: Yup.NumberSchema<any, Record<string, any>, number>
    Tier?: RequiredStringSchema<string, Record<string, any>>
  }

  let validationObject: ValidationObject = {
    Name: Yup.string().required('Name is required'),
    Description: Yup.string().required('Description is required'),
    Blockchain: Yup.string().required('Blockchain is required'),
    Amount: Yup.number().min(1, 'Amount should be greater than 0').max(100, 'Amount should not be over 100'),
  }

  if (role === 'admin') {
    validationObject = {
      ...validationObject,
      Tier: Yup.string().required('Tier is required'),
    }
  }

  const creationSteps = useMemo(() => {
    if (activeStep === 0) {
      return ['Uploading Image', 'Mint NFT', 'Record NFT']
    } else if (activeStep === 1) {
      return ['Uploaded Image', 'Minting NFT', 'Record NFT']
    } else if (activeStep === 2) {
      return ['Uploaded Image', 'Minted NFT', 'Recording NFT']
    } else {
      return ['Uploaded Image', 'Minted NFT', 'Recorded NFT']
    }
  }, [activeStep])

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSave(values, setSubmitting)
        }}
        validationSchema={Yup.object().shape(validationObject)}
      >
        {(props) => {
          const { handleSubmit, values } = props
          return (
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid container justify="space-between">
                  <Typography variant="h6" className={classes.subtitle}>
                    Upload file
                  </Typography>
                </Grid>
                <UploadMedia
                  values={values}
                  role={role}
                  previewRef={previewRef}
                  className={classes.uploadContainer}
                  type={FILE_TYPES[FILE_TYPES.IMAGE.VALUE]}
                  fileBuffer={fileBuffer}
                  showEmptyFileError={showEmptyFileError}
                  setFileBuffer={handleSetFileBuffer}
                />
                <MemeDetailForm role={role} {...props} fileBuffer={fileBuffer} />
              </Grid>
            </form>
          )
        }}
      </Formik>
      <Modal visible={isSaving} title={'Mint Meme'} closeModal={closeModal}>
        {isSaving && <MUStepper activeStep={activeStep} steps={creationSteps} />}
        {activeStep === 3 && <Typography className={classes.mint}>Successfully Mint!</Typography>}
      </Modal>
    </>
  )
}

export default MemeCreationForm
