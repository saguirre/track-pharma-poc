import { ButtonSpinner } from "@components";
import { useState } from "react";

interface RegisterAddressProps {
  text: string;
  placeholder: string;
  onClick: any;
  loading: boolean;
}

export const RegisterAddress: React.FC<RegisterAddressProps> = ({ text, placeholder, onClick, loading }) => {
  const [address, setAddress] = useState<string>("");
  return (
    <div className="flex flex-row items-center w-fill">
      <input 
        className="bg-white text-slate-500 w-28 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-violet-600 focus:ring-violet-200  placeholder:text-slate-500 placeholder:font-light placeholder:text-sm rounded-lg px-3 py-2 mr-3"
        placeholder={placeholder}
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />
      <button
        type="button"
        onClick={() => onClick(address)}
        className="rounded-xl w-fill py-3 px-3 hover:bg-violet-400 bg-violet-500 text-white text-sm font-regular h-fill"
      >
        {loading ? <ButtonSpinner text="Registering..."></ButtonSpinner> : <div>{text}</div>}
      </button>
    </div>
  );
};
