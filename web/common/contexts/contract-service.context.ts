import { createContext } from "react";

import { ContractInteractionService } from "@services";

export const ContractServiceContext = createContext(new ContractInteractionService());
