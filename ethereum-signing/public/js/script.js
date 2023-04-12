const $result = (text) => {
  document.getElementById('result').innerHTML = text
}

const setupWeb3 = async () => {
  try {
    let currentProvider = null
    if (window.ethereum) {
      await window.ethereum.enable()
      currentProvider = window.ethereum
    } else if (window.web3) {
      currentProvider = window.web3.currentProvider
    } else {
      window.open('https://metamask.app.link/dapp/nft-swap.example.com', '_blank');
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

const eth_sign = async () => {
  const {web3, chainId, account} = await setupWeb3()
  const message = document.getElementById('message').value
  web3.eth.sign(web3.utils.sha3(message), account, (err, signature) => {
    if (err) {
      $result(err.message)
    } else {
      $result(signature)
    }
  })
}

const personal_sign = async () => {
  const {web3, chainId, account} = await setupWeb3()
  const message = document.getElementById('message').value
  web3.eth.personal.sign(message, account, (err, signature) => {
    if (err) {
      $result(err.message)
    } else {
      $result(signature)
    }
  })
}

const sign_typed_data_v4 = async () => {
  const {web3, chainId, account} = await setupWeb3()
  if (chainId !== 5) {
    $result('Please switch to Goerli testnet')
    return
  }
  const executor = document.getElementById('executor').value
  const msgParams = JSON.stringify({
    domain: {
      name: 'CreateNFT',
      version: '1',
      chainId: 5,
      verifyingContract: '0x94309F12493b99D6b21104ca9B33973b1c9c74ea',
    },
    message: {
      executor: executor,
      contents: 'Executor can create NFTs with this message',
    },
    primaryType: 'Creator',
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      Creator: [
        { name: 'executor', type: 'address' },
        { name: 'contents', type: 'string' },
      ],
    },
  });

  web3.currentProvider.sendAsync({
    method: 'eth_signTypedData_v4',
    params: [account, msgParams],
    from: account
  }, (err, result) => {
    if (err) {
      $result(err.message)
    } else {
      $result(result.result)
    }
  })
}


const call_contract = async () => {
  const {web3, chainId, account} = await setupWeb3()
  const contract = new web3.eth.Contract(ContractABI, ContractAddressGoerli)
  const signature = document.getElementById('result').value
  console.log(signature)
  const result = await contract.methods.createNFT(signature).call({from: account})
  $result(JSON.stringify(result))
}

const ContractABI = [{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"createNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"getSigner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAdmin","type":"address"}],"name":"setAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const ContractAddressGoerli = '0x94309F12493b99D6b21104ca9B33973b1c9c74ea';
