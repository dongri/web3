const fs = require('fs');

const f = JSON.parse(fs.readFileSync('./artifacts/contracts/Membership.sol/Membership.json', 'utf8'));
console.log(JSON.stringify(f.abi));
