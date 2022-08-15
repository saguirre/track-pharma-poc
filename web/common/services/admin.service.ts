import { IContractInteractionService } from "./contract.service";

export interface IAdminService {
  registerManufacturer: (address: string) => Promise<void>;
  registerRegulatoryAgency: (address: string) => Promise<void>;
  registerDistributer: (address: string) => Promise<void>;
  registerWholesaler: (address: string) => Promise<void>;
}

export class AdminService implements IAdminService {
  constructor(private contractService: IContractInteractionService) {}

  public registerManufacturer = async (address: string) => {
    await this.contractService.getContract()?.registerManufacturer(address);
  };

  public registerRegulatoryAgency = async (address: string) => {
    await this.contractService.getContract()?.registerRegulatoryAgency(address);
  };

  public registerDistributer = async (address: string) => {
    await this.contractService.getContract()?.registerDistributer(address);
  };

  public registerWholesaler = async (address: string) => {
    await this.contractService.getContract()?.registerWholesaler(address);
  };
}
