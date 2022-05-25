import { ButtonSpinner } from "@components";
import { Action } from "@models";
import { classNames } from "@utils";

interface ActionButtonProps {
  action: Action;
  actionIdx: number;
  onClick: (action: Action, actionIdx: number) => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ action, actionIdx, onClick }) => {
  return (
    <button
      key={`${action.name + actionIdx}`}
      className={classNames(
        action.type?.bgColorClass,
        action.type?.bgHoverColor,
        "flex flex-row mt-1 gap-2 text-sm items-center py-2 px-3 rounded-xl text-white"
      )}
      onClick={() => onClick(action, actionIdx)}
    >
      {action.loading ? (
        <ButtonSpinner text="Confirming transaction..."></ButtonSpinner>
      ) : (
        <>
          {action.name}
          {action?.type ? <action.type.icon className="h-4 w-4"></action.type.icon> : null}
        </>
      )}
    </button>
  );
};
