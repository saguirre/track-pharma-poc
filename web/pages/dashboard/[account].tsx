import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { formatUnits } from "@ethersproject/units";

import {
  DrugCard,
  LoadingWrapper,
  authenticatedRoute,
  RegisterAddress,
  Wrapper,
  NotificationAlert,
  NoDrugsPlaceholder,
} from "@components";
import { AppContext, ContractServiceContext } from "@contexts";
import { PermissionEnum } from "@enums";
import { Action, Drug } from "@models";
import { useNotification } from "@hooks";
import { getEventName } from "@utils";

const DashboardView: NextPage = () => {
  const router: NextRouter = useRouter();
  const account = router.query?.account as string;
  const { adminService, drugService } = useContext(AppContext);
  const { getContract } = useContext(ContractServiceContext);
  const [drugs, setDrugs] = useState<Array<Drug>>([]);
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const { createNotification, closeNotification, notification, showNotification } = useNotification();
  const [adminActions, setAdminActions] = useState<Action[]>([
    {
      name: PermissionEnum.RegisterManufacturer,
      method: adminService.registerManufacturer,
      loading: false,
    },
    {
      name: PermissionEnum.RegisterRegulatoryAgency,
      method: adminService.registerRegulatoryAgency,
      loading: false,
    },
    {
      name: PermissionEnum.RegisterDistributer,
      method: adminService.registerDistributer,
      loading: false,
    },
    {
      name: PermissionEnum.RegisterWholesaler,
      method: adminService.registerWholesaler,
      loading: false,
    },
  ]);

  const getInitialInformation = async () => {
    const { provider } = window;
    if (provider) {
      const balance = await provider?.getBalance(account);
      const convertedBalance = balance?.toBigInt();
      const matic = formatUnits(convertedBalance);
      setBalance(matic);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getInitialInformation();
      getNfts();
    }
  }, []);

  const listenForCompletion = (actionName: PermissionEnum) => {
    createNotification({
      title: "Transaction confirmed!",
      message: "Your transaction is being processed. You'll be notified once it completes!",
    });
    getContract().once(getEventName(actionName), () => {
      createNotification({
        title: "Success!",
        message: `Successfully completed action to ${actionName}.`,
      });
    });
  };

  const getNfts = async () => {
    const items = await drugService.getAllDrugs();
    setLoading(false);
    if (items) {
      setDrugs(items);
    }
  };

  const getActionArrayWithLoadingValues = (actionName: PermissionEnum, loading: boolean) => {
    return adminActions.map((action) => {
      if (action.name === actionName) {
        return { ...action, loading };
      }
      return { ...action };
    });
  };

  const registerRole = async (
    actionName: PermissionEnum,
    registrationCall: (address: string) => Promise<void>,
    address: string
  ) => {
    setAdminActions(getActionArrayWithLoadingValues(actionName, true));
    await registrationCall(address);
    listenForCompletion(actionName);
    setAdminActions(getActionArrayWithLoadingValues(actionName, false));
  };

  return (
    <Wrapper title="Dashboard" account={account} balance={balance}>
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:flex md:flex-row gap-2 justify-between mb-4">
            {adminActions.map((action, idx) => (
              <div key={idx}>
                <RegisterAddress
                  text={action.name}
                  placeholder="Address..."
                  onClick={(address: string) => registerRole(action.name, action.method, address)}
                  loading={action.loading}
                ></RegisterAddress>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <LoadingWrapper loading={loading}>
              <div className="h-fill p-2 rounded-lg">
                {!drugs?.length || drugs?.length === 0 ? (
                  <NoDrugsPlaceholder account={account} />
                ) : (
                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {drugs?.map((drug: Drug) => (
                      <div className="m-2" key={drug.tokenId}>
                        <DrugCard drug={drug} account={account} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </LoadingWrapper>
          </div>
        </div>
      </main>
      <NotificationAlert
        show={showNotification}
        notification={notification}
        onClose={() => closeNotification()}
      ></NotificationAlert>
    </Wrapper>
  );
};

export default authenticatedRoute(DashboardView, PermissionEnum.ViewDashboard);
