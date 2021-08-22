import React, { ReactNode } from "react";
interface Transaction {
  pending: boolean;
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
}
const TransactionContext = React.createContext<Transaction>({
  pending: false,
  setPending: () => {},
});
type ProviderProps = {
  children: ReactNode;
};

export const TransactionProvider = ({ children }: ProviderProps) => {
  const [pending, setPending] = React.useState(false);
  return (
    <TransactionContext.Provider value={{ pending, setPending }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => React.useContext(TransactionContext);
