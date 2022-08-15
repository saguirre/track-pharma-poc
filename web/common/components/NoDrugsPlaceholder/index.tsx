import { useRouter } from "next/router";

interface NoDrugsPlaceholderProps {
  account: string;
}

export const NoDrugsPlaceholder: React.FC<NoDrugsPlaceholderProps> = ({ account }) => {
  const router = useRouter();

  const goToMintScreen = (account: string) => {
    router.push({
      pathname: `/mint/${account}`,
    });
  };

  return (
    <div className="p-8 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No Drugs added yet</h3>
      <p className="mt-1 text-sm text-gray-500">Click Mint to add a new Drug.</p>
      <div className="mt-6">
        <button
          type="button"
          onClick={() => goToMintScreen(account)}
          className="inline-flex flex-row items-center gap-1 rounded-xl w-fill py-2 px-4 hover:bg-violet-400 bg-violet-500 text-white text-medium font-regular h-fill"
        >
          Mint new Drug
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};
