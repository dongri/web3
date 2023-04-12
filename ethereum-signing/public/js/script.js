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

const sign_typed_data_v4 = async () => {
  const {web3, chainId, account} = await setupWeb3()
  if (chainId !== 5) {
    result('Please switch to Goerli testnet')
    return
  }
  const msgParams = JSON.stringify({
    domain: {
      name: 'Mail',
      version: '1',
      chainId: 5,
      verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    },

    // Defining the message signing data content.
    message: {
      /*
       - Anything you want. Just a JSON Blob that encodes the data you want to send
       - No required fields
       - This is DApp Specific
       - Be as explicit as possible when building out the message schema.
      */
      contents: 'Hello, Bob!',
      attachedMoneyInEth: 4.2,
      from: {
        name: 'Cow',
        wallets: [
          '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
          '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
        ],
      },
      to: [
        {
          name: 'Bob',
          wallets: [
            '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
            '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
            '0xB0B0b0b0b0b0B000000000000000000000000000',
          ],
        },
      ],
    },
    // Refers to the keys of the *types* object below.
    primaryType: 'Mail',
    types: {
      // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      // Not an EIP712Domain definition
      Group: [
        { name: 'name', type: 'string' },
        { name: 'members', type: 'Person[]' },
      ],
      // Refer to PrimaryType
      Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person[]' },
        { name: 'contents', type: 'string' },
      ],
      // Not an EIP712Domain definition
      Person: [
        { name: 'name', type: 'string' },
        { name: 'wallets', type: 'address[]' },
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

