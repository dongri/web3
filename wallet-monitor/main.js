const { ethers } = require('ethers');
require('dotenv').config();

const {
  MNEMONIC: mnemonic,
  NETWORK: network,
  INFURA_API_KEY: infuraApiKey,
  RECIPIENT_ADDRESS: recipientAddress
} = process.env;

const wallet = ethers.Wallet.fromPhrase(mnemonic);
const provider = new ethers.InfuraProvider(network, infuraApiKey);
const connectedWallet = wallet.connect(provider);

const monitoredAddress = wallet.address;
const zeroBalance = ethers.parseEther('0');

console.log(`Monitoring wallet: ${monitoredAddress}`);

const detecteWallet = async () => {
  const balance = await provider.getBalance(monitoredAddress);
  console.log(`New balance detected: ${ethers.formatEther(balance)} ETH`);
  if (balance <= zeroBalance) {
    console.log('Balance is zero, skipping transaction');
    return
  }
  try {
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice;
    const gasLimit = 21000;
    const txCost = gasPrice * BigInt(gasLimit);
    const amountToSend = balance - txCost;
    if (amountToSend <= zeroBalance) {
      console.log('Not enough ETH to cover gas fees');
      return
    }
    const tx = await connectedWallet.sendTransaction({
      to: recipientAddress,
      value: amountToSend,
      gasPrice: gasPrice,
      gasLimit: gasLimit
    });
    console.log(`Transaction sent: ${tx.hash}`);
    await tx.wait();
    console.log('Transaction confirmed');
  } catch (error) {
    console.error('Error in sending transaction:', error);
  }
};

provider.on('block', async () => {
  await detecteWallet();
});
