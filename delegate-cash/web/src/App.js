import './App.css';
import dcImage from './dc-image.png';

import React, { useState } from 'react';
import DelegateCashButton from 'delegatecash-button-react';
import Web3 from 'web3';

function App() {
  const [connectedWallet, setConnectedWallet] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isConnectHidden, setIsConnectHidden] = useState(false);

  const getWeb3 = async () => {
    try {
      let currentProvider = null;
      if (window.ethereum) {
        await window.ethereum.enable();
        currentProvider = window.ethereum;
      } else if (window.web3) {
        currentProvider = window.web3.currentProvider;
      } else {
        alert('No Metamask (or other Web3 Provider) installed');
      }
      if (currentProvider) {
        const web3 = new Web3(currentProvider);
        const networkId = await web3.eth.net.getId();
        const accounts = (await web3.eth.getAccounts()) || web3.eth.accounts;
        const account = accounts[0];
        return {web3, account, networkId}
      }
    } catch (err) {
      console.log(err);
    }
  };

  const connectWallet = async () => {
    try {
      let { web3, account, networkId } = await getWeb3();
      console.log(web3)
      if (networkId !== targetNetworkId) {
        alert('Please connect to the goerli testnet');
        return
      }
      setConnectedWallet(account);
      setDisabled(false);
      setIsConnectHidden(true);
    } catch (err) {
      console.log(err.message);
    }
  }

  const claim = async (vault) => {
    console.log(vault);
    try {
      let { web3, account, networkId } = await getWeb3();
      if (networkId !== targetNetworkId) {
        alert('Please connect to the goerli testnet');
        return
      }
      const contract = new web3.eth.Contract(abi, address);
      contract.methods.claim(vault).send(
        {
          from: account,
        }
      )
      .on('transactionHash', (hash) => {
        alert('Transaction hash: ' + hash)
      })
      .on('rejection', (err) => {
        alert(err.message);
      })
    } catch (err) {
      console.log(err.message);
    }
  }

  const abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DELEGATE_CONTRACT","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_vault","type":"address"}],"name":"claim","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"__newBaseURI","type":"string"}],"name":"setTokenBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"__tokenID","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
  const address = '0x92F54379B4D47aeB9bC12C7bDAb95Df098DCBD1E'; // goerli
  const targetNetworkId = 5; // goerli

  return (
    <div style={{margin: "0 auto", width: "600px"}}>

      <div className="title">
        <h1>Delegate Cash Sample (on goerli)</h1>
      </div>

      <div style={{margin: "30px"}}>
        <h4>1. Use cold wallet to Mint original NFT</h4>
        <a href="https://membership.on.fleek.co/">https://membership.on.fleek.co/</a>
      </div>

      <div style={{margin: "30px"}}>
        <h4>2. Delegate hot wallet from cold wallet</h4>
        <a href="https://delegate.cash/">https://delegate.cash</a>
        <div style={{marginTop: "10px"}}>
          <img src={dcImage} alt="dc" />
        </div>
      </div>

      <div style={{margin: "30px"}}>
        <h4>3. Claim NFT from host wallet</h4>
        <div style={{marginTop: "10px"}}>
          {isConnectHidden ? null : 
              <button onClick={connectWallet}>Connect Wallet</button>
          }
          <div style={{marginTop: "10px"}}>
            <DelegateCashButton
              label="Claim NFT"
              connectedWallet={connectedWallet}
              contract="0xEd19dDc9c0760af11294827b713919460c1aa3Dc"
              rpcUrl="https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
              rounded={true}
              forceDropdown={true}
              theme="dark"
              onButtonClick={event => claim(event.detail)}
              onWalletSelect={event => console.log(event.detail)}
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      <div style={{margin: "30px"}}>
        <h4>Smart Contract</h4>
        <a href="https://github.com/tanelabs/delegate-cash-sample/blob/main/contract/contracts/delegate_cash_sample.sol">delegate_cash_sample.sol</a>
      </div>

    </div>
  );
}

export default App;
