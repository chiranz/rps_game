import { JsonRpcProvider } from "@ethersproject/providers";
import React, { ReactNode } from "react";
import { getProvider } from "../provider";

interface WalletProps {
  walletAddress?: string;
  setWalletAddress?: React.Dispatch<React.SetStateAction<string>>;
}

type ProviderProps = {
  children: ReactNode;
};

const WalletContext = React.createContext<WalletProps>({});

export const WalletProvider = ({ children }: ProviderProps) => {
  const [walletAddress, setWalletAddress] = React.useState<string>("");
  const [provider, setProvider] = React.useState<JsonRpcProvider>();
  React.useEffect(() => {
    async function init() {
      const _provider = await getProvider();
      setProvider(_provider);
    }
    init();
  }, []);
  if (provider) {
    console.log(provider);
    provider.on("accountChanged", (address) => {
      console.log(address);
    });
  }
  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => React.useContext(WalletContext);
