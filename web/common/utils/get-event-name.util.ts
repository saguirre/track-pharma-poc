import { PermissionEnum } from "@enums";

export const getEventName = (permission: PermissionEnum) => {
  switch (permission) {
    case PermissionEnum.RequestApproval:
      return "DrugApprovalRequested";
    case PermissionEnum.ApproveDrug:
      return "DrugApproved";
    case PermissionEnum.DeclineDrug:
      return "DrugDeclined";
    case PermissionEnum.MarkAsManufactured:
      return "DrugManufactured";
    case PermissionEnum.MarkAsInTransitToDistributer:
      return "DrugInTransitToDistributer";
    case PermissionEnum.MarkAsInDistributerFacility:
      return "DrugInDistributerFacility";
    case PermissionEnum.MarkAsInTransitToWholesaler:
      return "DrugInTransitToWholesaler";
    case PermissionEnum.MarkAsDeliveredToWholesaler:
      return "DrugDeliveredToWholesaler";
    case PermissionEnum.MarkAsInWholesalerWarehouse:
      return "DrugInWholesalerFacility";
    case PermissionEnum.MarkAsReadyForSale:
      return "DrugReadyForSale";
    case PermissionEnum.MarkAsSold:
      return "DrugSold";
    case PermissionEnum.RegisterManufacturer:
      return "RegisteredManufacturer";
    case PermissionEnum.RegisterRegulatoryAgency:
      return "RegisteredRegulatoryAgency";
    case PermissionEnum.RegisterDistributer:
      return "RegisteredDistributer";
    case PermissionEnum.RegisterWholesaler:
      return "RegisteredWholesaler";
    default:
      return "";
  }
};
