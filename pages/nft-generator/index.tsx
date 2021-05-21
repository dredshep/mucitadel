import { Grid, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Formik } from "formik";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
// import PreviewCard from 'pages/MemeCreationPage/PreviewCard';
import UploadMedia from "../../components/UploadMedia";
// import ConnectWalletDialog from 'components/ConnectWalletDialog';
import { FILE_TYPES } from "../../constant/file-types";
import PageWrapper from "../../parts/PageWrapper";
import MemeCreationForm from "./MemeCreationForm";

/* SMART CONTRACT STARTS */
// ROPSTEN TESTNET
// MU DANK TESTNET ADD : 0x51a41a08eaf9cffa27c870bb031a736845c21093
// MU NFT TESTNET ADD : 0xb129903f3399b1F2D1e39B56980596D641cd957E

const contractAdd = "0xb129903f3399b1F2D1e39B56980596D641cd957E";
const contractAbi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_ethReceiver",
        type: "address",
      },
      { internalType: "contract IERC20", name: "dankToken_", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    inputs: [
      { internalType: "string[]", name: "hashes_", type: "string[]" },
      { internalType: "uint256[]", name: "amounts_", type: "uint256[]" },
      { internalType: "uint256[]", name: "e_prices_", type: "uint256[]" },
      { internalType: "uint256[]", name: "d_prices_", type: "uint256[]" },
    ],
    name: "Batch_set_nft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "sell_id_", type: "uint256" },
      { internalType: "uint256", name: "amount_", type: "uint256" },
      { internalType: "uint256", name: "token_kind_", type: "uint256" },
    ],
    name: "Buying",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "id_", type: "uint256" }],
    name: "Remove_collection",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "id_", type: "uint256" }],
    name: "Remove_selling",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256[]", name: "ids", type: "uint256[]" },
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "id_", type: "uint256" }],
    name: "Set_blacklist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "hash_", type: "string" }],
    name: "Set_collection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "hash_", type: "string" },
      { internalType: "uint256", name: "amount_", type: "uint256" },
      { internalType: "uint256", name: "e_price_", type: "uint256" },
      { internalType: "uint256", name: "d_price_", type: "uint256" },
    ],
    name: "Set_nft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "id_", type: "uint256" },
      { internalType: "uint256", name: "e_price_", type: "uint256" },
      { internalType: "uint256", name: "d_price_", type: "uint256" },
      { internalType: "uint256", name: "amount_", type: "uint256" },
    ],
    name: "Set_sell",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "sell_id_", type: "uint256" },
      { internalType: "uint256", name: "e_price_", type: "uint256" },
      { internalType: "uint256", name: "d_price_", type: "uint256" },
      { internalType: "uint256", name: "amount_", type: "uint256" },
    ],
    name: "Update_sell",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "string", name: "value", type: "string" },
      { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [],
    name: "withdrawCrypto",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "id", type: "uint256" },
    ],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "accounts", type: "address[]" },
      { internalType: "uint256[]", name: "ids", type: "uint256[]" },
    ],
    name: "balanceOfBatch",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "id_", type: "uint256" }],
    name: "check_blacklist",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dankToken",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ethBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "id_", type: "uint256" }],
    name: "Get_collection",
    outputs: [
      { internalType: "string", name: "", type: "string" },
      { internalType: "address", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "price_", type: "uint256" }],
    name: "Get_list_fee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "id_", type: "uint256" }],
    name: "Get_nft",
    outputs: [
      { internalType: "string", name: "", type: "string" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Get_nft_amount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "price_", type: "uint256" }],
    name: "Get_real_price",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "id_", type: "uint256" }],
    name: "Get_sell",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "price_", type: "uint256" }],
    name: "Get_sell_fee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "uri",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "userAddress", type: "address" }],
    name: "userTokenBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

/* SMART CONTRACT ENDS */

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
  },
  subtitle: {
    marginBottom: theme.spacing(1),
  },
  uploadContainer: {
    marginBottom: theme.spacing(8),
    width: "100%",
  },
  previewWrapper: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  dialog: {
    backgroundColor: theme.palette.background.secondary,
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0.5),
    },
  },
  preview: {
    width: theme.spacing(36),
    height: theme.spacing(48),
    position: "relative",
    "&:focus": {
      outline: "0 !important",
    },
  },
  button: {
    marginTop: theme.spacing(2),
  },
  memeTitle: {
    textAlign: "center",
    marginBottom: theme.spacing(1),
  },
}));

const MemeCreationPage = () => {
  const classes = useStyles();
  const [fileBuffer, setFileBuffer] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [showEmptyFileError, setShowEmptyFileError] = useState(false);
  const previewRef = useRef(null);
  const previewMobileRef = useRef(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const initialValues = {
    Name: "",
    Description: "",
    Tier: undefined,
    Price: "",
    Currency: "",
    Blockchain: "ethereum",
    ForSale: true,
    Currencies: [{ Price: "", Currency: "" }],
  };

  const convertCanvasToBlob = (canvas) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          blob.name = "meme";
          console.log("updated file", blob);
          resolve(blob);
        },
        "image/jpeg",
        1
      );
    });
  };

  const handleDownloadPng = async (ref) => {
    //     if (fileBuffer) {
    //       const canvas = await html2canvas(ref.current, {
    //         useCORS: true,
    //         scale: 3,
    //         scrollX: -window.scrollX,
    //         scrollY: matches ? 0 : -window.scrollY,
    //         windowWidth: document.documentElement.offsetWidth,
    //         windowHeight: window.innerHeight
    //       });
    //       const getUrl = blob =>
    //         new Promise(resolve => {
    //           const reader = new FileReader();
    //           reader.addEventListener("load", function () {
    //             // convert image file to base64 string
    //             return resolve(reader.result);
    //           }, false);
    //           reader.readAsDataURL(blob)
    //         })
    //       const croppedBlob = await convertCanvasToBlob(canvas);
    //       const dataUrl = await getUrl(croppedBlob);
    //       const croppedImageUrl = dataUrl;
    //       // const fetchBlob = await fetch(dataUrl).then(res => res.blob())
    //       // const fd = new FormData();
    //       // const file = new File([fetchBlob], "filename.jpeg");
    //       // console.log('my fucking file m8', file)
    //       // fd.append("imageupload", file);
    //       // fd.append("walletadd", "0xAd9b97fa8f28daCa6731d116d6fD2C72A164Ae0b");
    //       // fd.append("title", "Some icon in gif format");
    //       // var requestOptions = {
    //       //   method: 'POST',
    //       //   body: fd,
    //       //   redirect: 'follow'
    //       // };
    //       // fetch("https://api.mucitadel.io/v1/upload/ipfs", requestOptions)
    //       //   .then(response => response.text())
    //       //   .then(result => console.log(result))
    //       //   .catch(error => console.log('error', error));
    //       // const url = URL.createObjectURL(croppedImageUrl);
    //       // const link = document.createElement('a');
    // // <<<<<<< HEAD
    //       // if (typeof link.download === 'string') {
    //       //   link.href = url;
    //       //   // console.log((url.replace('blob:','')));
    //       //   link.download = 'meme';
    //       //   document.body.appendChild(link);
    //       //   link.click();
    //       //   document.body.removeChild(link);
    //       // } else {
    //       //   window.open(url);
    //       // }
    // // =======
    // //       if (typeof link.download === 'string') {
    // //         link.href = url;
    //         // console.log(croppedImageUrl);
    //         // Contract Functionality
    //         if (window.ethereum) {
    //           const provider = new ethers.providers.Web3Provider(
    //             window.ethereum
    //           );
    //           const blob = await fetch(croppedImageUrl).then(res => res.blob());
    //           const fd = new FormData();
    //           const file = new File([blob], "filename.jpeg");
    //           fd.append("imageupload", file);
    //           fd.append("walletadd", await window.ethereum.request({method: "eth_requestAccounts"}));
    //           fd.append("title", "Some icon in gif format");
    //           var requestOptions = {
    //             method: 'POST',
    //             body: fd,
    //             redirect: 'follow'
    //           };
    //         fetch("https://api.mucitadel.io/v1/upload/ipfs", requestOptions)
    //           .then(response => response.text())
    //           .then(result =>{
    //             console.log(JSON.parse(result));
    //             const JsonResult = JSON.parse(result);
    //             const final = async()=>{
    //               if (window.ethereum) {
    //                 const provider = new ethers.providers.Web3Provider(
    //                   window.ethereum
    //                 );
    //                 let contract = new ethers.Contract(
    //                   contractAdd,
    //                   contractAbi,
    //                   provider.getSigner()
    //                 );
    //                 const accounts = await window.ethereum.request({
    //                   method: "eth_requestAccounts",
    //                 });
    //                 const account = accounts[0];
    //                 const hash = JsonResult.data.path;
    //                 const amount = 1;
    //                 const e_amount = 0;
    //                 const d_amount = 0;
    //                 const weiBalance = await provider.getBalance(account);
    //                 const ethBalance = parseFloat(weiBalance) / 1e18;
    //                 const price = 0.005;
    //                 const sufficientFunds = ethBalance > price;
    //                 if (!sufficientFunds) {
    //                   return alert("Insufficient ETH funds for fees");
    //                 }
    //                 await contract.functions
    //                   .Set_nft(hash,amount, e_amount,d_amount)
    //                   .then(async function (result) {
    //                     console.log(result);
    //                     // alert(result, account); //alert("Silver Purchased Sucessfully");
    //                   });
    //               } else {
    //                 alert(
    //                   "Please install MetaMask or Trust Wallet in order to use blockchain features."
    //                 );
    //               }
    //             }
    //             final();
    //           })
    //           .catch(error => {
    //             console.log('error', error)
    //           });
    //         } else{
    //           alert("Connect Metamask")
    //         }
    //         // link.download = 'meme';
    //         // document.body.appendChild(link);
    //         // link.click();
    //         // document.body.removeChild(link);
    //       }
    //       //else {
    //         //window.open(url);
    //       //}
    // // >>>>>>> 4acd7cf17065d0408641e29ffd486e610fe54197
  };

  const handleSave = async (values, setSubmitting) => {
    if (!fileBuffer) {
      setShowEmptyFileError(true);
    } else {
      if (matches) {
        setShowPreview(true);
      } else {
        handleDownloadPng(previewRef);
      }
    }
  };

  const handleClose = () => {
    setShowConnectWallet(false);
  };

  const handleSetFileBuffer = (fileBuffer) => {
    if (fileBuffer) {
      setShowEmptyFileError(false);
    } else {
      setShowEmptyFileError(true);
    }
    setFileBuffer(fileBuffer);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  return (
    <div className="App text-white bg-mainbg min-h-screen font-body">
      <PageWrapper>
        <Typography variant="h4" className={classes.title}>
          Create Meme NFT Token
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            handleSave(values, setSubmitting);
          }}
          validationSchema={Yup.object().shape({
            Name: Yup.string().required("Name is required"),
            Description: Yup.string().required("Description is required"),
            Tier: Yup.string().required("Tier is required"),
            // Price: Yup.string().required('Price is required'),
            // Currency: Yup.string().required('Currency is required'),
            Blockchain: Yup.string().required("Blockchain is required"),
          })}
        >
          {(props) => {
            const { handleSubmit, values } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Grid container>
                  {/* <Grid item lg={8} md={8} sm={12} xs={12}> */}
                  <Grid container justify="space-between">
                    <Typography variant="h6" className={classes.subtitle}>
                      Upload file
                    </Typography>
                  </Grid>
                  <UploadMedia
                    className={classes.uploadContainer}
                    type={FILE_TYPES[FILE_TYPES.IMAGE.VALUE]}
                    fileBuffer={fileBuffer}
                    showEmptyFileError={showEmptyFileError}
                    setFileBuffer={handleSetFileBuffer}
                  />
                  <MemeCreationForm {...props} fileBuffer={fileBuffer} />
                  {/* </Grid> */}
                  {/* <Grid item lg={4} md={4} sm={12} xs={12} className={classes.previewWrapper}>
                    <Typography variant='h6' className={classes.subtitle}>Preview</Typography>
                    <div className={classes.preview} ref={previewRef}>
                      <PreviewCard
                        type={FILE_TYPES.IMAGE.VALUE}
                        fileBuffer={fileBuffer}
                        name={values.Name}
                        description={values.Description}
                      />
                    </div>
                  </Grid> */}
                </Grid>
                {/* {showPreview && 
                  <Dialog
                    classes={{
                      paper: classes.dialog
                    }}
                    aria-labelledby="simple-dialog-title"
                    open={true}
                    onClose={handleClosePreview}>
                    <Typography variant='h6' className={classes.memeTitle}>Your Meme</Typography>
                    <div className={classes.preview} ref={previewMobileRef}>
                      <PreviewCard
                        dialogMode
                        type={FILE_TYPES.IMAGE.VALUE}
                        fileBuffer={fileBuffer}
                        name={values.Name}
                        description={values.Description}
                      />
                    </div>
                    <MuButton 
                      className={classes.button}
                      onClick={() => handleDownloadPng(previewMobileRef)}
                      variant="contained" 
                      color="primary"
                      startIcon={<GetAppIcon />}>
                      Download
                    </MuButton>
                  </Dialog>
                } */}
              </form>
            );
          }}
        </Formik>
        {/* {showConnectWallet && 
          <ConnectWalletDialog onClose={handleClose} />
        } */}
      </PageWrapper>
    </div>
  );
};

export default MemeCreationPage;
