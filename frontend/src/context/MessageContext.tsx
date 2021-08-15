import React, { ReactNode } from "react";

interface MessageProps {
  globalMessage?: GlobalMessage;
  setGlobalMessage?: React.Dispatch<React.SetStateAction<GlobalMessage>>;
}

type ProviderProps = {
  children: ReactNode;
};

interface GlobalMessage {
  type?: "success" | "error" | "info" | "warning";
  message?: string;
}
export const MessageContext = React.createContext<MessageProps>({});

export const MessageProvider = ({ children }: ProviderProps) => {
  const [globalMessage, setGlobalMessage] = React.useState<GlobalMessage>({});
  return (
    <MessageContext.Provider
      value={{
        globalMessage,
        setGlobalMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => React.useContext(MessageContext);
