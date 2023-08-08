const { ethers, upgrades } = require("hardhat");

async function main() {

  // deploy
  // const f = await ethers.getContractFactory("DelegateCashSample");
  // const token = await upgrades.deployProxy(f);
  // await token.deployed();
  // console.log(`Deployed to ${token.address}`);

  // upgrade
  const f = await ethers.getContractFactory("DelegateCashSample");
  const token = await upgrades.upgradeProxy('0x92F54379B4D47aeB9bC12C7bDAb95Df098DCBD1E', f);
  await token.deployed();
  console.log(`Deployed to ${token.address}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
