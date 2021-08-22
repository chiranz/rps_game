import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { WalletProvider } from "./context/WalletContext";
import { MessageProvider } from "./context/MessageContext";
import { RPSGameFactoryProvider } from "./context/RPSGameFactoryContext";
import { TransactionProvider } from "./context/TransactionContext";

ReactDOM.render(
  <React.StrictMode>
    <MessageProvider>
      <WalletProvider>
        <TransactionProvider>
          <RPSGameFactoryProvider>
            <App />
          </RPSGameFactoryProvider>
        </TransactionProvider>
      </WalletProvider>
    </MessageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
