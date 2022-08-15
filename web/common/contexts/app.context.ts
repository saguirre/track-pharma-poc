import { createContext } from "react";

import { AdminService, AuthorizationService, ContractInteractionService, DrugService, UrlService } from "@services";

export const AppContext = createContext({
  authorizationService: new AuthorizationService(new ContractInteractionService()),
  adminService: new AdminService(new ContractInteractionService()),
  drugService: new DrugService(new ContractInteractionService(), new UrlService()),
});
