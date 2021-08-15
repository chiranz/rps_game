import React, { ReactNode } from "react";

interface GlobalContextProps {
  walletAddress?: string;
  globalMessage?: GlobalMessage;
  setWalletAddress?: React.Dispatch<React.SetStateAction<string>>;
  setGlobalMessage?: React.Dispatch<React.SetStateAction<GlobalMessage>>;
}

type ProviderProps = {
  children: ReactNode;
};

interface GlobalMessage {
  type?: "success" | "error" | "info" | "warning";
  message?: string;
}
export const GlobalContext = React.createContext<GlobalContextProps>({});

export const GlobalProvider = ({ children }: ProviderProps) => {
  const [walletAddress, setWalletAddress] = React.useState<string>("");
  const [globalMessage, setGlobalMessage] = React.useState<GlobalMessage>({});
  return (
    <GlobalContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        globalMessage,
        setGlobalMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
