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
  tokencontractAddB,
} from '../../constant/blockchain'

var window = require('global/window')

export default async function smartContractBuy(values: {
  formData: { price: number; currency: string; amount: number }
  nft: NFT
}) {
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
  const priceSlab = values.formData.currency.split(' ')
  const currencyAmount = parseInt((parseFloat(priceSlab[0]) * 1e5).toString())
  const currencySymbol = priceSlab[1]
  // const currencyAmount = 1;
  // const currencySymbol = "ETH";
  console.log(String(currencyAmount).concat('0000000000000'), currencySymbol)

  let contract = new ethers.Contract(MarketPlaceAddress, marketcontractAbi, provider.getSigner())

  let nftcontract = new ethers.Contract(nftAddress, contractAbi, provider.getSigner())

  let contractToken = new ethers.Contract(ContractInteraction, tokencontractAbi, provider.getSigner())

  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  })

  /* Fetch Token ID using Token Hash */

  const tokenID = parseInt(await nftcontract.functions.getTokenIdFromHash(values.nft.ipfsurl))

  const userAsk = await contract.functions.getAsksByUser(values.nft.owner)

  const userAskOrder = await contract.functions.getOrdersKeyFromUser(values.nft.owner)

  console.log(accounts.toString(), MarketPlaceAddress)
  if (currencySymbol == 'DANK') {
    /* Check if Contract is Approved */
    /* 1st Step (Approving Dank)- ProgressBar to be added Below this comment */

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

        if (parseInt(approval) < parseInt(userAsk[0][i][2])) {
          /* If Token is not appoved for selling in contract approval dialog box will appear */
          const tokenApproval = await contractToken.functions.approve(
            MarketPlaceAddress,
            String(parseInt(userAsk[0][i][5][0][1]) / 1e18).concat('000000000000000000'),
          )

          await provider.waitForTransaction(tokenApproval.hash, 1)
        }
        /* 2nd Step (Buying NFT) - ProgressBar to be added Below this comment */

        /* This Will Buy The Token */
        await contract.functions
          .buyToken(OrderID, currencySymbol, parseInt(userAsk[0][i][2]))
          .then(async function (result) {
            console.log(result)
            await provider.waitForTransaction(result.hash, 1)

            /* 3rd Step (Recording Database) - ProgressBar to be added Below this comment */
            var myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

            var fd1 = new URLSearchParams()
            fd1.append('id', values.nft.id)
            fd1.append('owneraddress', accounts.toString()) // Default Mint -1
            fd1.append('amount', String(parseInt(userAsk[0][i][2])))
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
  } else if (currencySymbol == 'ETH') {
    /* 1st Step (Buying NFT) - ProgressBar to be added Below this comment */
    for (var i = 0; i < userAsk[0].length; i++) {
      if (
        parseInt(userAsk[0][i][3]) == tokenID &&
        parseInt(String(currencyAmount).concat('0000000000000')) == parseInt(userAsk[0][i][4])
      ) {
        var OrderID = parseInt(userAskOrder[0][i])
        console.log(OrderID)

        /* This Will Buy The Token */
        await contract.functions
          .buyToken(OrderID, currencySymbol, parseInt(userAsk[0][i][2]), {
            value: parseInt(userAsk[0][i][4]).toString(),
          })
          .then(async function (result) {
            console.log(result)
            await provider.waitForTransaction(result.hash, 1)
            /* 2nd Step (Recording NFT) - ProgressBar to be added Below this comment */
            var myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

            var fd1 = new URLSearchParams()
            fd1.append('id', values.nft.id)
            fd1.append('owneraddress', accounts.toString()) // Default Mint -1
            fd1.append('amount', String(parseInt(userAsk[0][i][2])))
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
