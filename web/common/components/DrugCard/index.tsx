import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

import { mapDrugStatusToEnumValues, mapSupplyChainStatusToEnumValues } from "@enums";
import { Drug } from "@models";
import { classNames, transformToCamelCase } from "@utils";

interface DrugCardProps {
  drug: Drug;
  account: string;
}

export const statusPills: { [key: string]: { textColorClass: string; bgColorClass: string } } = {
  created: { textColorClass: "text-violet-800", bgColorClass: "bg-violet-100" },
  approvalRequested: { textColorClass: "text-gray-800", bgColorClass: "bg-gray-100" },
  approved: { textColorClass: "text-green-800", bgColorClass: "bg-green-100" },
  declined: { textColorClass: "text-red-800", bgColorClass: "bg-red-100" },
  pendingManufacturing: { textColorClass: "text-amber-800", bgColorClass: "bg-amber-100" },
  manufactured: { textColorClass: "text-violet-800", bgColorClass: "bg-violet-100" },
  inTransitToDistributer: { textColorClass: "text-blue-800", bgColorClass: "bg-blue-100" },
  atDistributerFacility: { textColorClass: "text-yellow-800", bgColorClass: "bg-yellow-100" },
  inTransitToWholesaler: { textColorClass: "text-blue-800", bgColorClass: "bg-blue-100" },
  deliveredToWholesaler: { textColorClass: "", bgColorClass: "bg-cyan-100" },
  atWholesalerFacility: { textColorClass: "text-yellow-800", bgColorClass: "bg-yellow-100" },
  readyForSale: { textColorClass: "text-violet-800", bgColorClass: "bg-violet-100" },
  sold: { textColorClass: "text-green-800", bgColorClass: "bg-green-100" },
};

export const DrugCard: React.FC<DrugCardProps> = ({ drug, account }) => {
  const router = useRouter();
  const [loadingImage, setLoadingImage] = useState<boolean>(true);
  setTimeout(() => setLoadingImage(false), 500);

  const handleClick = () => {
    router.push({
      pathname: `/view/${account}/${drug.tokenId}`,
    });
  };

  return (
    <div
      className="flex flex-col border border-slate-200 justify-center items-center px-2 bg-white h-fill w-80 rounded-lg hover:cursor-pointer hover:drop-shadow-md"
      onClick={handleClick}
    >
      <div className=" pt-4 px-2 pb-2 h-fill">
        {loadingImage ? (
          <div style={{ width: 290, height: 290 }} className="bg-white rounded-lg flex justify-center items-center">
            <svg
              role="status"
              className="inline w-10 h-10 mr-2 text-white animate-spin fill-purple-700"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <Image src={drug.imageUrl} width={340} height={330} onLoad={() => setLoadingImage(false)} />
        )}
      </div>

      <div className="w-[95%] h-fill m-2 pb-2">
        <div className="flex flex-row justify-between">
          <label className="font-semibold text-sm text-slate-600">{drug.name}</label>
          <label className="text-sm mr-1 font-semibold text-slate-400">#{drug.tokenId}</label>
        </div>
        <div className="text-xs mt-0.5 mb-2 text-slate-400 font-regular">{drug.description}</div>
        <div className="flex flex-row justify-between">
          <span
            className={classNames(
              statusPills[transformToCamelCase(mapDrugStatusToEnumValues[drug.status])].bgColorClass,
              statusPills[transformToCamelCase(mapDrugStatusToEnumValues[drug.status])].textColorClass,
              "px-2 py-1 text-xs font-medium rounded-full"
            )}
          >
            {mapDrugStatusToEnumValues[drug.status]}
          </span>
          <span
            className={classNames(
              statusPills[transformToCamelCase(mapSupplyChainStatusToEnumValues[drug.supplyChainStatus])].bgColorClass,
              statusPills[transformToCamelCase(mapSupplyChainStatusToEnumValues[drug.supplyChainStatus])]
                .textColorClass,
              "px-2 py-1 text-xs font-medium rounded-full"
            )}
          >
            {mapSupplyChainStatusToEnumValues[drug.supplyChainStatus]}
          </span>
        </div>
        <div className="flex flex-row justify-start items-center text-slate-600 font-sm text-xs">
          <div className="flex flex-col mt-1 text-ellipsis overflow-x-clip">
            <label className="w-[100%] mr-2">Owned by:</label>
            <a
              className="text-xs font-extralight text-slate-600 text-ellipsis overflow-x-clip pr-2 pt-0.5 hover:underline"
              href={`https://mumbai.polygonscan.com/address/${drug.ownerAddress}`}
            >
              {drug.ownerAddress}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
