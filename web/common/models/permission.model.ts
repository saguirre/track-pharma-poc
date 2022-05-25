import { DrugStatusEnum, PermissionEnum, RoleEnum, SupplyChainStatusEnum } from "@enums";

export interface Permission {
  name: PermissionEnum;
  roles: RoleEnum[];
  drugConditions?: DrugStatusEnum[];
  supplyChainConditions?: SupplyChainStatusEnum[];
}
