let hdkey = require('ethereumjs-wallet/hdkey');
let bip39 = require("bip39");

const words = {
  12: 128,
  24: 256
}

const mnemonic = bip39.generateMnemonic(words[24]);

let hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));

let wallet_hdpath = "m/44'/60'/0'/0/";

console.log();
console.log('mnemonic : ' + mnemonic);

console.log();

// generate wallets
for (let i = 0; i < 10; i++) {
  let wallet = hdwallet.derivePath(wallet_hdpath + i).getWallet();
  let privateKey = wallet.getPrivateKeyString();
  let address = wallet.getChecksumAddressString(); // EIP-55
  console.log('private key ' + i + ': ' + privateKey);
  console.log('address     ' + i + ': ' + address);
  console.log();
}
