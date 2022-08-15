export interface Drug {
  name: string;
  imageUrl: string;
  description: string;
  ownerAddress: string;
  tokenId: string;
  status: number;
  supplyChainStatus: number;
  activeIngredients: string[];
  dosageForm: string;
  route: string;
  strength: string;
  loadingImage: boolean;
}

export const drugInitialState = {
  description: "",
  name: "",
  imageUrl: "",
  ownerAddress: "",
  status: 0,
  supplyChainStatus: 0,
  tokenId: "",
  activeIngredients: [],
  dosageForm: "",
  strength: "",
  route: "",
  loadingImage: true,
};
