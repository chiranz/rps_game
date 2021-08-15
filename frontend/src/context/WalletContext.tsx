import React, { ReactNode } from "react";

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
