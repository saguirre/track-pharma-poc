export enum RoleEnum {
  Admin,
  Manufacturer,
  RegulatoryAgency,
  Distributer,
  Wholesaler,
}

export const mapRoleToEnumValues: { [key: number]: RoleEnum } = {
  0: RoleEnum.Admin,
  1: RoleEnum.Manufacturer,
  2: RoleEnum.RegulatoryAgency,
  3: RoleEnum.Distributer,
  4: RoleEnum.Wholesaler,
};
