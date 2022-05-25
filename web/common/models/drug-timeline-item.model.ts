import { DrugStatusEnum, SupplyChainStatusEnum } from "@enums";

export interface TimelineItem {
  id: number;
  content: string;
  date: string;
  dateTime: string;
  fulfilled: boolean;
}

export interface DrugTimelineItem extends TimelineItem {
  target: DrugStatusEnum;
  type: any;
}

export interface SupplyChainTimelineItem extends TimelineItem {
  target: SupplyChainStatusEnum;
  type: any;
}
