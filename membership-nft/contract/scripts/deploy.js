const { ethers, upgrades } = require("hardhat");

async function main() {

  // deploy
  const Membership = await ethers.getContractFactory("Membership");
  const token = await upgrades.deployProxy(Membership);
  await token.deployed();
  console.log(`Deployed to ${token.address}`);

  // upgrade
  // const Membership = await ethers.getContractFactory("Membership");
  // const token = await upgrades.upgradeProxy('0xb78742b3b1666B48E22C0E275Fd009eBDcE9115C', Membership);
  // await token.deployed();
  // console.log(`Deployed to ${token.address}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
