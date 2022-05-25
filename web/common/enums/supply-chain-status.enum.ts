export enum SupplyChainStatusEnum {
  PendingManufacturing = "Pending Manufacturing",
  Manufactured = "Manufactured",
  InTransitToDistributer = "In Transit to Distributer",
  AtDistributerFacility = "At Distributer Facility",
  InTransitToWholesaler = "In Transit to Wholesaler",
  DeliveredToWholesaler = "Delivered to Wholesaler",
  AtWholesalerFacility = "At Wholesaler Facility",
  ReadyForSale = "Ready for sale",
  Sold = "Sold",
  Returned = "Returned",
}

export const mapSupplyChainStatusToEnumValues: { [key: number]: SupplyChainStatusEnum } = {
  0: SupplyChainStatusEnum.PendingManufacturing,
  1: SupplyChainStatusEnum.Manufactured,
  2: SupplyChainStatusEnum.InTransitToDistributer,
  3: SupplyChainStatusEnum.AtDistributerFacility,
  4: SupplyChainStatusEnum.InTransitToWholesaler,
  5: SupplyChainStatusEnum.DeliveredToWholesaler,
  6: SupplyChainStatusEnum.AtWholesalerFacility,
  7: SupplyChainStatusEnum.ReadyForSale,
  8: SupplyChainStatusEnum.Sold,
  9: SupplyChainStatusEnum.Returned,
};
