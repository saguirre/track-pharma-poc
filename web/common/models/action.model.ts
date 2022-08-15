import { PermissionEnum } from "@enums";

export interface Action {
  name: PermissionEnum;
  method: (tokenId: string, address?: string) => Promise<void>;
  type?: { icon: any; bgColorClass: string; bgHoverColor: string };
  loading: boolean;
}