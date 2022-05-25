import { Permission } from "@models";
import { IContractInteractionService } from "@services";
import { DrugStatusEnum, mapRoleToEnumValues, PermissionEnum, RoleEnum, SupplyChainStatusEnum } from "@enums";

export interface IAuthorizationService {
  userHasRole: (address: string, role: RoleEnum) => Promise<boolean>;
  getRoles: (address: string) => Promise<UserRole[]>;
  isAddressOwner: (address: string) => Promise<boolean>;
  getRolePermissions: (role: RoleEnum) => Permission[];
  userHasPermission: (address: string, permission: PermissionEnum) => Promise<boolean>;
}

export interface UserRole {
  role: RoleEnum;
  active: boolean;
}

export class AuthorizationService implements IAuthorizationService {
  constructor(private contractService: IContractInteractionService) {}

  private roles: RoleEnum[] = [
    RoleEnum.Admin,
    RoleEnum.Manufacturer,
    RoleEnum.RegulatoryAgency,
    RoleEnum.Distributer,
    RoleEnum.Wholesaler,
  ];

  private permissions: Permission[] = [
    {
      name: PermissionEnum.Mint,
      roles: [RoleEnum.Admin, RoleEnum.Manufacturer],
    },
    {
      name: PermissionEnum.ViewDashboard,
      roles: [
        RoleEnum.Admin,
        RoleEnum.Manufacturer,
        RoleEnum.RegulatoryAgency,
        RoleEnum.Distributer,
        RoleEnum.Wholesaler,
      ],
    },
    {
      name: PermissionEnum.ViewDrug,
      roles: [
        RoleEnum.Admin,
        RoleEnum.Manufacturer,
        RoleEnum.RegulatoryAgency,
        RoleEnum.Distributer,
        RoleEnum.Wholesaler,
      ],
    },
    {
      name: PermissionEnum.RequestApproval,
      roles: [RoleEnum.Admin, RoleEnum.Manufacturer],
      drugConditions: [DrugStatusEnum.Created],
      supplyChainConditions: [SupplyChainStatusEnum.PendingManufacturing],
    },
    {
      name: PermissionEnum.ApproveDrug,
      roles: [RoleEnum.Admin, RoleEnum.RegulatoryAgency],
      drugConditions: [DrugStatusEnum.ApprovalRequested],
      supplyChainConditions: [SupplyChainStatusEnum.PendingManufacturing],
    },
    {
      name: PermissionEnum.DeclineDrug,
      roles: [RoleEnum.Admin, RoleEnum.RegulatoryAgency],
      drugConditions: [DrugStatusEnum.ApprovalRequested],
      supplyChainConditions: [SupplyChainStatusEnum.PendingManufacturing],
    },
    {
      name: PermissionEnum.MarkAsManufactured,
      roles: [RoleEnum.Admin, RoleEnum.Manufacturer],
      drugConditions: [DrugStatusEnum.Approved],
      supplyChainConditions: [SupplyChainStatusEnum.PendingManufacturing],
    },
    {
      name: PermissionEnum.MarkAsInTransitToDistributer,
      roles: [RoleEnum.Admin, RoleEnum.Distributer],
      drugConditions: [DrugStatusEnum.Approved],
      supplyChainConditions: [SupplyChainStatusEnum.Manufactured],
    },
    {
      name: PermissionEnum.MarkAsInDistributerFacility,
      roles: [RoleEnum.Admin, RoleEnum.Distributer],
      drugConditions: [DrugStatusEnum.Approved],
      supplyChainConditions: [SupplyChainStatusEnum.InTransitToDistributer],
    },
    {
      name: PermissionEnum.MarkAsInTransitToWholesaler,
      roles: [RoleEnum.Admin, RoleEnum.Distributer],
      drugConditions: [DrugStatusEnum.Approved],
      supplyChainConditions: [SupplyChainStatusEnum.AtDistributerFacility],
    },
    {
      name: PermissionEnum.MarkAsDeliveredToWholesaler,
      roles: [RoleEnum.Admin, RoleEnum.Distributer],
      drugConditions: [DrugStatusEnum.Approved],
      supplyChainConditions: [SupplyChainStatusEnum.InTransitToWholesaler],
    },
    {
      name: PermissionEnum.MarkAsInWholesalerWarehouse,
      roles: [RoleEnum.Admin, RoleEnum.Wholesaler],
      drugConditions: [DrugStatusEnum.Approved],
      supplyChainConditions: [SupplyChainStatusEnum.DeliveredToWholesaler],
    },
    {
      name: PermissionEnum.MarkAsReadyForSale,
      roles: [RoleEnum.Admin, RoleEnum.Manufacturer],
      drugConditions: [DrugStatusEnum.Approved],
      supplyChainConditions: [SupplyChainStatusEnum.AtWholesalerFacility],
    },
    {
      name: PermissionEnum.MarkAsSold,
      roles: [RoleEnum.Admin, RoleEnum.Manufacturer],
      drugConditions: [DrugStatusEnum.Approved],
      supplyChainConditions: [SupplyChainStatusEnum.ReadyForSale],
    },
  ];

  public userHasRole = async (address: string, role: RoleEnum) => {
    switch (role) {
      case RoleEnum.Admin:
        return await this.isAddressOwner(address);
      case RoleEnum.Manufacturer:
        return await this.isAddressManufacturer(address);
      case RoleEnum.RegulatoryAgency:
        return await this.isAddressRegulatoryAgency(address);
      case RoleEnum.Distributer:
        return await this.isAddressDistributer(address);
      default:
        return false;
    }
  };

  public userHasPermission = async (address: string, permission: PermissionEnum) => {
    const userRoles: UserRole[] = await this.getRoles(address);

    if (userRoles?.length) {
      for (const userRole of userRoles) {
        const userPermissions = this.getRolePermissions(userRole.role);
        const hasPermission = userPermissions.some((userPermission: Permission) => userPermission.name === permission);
        if (hasPermission) {
          return true;
        }
      }
    }

    return false;
  };

  public getRoles = async (address: string): Promise<UserRole[]> => {
    return await this.contractService.getContract()?.getRoles(address);
  };

  public getRolePermissions = (role: RoleEnum) => {
    return this.permissions.filter((permission: Permission) => permission.roles.includes(mapRoleToEnumValues[role]));
  };

  private isAddressManufacturer = async (address: string): Promise<boolean> => {
    return await this.contractService.getContract()?.isAddressManufacturer(address);
  };

  private isAddressRegulatoryAgency = async (address: string): Promise<boolean> => {
    return await this.contractService.getContract()?.isAddressRegulatoryAgency(address);
  };

  private isAddressDistributer = async (address: string): Promise<boolean> => {
    return await this.contractService.getContract()?.isAddressDistributer(address);
  };

  public isAddressOwner = async (address: string): Promise<boolean> => {
    return await this.contractService.getContract()?.isAddressOwner(address);
  };
}
