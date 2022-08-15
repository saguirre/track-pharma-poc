import { setCookies } from "cookies-next";
import { useEffect, useState } from "react";

export const useMetamaskConnection = (callback: (account: string) => void) => {
  const [error, setError] = useState("");
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      setError("");
      const { ethereum } = window;
      setConnecting(true);
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setConnecting(false);
      setCookies("address", accounts?.[0]);
      callback(accounts?.[0]);
    } catch (error: any) {
      handleError(error);
    } finally {
      setConnecting(false);
    }
  };

  const handleError = (error: any) => {
    if (error.code === 4001) {
      setError("Login was canceled.");
    }
    console.error(error);
  };

  const checkWalletConnection = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.error("No wallet connected");
      return;
    }
  };

  useEffect(() => {
    checkWalletConnection();
  });

  const connect = (): void => {
    handleConnect();
  };

  return { connect, connecting, error };
};
