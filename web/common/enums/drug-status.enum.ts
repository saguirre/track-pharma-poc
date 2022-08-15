export enum DrugStatusEnum {
  Created = "Created",
  ApprovalRequested = "Approval Requested",
  Approved = "Approved",
  Declined = "Declined",
}

export const mapDrugStatusToEnumValues: { [key: number]: DrugStatusEnum } = {
  0: DrugStatusEnum.Created,
  1: DrugStatusEnum.ApprovalRequested,
  2: DrugStatusEnum.Approved,
  3: DrugStatusEnum.Declined,
};
