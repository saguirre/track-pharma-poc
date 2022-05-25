import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
    provider: ethers.providers.Web3Provider;
  }
}
