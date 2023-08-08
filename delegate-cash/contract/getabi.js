const fs = require('fs');

const f = JSON.parse(fs.readFileSync('./artifacts/contracts/delegate_cash_sample.sol/DelegateCashSample.json', 'utf8'));
console.log(JSON.stringify(f.abi));
