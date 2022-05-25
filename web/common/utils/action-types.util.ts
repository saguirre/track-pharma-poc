import {
  ArchiveIcon,
  BeakerIcon,
  CheckIcon,
  CurrencyDollarIcon,
  InboxInIcon,
  LibraryIcon,
  LocationMarkerIcon,
  SearchIcon,
  XIcon,
} from "@heroicons/react/solid";

export const actionTypes: { [key: string]: { icon: any; bgColorClass: string; bgHoverColor: string } } = {
  requestApproval: { icon: SearchIcon, bgColorClass: "bg-gray-400", bgHoverColor: "hover:bg-gray-300" },
  approveDrug: { icon: CheckIcon, bgColorClass: "bg-green-500", bgHoverColor: "hover:bg-green-400" },
  declineDrug: { icon: XIcon, bgColorClass: "bg-red-500", bgHoverColor: "hover:bg-red-400" },
  markAsManufactured: { icon: BeakerIcon, bgColorClass: "bg-violet-400", bgHoverColor: "hover:bg-violet-300" },
  markAsInTransitToDistributer: {
    icon: LocationMarkerIcon,
    bgColorClass: "bg-blue-400",
    bgHoverColor: "hover:bg-blue-300",
  },
  markAsInDistributerFacility: {
    icon: ArchiveIcon,
    bgColorClass: "bg-yellow-600",
    bgHoverColor: "hover:bg-yellow-500",
  },
  markAsInTransitToWholesaler: {
    icon: LocationMarkerIcon,
    bgColorClass: "bg-blue-400",
    bgHoverColor: "hover:bg-blue-300",
  },
  markAsDeliveredToWholesaler: { icon: InboxInIcon, bgColorClass: "bg-cyan-400", bgHoverColor: "hover:bg-cyan-300" },
  markAsInWholesalerWarehouse: {
    icon: LibraryIcon,
    bgColorClass: "bg-yellow-600",
    bgHoverColor: "hover:bg-yellow-500",
  },
  markAsReadyForSale: { icon: CurrencyDollarIcon, bgColorClass: "bg-violet-400", bgHoverColor: "hover:bg-violet-300" },
  markAsSold: { icon: CheckIcon, bgColorClass: "bg-green-500", bgHoverColor: "hover:bg-green-400" },
};
