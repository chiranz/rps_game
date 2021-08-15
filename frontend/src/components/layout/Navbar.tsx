import React, { ReactElement } from "react";
import { joinClasses } from "../../helpers";
import Button from "../Button";
import GlobalMessage from "../GlobalMessage";

export default function Navbar(): ReactElement {
  const handleConnect = async () => {
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      await ethereum.request({ method: "eth_requestAccounts" });
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x4" }],
        });
      } catch (err: any) {
        console.log(err.message);
      }
    }
  };
  return (
    <React.Fragment>
      <div
        className={joinClasses(
          "py-4",
          "border-b-2",
          "flex",
          "justify-between",
          "items-center"
        )}
      >
        <div id="brand" className="inline-flex">
          <svg
            width="25"
            height="25"
            viewBox="0 0 256 417"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
          >
            <path
              fill="#2298bd"
              d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
            />
            <path
              fill="#0ed7b5"
              d="M127.962 0L0 212.32l127.962 75.639V154.158z"
            />
            <path
              fill="#2298bd"
              d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"
            />
            <path fill="#0ed7b5" d="M127.962 416.905v-104.72L0 236.585z" />
            <path
              fill="#1a7e9c"
              d="M127.961 287.958l127.96-75.637-127.96-58.162z"
            />
            <path fill="#2298bd" d="M0 212.32l127.96 75.638v-133.8z" />
          </svg>
          <h2 className="ml-4 text-lg font-medium">RPS Game</h2>
        </div>
        <ul id="nav-links" className="inline-flex">
          <li>
            <Button color="success" onClick={handleConnect}>
              Connect
            </Button>
          </li>
        </ul>
      </div>
      <GlobalMessage />
    </React.Fragment>
  );
}
