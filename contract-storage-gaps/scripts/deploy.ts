import { ethers, upgrades } from "hardhat";

async function main() {
  const f = await ethers.getContractFactory("Son");
  const t = await upgrades.deployProxy(f);
  await t.waitForDeployment();
  console.log("Token deployed to:", await t.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
