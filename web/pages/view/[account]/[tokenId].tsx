import { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import _ from "lodash";

import {
  authenticatedRoute,
  ButtonSpinner,
  DrugTimeline,
  DrugView,
  LoadingWrapper,
  NotificationAlert,
  SupplyChainTimeline,
  Wrapper,
} from "@components";
import { AppContext, ContractServiceContext } from "@contexts";
import { PermissionEnum, RoleEnum } from "@enums";
import { useDrugTimeline, useNotification, useSupplyChainTimeline } from "@hooks";
import { Action, Drug, drugInitialState, Permission } from "@models";
import { UserRole } from "@services";
import { classNames, getEventName } from "@utils";

const ViewTokenPage: NextPage = () => {
  const router = useRouter();
  const account = router.query?.account as string;
  const tokenId = router.query?.tokenId as string;
  const { getContract } = useContext(ContractServiceContext);
  const { authorizationService, drugService } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<RoleEnum[]>();
  const [drug, setDrug] = useState<Drug>(drugInitialState);
  const [actions, setActions] = useState<Action[]>();
  const { drugTimeline, updateDrugTimeline } = useDrugTimeline();
  const { supplyChainTimeline, updateSupplyChainTimeline } = useSupplyChainTimeline();
  const { createNotification, notification, showNotification, closeNotification } = useNotification();

  const getData = async () => {
    const drug = await drugService.getDrugInfo(tokenId);
    setDrug(drug);
    setLoading(false);
  };

  const getRoles = async () => {
    const userRoles = await authorizationService.getRoles(account);
    const roles = userRoles
      .filter((userRole: UserRole) => userRole.active && userRole.role !== RoleEnum.Admin)
      .map((userRole: UserRole) => userRole.role);
    setRoles(roles);
  };

  const getActions = (drug: Drug) => {
    let permissions: Permission[] = [];
    if (roles) {
      for (const role of roles) {
        authorizationService.getRolePermissions(role).forEach((newPermission) => {
          if (!permissions.some((permission) => permission.name == newPermission.name)) {
            permissions.push(newPermission);
          }
        });
      }
      const actions = drugService.getActionsForPermissions(drug, permissions);
      setActions(actions);
    }
  };

  const listenForCompletion = (action: Action) => {
    createNotification({
      title: "Transaction confirmed!",
      message: "Your transaction is being processed. You'll be notified once it completes!",
    });
    getContract()?.once(getEventName(action.name), () => {
      createNotification({
        title: "Transaction completed!",
        message: "Your transaction to " + action.name + " was completed successfully!",
      });
      getData();
    });
  };

  const handleAction = async (action: Action, actionIdx: number) => {
    try {
      if (actions) {
        actions[actionIdx].loading = true;
        setActions([...actions]);
        await action.method(tokenId);
        listenForCompletion(action);
      }
    } catch (error: any) {
      if (error.code == 4001) {
        createNotification({ title: "Error", message: "Transaction rejected by User", isError: true });
      }
    } finally {
      if (actions) {
        actions[actionIdx].loading = false;
        setActions([...actions]);
      }
    }
  };

  const updateTimelines = (drug: Drug) => {
    updateDrugTimeline(drug);
    updateSupplyChainTimeline(drug);
  };

  useEffect(() => {
    if (router.isReady) {
      getData();
    }
  }, []);

  useEffect(() => {
    getRoles();
  }, [drug]);

  useEffect(() => {
    getActions(drug);
    updateTimelines(drug);
  }, [roles]);

  return (
    <Wrapper title="View Drug" showBackButton={true} account={account} balance={""}>
      <main className="-mt-32">
        <div className="max-w-screen-2xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <section aria-labelledby="section-1-title">
                <h2 className="sr-only text-black" id="section-1-title">
                  Drug
                </h2>
                <DrugView
                  account={account}
                  actions={actions}
                  onActionClick={(action: Action, actionIdx: number) => handleAction(action, actionIdx)}
                  drug={drug}
                  loading={loading}
                />
              </section>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
              <section aria-labelledby="section-2-title">
                <h2 className="sr-only" id="section-2-title">
                  Drug Timeline
                </h2>
                <DrugTimeline drugTimeline={drugTimeline} />
                <SupplyChainTimeline supplyChainTimeline={supplyChainTimeline} />
              </section>
            </div>
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

export default authenticatedRoute(ViewTokenPage, PermissionEnum.ViewDrug);
