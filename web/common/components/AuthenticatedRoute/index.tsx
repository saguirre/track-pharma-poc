import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { PermissionEnum } from "@enums";
import { AppContext, ContractServiceContext } from "@contexts";
import { LoadingWrapper } from "@components/LoadingWrapper";

export const authenticatedRoute = (Component: React.FC<any>, permission: PermissionEnum) => {
  return (props: any) => {
    const router = useRouter();
    const [loadingAuth, setLoadingAuth] = useState(true);
    const { authorizationService } = useContext(AppContext);
    const { getContract } = useContext(ContractServiceContext);
    const address = getCookie("address") as string;
    let hasPermission = false;
    if (getContract()) {
      const checkForRole = async (address: string, permission: PermissionEnum) => {
        setLoadingAuth(true);
        if (address) {
          hasPermission = await authorizationService.userHasPermission(address, permission);
        }
        if (!hasPermission) {
          router.push({
            pathname: "/",
            query: "unauthorized",
          });
        }

        setLoadingAuth(false);
      };

      useEffect(() => {
        checkForRole(address, permission);
      }, []);
    }
    return (
      <LoadingWrapper loading={loadingAuth}>
        <Component {...props}></Component>
      </LoadingWrapper>
    );
  };
};
