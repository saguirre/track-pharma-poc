import { Contract, ethers } from "ethers";

import contractInterface from "../../../back/artifacts/contracts/DrugMinter.sol/DrugMinter.json";

export interface IContractInteractionService {
  setProvider: (provider: ethers.providers.Web3Provider) => void;
  getContract: () => Contract | undefined;
}

export class ContractInteractionService implements IContractInteractionService {
  private provider: ethers.providers.Web3Provider | undefined;
  private contract: Contract;
  private contractAbi = contractInterface.abi;

  constructor() {
    this.contract = this.getContract();
  }

  public setProvider = (provider: ethers.providers.Web3Provider) => {
    this.provider = provider;
  };

  public getContract = () => {
    if (!this.provider && typeof window !== "undefined") {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
    } else if (this.provider && !this.contract) {
      const signer = this.provider.getSigner();
      this.contract = new ethers.Contract(process.env.NEXT_PUBLIC_MINT_CONTRACT_ADDRESS, this.contractAbi, signer);
    }

    return this.contract;
  };
}
