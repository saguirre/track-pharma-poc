import Image from "next/image";

import { ActionButton, ButtonSpinner, Card, LoadingWrapper, SubtitleLink, TextInfo } from "@components";
import { Action, Drug } from "@models";
import { classNames } from "@utils";
import { DrugViewBlock } from "@components/DrugViewBlock";
import { DrugViewInfo } from "@components/DrugViewInfo";

interface DrugViewProps {
  account: string;
  drug: Drug;
  loading: boolean;
  actions: Action[] | undefined;
  onActionClick: (action: Action, actionIdx: number) => void;
}
export const DrugView: React.FC<DrugViewProps> = ({ account, actions, drug, onActionClick, loading }) => {
  return (
    <Card>
      <div className="flex flex-row">
        <LoadingWrapper loading={loading}>
          <div className="flex flex-col px-4 w-auto h-full">
            {drug?.imageUrl && <Image src={drug?.imageUrl || ""} width={480} height={525} />}
          </div>
          <div className="flex flex-col w-1/2">
            <div className="flex flex-row justify-between">
              <h1 className="text-slate-600 text-3xl font-bold">{drug?.name}</h1>
            </div>
            <SubtitleLink text="View Owner on Etherscan" account={account} />
            <DrugViewBlock title="Active Ingredients">
              <TextInfo
                text={
                  drug?.activeIngredients?.length
                    ? drug?.activeIngredients?.join(". ")
                    : "No Active ingredients listed."
                }
              />
            </DrugViewBlock>
            <DrugViewBlock title="Information">
              <div className="flex flex-row justify-between pr-8">
                <DrugViewInfo title="Dosage Form" text={drug?.dosageForm} />
                <DrugViewInfo title="Route" text={drug?.route} />
                <DrugViewInfo title="Strength" text={drug?.strength} />
              </div>
            </DrugViewBlock>
            <DrugViewBlock title="Actions">
              <div className="flex flex-row gap-2 items-center">
                {actions?.length !== 0 ? (
                  actions?.map((action: any, actionIdx: number) => (
                    <ActionButton
                      onClick={(action: Action, actionIdx: number) => onActionClick(action, actionIdx)}
                      action={action}
                      actionIdx={actionIdx}
                    />
                  ))
                ) : (
                  <span className="text-xs text-gray-500">No Actions available.</span>
                )}
              </div>
            </DrugViewBlock>
          </div>
        </LoadingWrapper>
      </div>
    </Card>
  );
};
