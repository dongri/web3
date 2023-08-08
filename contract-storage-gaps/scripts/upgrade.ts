import { ethers, upgrades } from "hardhat";

async function main() {
  const f = await ethers.getContractFactory("Son");
  const t = await upgrades.upgradeProxy('0xb0a07e4cE6b34c33887D5c1edbc4bD86C48bF406', f);
  await t.waitForDeployment();
  console.log("Token deployed to", await t.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
