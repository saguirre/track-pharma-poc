import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { ethers } from "ethers";

import { Layout, LoadingWrapper } from "@components";
import { AppContext, ContractServiceContext } from "@contexts";
import { AdminService, AuthorizationService, ContractInteractionService, DrugService, UrlService } from "@services";

import "../styles/globals.css";

const SupplyChainTraceability = ({ Component, pageProps }: AppProps) => {
  const contractService = new ContractInteractionService();
  const urlService = new UrlService();
  const authorizationService = new AuthorizationService(contractService);
  const adminService = new AdminService(contractService);
  const drugService = new DrugService(contractService, urlService);

  const [loadingProvider, setLoadingProvider] = useState<boolean>(true);
  useEffect(() => {
    window.provider = new ethers.providers.Web3Provider(window.ethereum);
    contractService.setProvider(window.provider);
    setLoadingProvider(false);
  });

  return (
    <LoadingWrapper loading={loadingProvider}>
      <Layout>
        <ContractServiceContext.Provider value={contractService}>
          <AppContext.Provider value={{ authorizationService, adminService, drugService }}>
            <Component {...pageProps} />
          </AppContext.Provider>
        </ContractServiceContext.Provider>
      </Layout>
    </LoadingWrapper>
  );
};

export default SupplyChainTraceability;
