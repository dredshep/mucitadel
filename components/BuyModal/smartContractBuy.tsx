import { ethers } from 'ethers'
import { NFT } from 'types/nft'
import marketcontractAbi from '../../config/abi/marketplace.json'
import contractAbi from '../../config/abi/meme.json'
import tokencontractAbi from '../../config/abi/token.json'
import {
  contractAdd,
  contractAddB,
  marketcontractAdd,
  marketcontractAddB,
  tokencontractAdd,
  tokencontractAddB
} from '../../constant/blockchain'

var window = require('global/window')

export default async function smartContractBuy(
  values: {
    formData: { price: { value: number; currency: string; label: string }; currency: string; amount: number }
    nft: NFT
  },
  setActiveStep,
) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  /* Selecting the right Blockchain */
  let ContractInteraction = ''
  let MarketPlaceAddress = ''
  let nftAddress = ''

  if (values.nft.blockchain == 'ethereum') {
    ContractInteraction = tokencontractAdd
    MarketPlaceAddress = marketcontractAdd
    nftAddress = contractAdd
  } else if (values.nft.blockchain == 'binance') {
    ContractInteraction = tokencontractAddB
    MarketPlaceAddress = marketcontractAddB
    nftAddress = contractAddB
  }

  /* Taking Mannual Approach for Test */
  const priceSlab = values.formData.price.label
  console.log(values.formData.price.value)
  const currencyAmount = values.formData.price.value * 1e5

  const currencySymbol = values.formData.price.currency
  // const currencyAmount = 1;
  // const currencySymbol = "ETH";
  console.log(String(currencyAmount).concat('0000000000000'), currencySymbol, values.formData.amount)

  let contract = new ethers.Contract(MarketPlaceAddress, marketcontractAbi, provider.getSigner())

  let nftcontract = new ethers.Contract(nftAddress, contractAbi, provider.getSigner())

  let contractToken = new ethers.Contract(ContractInteraction, tokencontractAbi, provider.getSigner())

  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  })

  /* Fetch Token ID using Token Hash */
  console.log(values.nft.ipfsurl)

  const tokenID = parseInt(await nftcontract.functions.getTokenIdFromHash(values.nft.ipfsurl))

  const userAsk = await contract.functions.getAsksByUser(values.nft.owner)

  const userAskOrder = await contract.functions.getOrdersKeyFromUser(values.nft.owner)

  console.log(accounts.toString(), MarketPlaceAddress)
  if (currencySymbol == 'DANK') {
    /* Check if Contract is Approved */
    /* 1st Step (Approving Dank)- ProgressBar to be added Below this comment */
    setActiveStep(1)

    const approval = await contractToken.functions.allowance(accounts.toString(), MarketPlaceAddress)
    console.log(parseInt(approval))

    console.log(String(currencyAmount).concat('0000000000000'))
    console.log(userAsk)

    for (var i = 0; i < userAsk[0].length; i++) {
      if (
        parseInt(userAsk[0][i][3]) == tokenID &&
        parseInt(String(currencyAmount).concat('0000000000000')) == parseInt(userAsk[0][i][5][0][1])
      ) {
        var OrderID = parseInt(userAskOrder[0][i])
        console.log(OrderID)
        console.log(String(parseInt(userAsk[0][i][5][0][1]) / 1e18).concat('000000000000000000'))

        const balanceOf = parseInt(await contractToken.functions.balanceOf(accounts.toString()))
        if (balanceOf < parseInt(userAsk[0][i][5][0][1])) {
          alert('You Dont have enough DANK to make a Purchase')
          return false
        }

        if (parseInt(approval) < parseInt(userAsk[0][i][5][0][1])) {
          /* If Token is not appoved for selling in contract approval dialog box will appear */
          const tokenApproval = await contractToken.functions.approve(
            MarketPlaceAddress,
            String(parseInt(userAsk[0][i][5][0][1]) / 1e18).concat('000000000000000000'),
          )

          await provider.waitForTransaction(tokenApproval.hash, 1)
        }
        /* 2nd Step (Buying NFT) - ProgressBar to be added Below this comment */
        setActiveStep(2)
        if (Number(values.formData.amount) > parseInt(userAsk[0][i][2])) {
          alert('Invalid Buy Amount for the Order')
          return false
        }

        /* This Will Buy The Token */
        console.log(parseInt(userAsk[0][i][2]))
        await contract.functions
          .buyToken(OrderID, currencySymbol, Number(values.formData.amount))
          .then(async function (result) {
            console.log(result)
            await provider.waitForTransaction(result.hash, 1)

            /* 3rd Step (Recording Database) - ProgressBar to be added Below this comment */
            setActiveStep(3)
            var myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

            var fd1 = new URLSearchParams()
            fd1.append('id', values.nft.id)
            fd1.append('owneraddress', accounts.toString())
            fd1.append('amount', String(Number(values.formData.amount)))
            fd1.append('txhash', result.hash)

            console.log('form values & file => ', fd1)
            const requestOptions = {
              method: 'POST',
              body: fd1,
              headers: myHeaders,
            }

            fetch('https://api.mucitadel.io/v1/nft/buynft', requestOptions)
              .then((response) => response.text())
              .then((result) => {
                /* End Result 100% */
                /* 4th Step (Completing Purchase) - ProgressBar to be added Below this comment */
                setActiveStep(4)
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
        // alert("No Sell Order for the NFT Found");
        // return false;
      }
    }
  } else if (currencySymbol == 'ETH' || currencySymbol == 'BNB') {
    /* 1st Step (Buying NFT) - ProgressBar to be added Below this comment */
    setActiveStep(1)
    for (var i = 0; i < userAsk[0].length; i++) {
      if (
        parseInt(userAsk[0][i][3]) == tokenID &&
        parseInt(String(currencyAmount).concat('0000000000000')) == parseInt(userAsk[0][i][4])
      ) {
        var OrderID = parseInt(userAskOrder[0][i])
        console.log(OrderID)

        const balanceOf = await provider.getBalance(accounts.toString())

        if (Number(balanceOf) < parseInt(userAsk[0][i][4]) * Number(values.formData.amount)) {
          alert('You Dont have enough Funds to make a Purchase')
          return false
        }

        if (Number(values.formData.amount) > parseInt(userAsk[0][i][2])) {
          alert('Invalid Buy Amount for the Order')
          return false
        }

        /* This Will Buy The Token */
        await contract.functions
          .buyToken(OrderID, currencySymbol, Number(values.formData.amount), {
            value: Number(userAsk[0][i][4] * Number(values.formData.amount)).toString(),
          })
          .then(async function (result) {
            console.log(result)
            await provider.waitForTransaction(result.hash, 1)
            /* 2nd Step (Recording NFT) - ProgressBar to be added Below this comment */
            setActiveStep(2)
            var myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

            var fd1 = new URLSearchParams()
            fd1.append('id', values.nft.id)
            fd1.append('owneraddress', accounts.toString()) // Default Mint -1
            fd1.append('amount', String(Number(values.formData.amount)))
            fd1.append('txhash', result.hash)

            console.log('form values & file => ', fd1)
            const requestOptions = {
              method: 'POST',
              body: fd1,
              headers: myHeaders,
            }

            fetch('https://api.mucitadel.io/v1/nft/buynft', requestOptions)
              .then((response) => response.text())
              .then((result) => {
                /* End Result 100% */
                /* 3rd Step (Completing Purchase) - ProgressBar to be added Below this comment */
                setActiveStep(3)
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
    }
  }
}
