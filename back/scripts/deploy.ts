import { ethers } from "hardhat";

const main = async () => {
  const DrugMinter = await ethers.getContractFactory("DrugMinter");
  const drugMinter = await DrugMinter.deploy();

  await drugMinter.deployed();

  console.log("Product minter deployed to:", drugMinter.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
