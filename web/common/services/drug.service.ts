import axios from "axios";

import { Action, Drug, DrugResponse, Permission } from "@models";
import { IContractInteractionService, IUrlService } from "@services";
import { mapDrugStatusToEnumValues, mapSupplyChainStatusToEnumValues, PermissionEnum, RoleEnum } from "@enums";
import { actionTypes } from "common/utils/action-types.util";
import { transformToCamelCase } from "common/utils/camel-case-transform.util";
import _ from "lodash";

export interface IDrugService {
  getAllDrugs: () => Promise<Drug[] | undefined>;
  getDrugInfo: (tokenId: string) => Promise<Drug | undefined>;
  approveDrug: (tokenId: string) => Promise<void>;
  declineDrug: (tokenId: string) => Promise<void>;
  getActionsForPermissions: (drug: Drug, permissions: Permission[]) => Action[];
  getActionMethod: (permission: PermissionEnum) => (tokenId: string, address?: string) => Promise<void>;
  requestApproval: (tokenId: string) => Promise<void>;
  markAsManufactured: (tokenId: string) => Promise<void>;
  markAsInTransitToDistributer: (tokenId: string) => Promise<void>;
  markAsInDistributerFacility: (tokenId: string) => Promise<void>;
  markAsInTransitToWholesaler: (tokenId: string) => Promise<void>;
  markAsDeliveredToWholesaler: (tokenId: string) => Promise<void>;
  markAsInWholesalerFacility: (tokenId: string) => Promise<void>;
  markAsReadyForSale: (tokenId: string) => Promise<void>;
  markAsSold: (tokenId: string) => Promise<void>;
}

export class DrugService implements IDrugService {
  constructor(private contractService: IContractInteractionService, private urlService: IUrlService) {}
  public markAsManufactured = async (tokenId: string) => {
    return await this.contractService.getContract()?.markAsManufactured(tokenId);
  };

  public markAsInTransitToDistributer = async (tokenId: string) => {
    return await this.contractService.getContract()?.markAsInTransitToDistributer(tokenId);
  };

  public markAsInDistributerFacility = async (tokenId: string) => {
    return await this.contractService.getContract()?.markAsInDistributerFacility(tokenId);
  };

  public markAsInTransitToWholesaler = async (tokenId: string) => {
    return await this.contractService.getContract()?.markAsInTransitToWholesaler(tokenId);
  };

  public markAsDeliveredToWholesaler = async (tokenId: string) => {
    return await this.contractService.getContract()?.markAsDeliveredToWholesaler(tokenId);
  };

  public markAsInWholesalerFacility = async (tokenId: string) => {
    return await this.contractService.getContract()?.markAsInWholesalerFacility(tokenId);
  };

  public markAsReadyForSale = async (tokenId: string) => {
    return await this.contractService.getContract()?.markAsReadyForSale(tokenId);
  };

  public markAsSold = async (tokenId: string) => {
    return await this.contractService.getContract()?.markAsSold(tokenId);
  };

  public approveDrug = async (tokenId: string) => {
    return await this.contractService.getContract()?.changeDrugStatus(tokenId, true);
  };

  public declineDrug = async (tokenId: string) => {
    return await this.contractService.getContract()?.changeDrugStatus(tokenId, false);
  };

  public getActionMethod = (permission: PermissionEnum): ((tokenId: string, address?: string) => Promise<void>) => {
    switch (permission) {
      case PermissionEnum.RequestApproval:
        return this.requestApproval;
      case PermissionEnum.ApproveDrug:
        return this.approveDrug;
      case PermissionEnum.DeclineDrug:
        return this.declineDrug;
      case PermissionEnum.MarkAsManufactured:
        return this.markAsManufactured;
      case PermissionEnum.MarkAsInTransitToDistributer:
        return this.markAsInTransitToDistributer;
      case PermissionEnum.MarkAsInDistributerFacility:
        return this.markAsInDistributerFacility;
      case PermissionEnum.MarkAsInTransitToWholesaler:
        return this.markAsInTransitToWholesaler;
      case PermissionEnum.MarkAsDeliveredToWholesaler:
        return this.markAsDeliveredToWholesaler;
      case PermissionEnum.MarkAsInWholesalerWarehouse:
        return this.markAsInWholesalerFacility;
      case PermissionEnum.MarkAsReadyForSale:
        return this.markAsReadyForSale;
      case PermissionEnum.MarkAsSold:
        return this.markAsSold;
      default:
        return async () => {};
    }
  };

  private conditionsAreMet = (drug: Drug, permission: Permission): boolean | undefined => {
    return (
      permission.drugConditions?.includes(mapDrugStatusToEnumValues[drug.status]) &&
      permission.supplyChainConditions?.includes(mapSupplyChainStatusToEnumValues[drug.supplyChainStatus])
    );
  };

  public getActionsForPermissions = (drug: Drug, permissions: Permission[]) => {
    let actions: Action[] = [];

    for (const permission of permissions) {
      if (this.conditionsAreMet(drug, permission)) {
        actions.push({
          name: permission.name,
          type: actionTypes[transformToCamelCase(permission.name)],
          method: this.getActionMethod(permission.name),
          loading: false,
        });
      }
    }

    if (actions?.length) {
      actions = _.uniqBy(actions, (action) => action.name);
    }
    return actions;
  };

  public getAllDrugs = async () => {
    const drugMinterContract = this.contractService?.getContract();
    if (drugMinterContract) {
      const nfts = await drugMinterContract?.fetchDrugs();
      const items = [];
      for (const nft of nfts) {
        const tokenURI = await drugMinterContract?.tokenURI(nft.tokenId);
        const ipfsUrl = this.urlService.getUrlFromCID(tokenURI);
        const response = await axios.get(ipfsUrl);
        const metadata: DrugResponse = response.data;
        metadata.image = this.urlService.getUrlFromCID(metadata?.image);
        const item: Drug = {
          tokenId: nft.tokenId.toString(),
          ownerAddress: nft.owner,
          imageUrl: metadata.image,
          name: metadata.name,
          status: nft.status,
          supplyChainStatus: nft.supplyChainStatus,
          activeIngredients: nft.activeIngredients,
          dosageForm: nft.dosageForm,
          route: nft.route,
          strength: nft.strength,
          description: metadata.description,
          loadingImage: false,
        };
        items.push(item);
      }
      return items;
    }
  };

  public requestApproval = async (tokenId: string) => {
    await this.contractService.getContract()?.requestApproval(tokenId);
  };

  public getDrugInfo = async (tokenId: string) => {
    const drugMinterContract = this.contractService?.getContract();
    const drug = await drugMinterContract?.fetchDrugInformation(tokenId);
    const tokenURI = await drugMinterContract?.tokenURI(tokenId);
    const ipfsUrl = this.urlService.getUrlFromCID(tokenURI);
    const response = await axios.get(ipfsUrl);
    const metadata: DrugResponse = response.data;
    metadata.image = this.urlService.getUrlFromCID(metadata?.image);
    const item: Drug = {
      tokenId: tokenId.toString(),
      ownerAddress: drug.owner,
      imageUrl: metadata.image,
      name: metadata.name,
      status: drug.status,
      supplyChainStatus: drug.supplyChainStatus,
      activeIngredients: drug.activeIngredients,
      dosageForm: drug.dosageForm,
      route: drug.route,
      strength: drug.strength,
      description: metadata.description,
      loadingImage: false,
    };
    return item;
  };
}
