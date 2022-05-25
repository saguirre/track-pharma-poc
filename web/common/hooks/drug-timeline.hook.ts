import { useState } from "react";

import { DrugStatusEnum, mapDrugStatusToEnumValues } from "@enums";
import { Drug, DrugTimelineItem } from "@models";
import { LightBulbIcon, SearchIcon, CheckIcon, XIcon } from "@heroicons/react/solid";

const eventTypes: { [key: string]: { icon: any; bgColorClass: string } } = {
  created: { icon: LightBulbIcon, bgColorClass: "bg-violet-400" },
  approvalRequested: { icon: SearchIcon, bgColorClass: "bg-gray-400" },
  approved: { icon: CheckIcon, bgColorClass: "bg-green-500" },
  declined: { icon: XIcon, bgColorClass: "bg-red-500" },
};

export const useDrugTimeline = () => {
  const [drugTimeline, setDrugTimeline] = useState<DrugTimelineItem[]>([
    {
      id: 1,
      type: eventTypes.created,
      content: "",
      target: DrugStatusEnum.Created,
      date: "Sep 20",
      dateTime: "2020-09-20",
      fulfilled: true,
    },
    {
      id: 2,
      type: eventTypes.approvalRequested,
      content: "",
      target: DrugStatusEnum.ApprovalRequested,
      date: "Sep 22",
      dateTime: "2020-09-22",
      fulfilled: false,
    },
    {
      id: 3,
      type: eventTypes.approved,
      content: "",
      target: DrugStatusEnum.Approved,
      date: "Sep 28",
      dateTime: "2020-09-28",
      fulfilled: false,
    },
    {
      id: 4,
      type: eventTypes.declined,
      content: "",
      target: DrugStatusEnum.Declined,
      date: "Sep 28",
      dateTime: "2020-09-28",
      fulfilled: false,
    },
  ]);

  const updateDrugTimeline = (drug: Drug) => {
    let i = 0;
    while (i < drugTimeline.length) {
      drugTimeline[i].fulfilled = true;
      if (drugTimeline[i].target == mapDrugStatusToEnumValues[drug?.status]) {
        break;
      }
      i++;
    }
    setDrugTimeline([...drugTimeline]);
  };

  return { drugTimeline, updateDrugTimeline };
};
