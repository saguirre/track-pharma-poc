import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("greet", "Calls Greeter contract", async (taskArgs, hre) => {
  const contractAddress = "0x8419782563B869971DcA874b464F91Fc6ab6061C";
  const contract = await hre.ethers.getContractAt("Greeter", contractAddress);
  console.log(await contract.greet());
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    matic: {
      url: "https://rpc-mumbai.maticvigil.com/v1/899253f0601ad5bcd714a546b91a879055a38cf3",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/QJsq8YHp82m1fP0JuVm6Y6Pvwn9RxiNk`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/3_fmXs3pGJ1rMj5hNJ0ZitHVWFAYifsk`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};

export default config;
