import { mapSupplyChainStatusToEnumValues, SupplyChainStatusEnum } from "@enums";
import { Drug, SupplyChainTimelineItem } from "@models";
import { useState } from "react";

import {
  CheckIcon,
  QuestionMarkCircleIcon,
  BeakerIcon,
  LocationMarkerIcon,
  ArchiveIcon,
  InboxInIcon,
  LibraryIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/solid";

const eventTypes: { [key: string]: { icon: any; bgColorClass: string } } = {
  pendingManufacturing: { icon: QuestionMarkCircleIcon, bgColorClass: "bg-amber-400" },
  manufactured: { icon: BeakerIcon, bgColorClass: "bg-violet-400" },
  inTransitToDistributer: { icon: LocationMarkerIcon, bgColorClass: "bg-blue-400" },
  atDistributerFacility: { icon: ArchiveIcon, bgColorClass: "bg-yellow-600" },
  inTransitToWholesaler: { icon: LocationMarkerIcon, bgColorClass: "bg-blue-400" },
  deliveredToWholesaler: { icon: InboxInIcon, bgColorClass: "bg-cyan-400" },
  atWholesalerFacility: { icon: LibraryIcon, bgColorClass: "bg-yellow-600" },
  readyForSale: { icon: CurrencyDollarIcon, bgColorClass: "bg-violet-400" },
  sold: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};

export const useSupplyChainTimeline = () => {
  const [supplyChainTimeline, setSupplyChainTimeline] = useState<SupplyChainTimelineItem[]>([
    {
      id: 1,
      type: eventTypes.pendingManufacturing,
      content: "Still not",
      target: SupplyChainStatusEnum.PendingManufacturing,
      date: "Sep 20",
      dateTime: "2020-09-20",
      fulfilled: true,
    },
    {
      id: 2,
      type: eventTypes.manufactured,
      content: "Still not",
      target: SupplyChainStatusEnum.Manufactured,
      date: "Sep 22",
      dateTime: "2020-09-22",
      fulfilled: false,
    },
    {
      id: 3,
      type: eventTypes.inTransitToDistributer,
      content: "Still not",
      target: SupplyChainStatusEnum.InTransitToDistributer,
      date: "Sep 28",
      dateTime: "2020-09-28",
      fulfilled: false,
    },
    {
      id: 4,
      type: eventTypes.atDistributerFacility,
      content: "Still not",
      target: SupplyChainStatusEnum.AtDistributerFacility,
      date: "Sep 30",
      dateTime: "2020-09-30",
      fulfilled: false,
    },
    {
      id: 5,
      type: eventTypes.inTransitToWholesaler,
      content: "Still not",
      target: SupplyChainStatusEnum.InTransitToWholesaler,
      date: "Oct 4",
      dateTime: "2020-10-04",
      fulfilled: false,
    },
    {
      id: 6,
      type: eventTypes.deliveredToWholesaler,
      content: "Still not",
      target: SupplyChainStatusEnum.DeliveredToWholesaler,
      date: "Oct 4",
      dateTime: "2020-10-04",
      fulfilled: false,
    },
    {
      id: 7,
      type: eventTypes.atWholesalerFacility,
      content: "Still not",
      target: SupplyChainStatusEnum.AtWholesalerFacility,
      date: "Oct 4",
      dateTime: "2020-10-04",
      fulfilled: false,
    },
    {
      id: 8,
      type: eventTypes.readyForSale,
      content: "Still not",
      target: SupplyChainStatusEnum.ReadyForSale,
      date: "Oct 4",
      dateTime: "2020-10-04",
      fulfilled: false,
    },
    {
      id: 9,
      type: eventTypes.sold,
      content: "Still not",
      target: SupplyChainStatusEnum.Sold,
      date: "Oct 4",
      dateTime: "2020-10-04",
      fulfilled: false,
    },
  ]);

  const updateSupplyChainTimeline = (drug: Drug) => {
    let i = 0;

    i = 0;
    while (i < supplyChainTimeline.length) {
      supplyChainTimeline[i].fulfilled = true;
      if (supplyChainTimeline[i].target == mapSupplyChainStatusToEnumValues[drug?.supplyChainStatus]) {
        break;
      }
      i++;
    }
    setSupplyChainTimeline([...supplyChainTimeline]);
  };

  return { supplyChainTimeline, updateSupplyChainTimeline };
};
