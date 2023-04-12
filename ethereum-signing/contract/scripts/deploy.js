const { ethers, upgrades } = require("hardhat");

async function main() {
  // // First time
  // const NFTCreator = await ethers.getContractFactory("NFTCreator");
  // const token = await upgrades.deployProxy(NFTCreator);

  // Second time
  const NFTCreator = await ethers.getContractFactory("NFTCreator");
  const token = await upgrades.upgradeProxy('0x94309F12493b99D6b21104ca9B33973b1c9c74ea', NFTCreator);

  await token.deployed();
  console.log("token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
