import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { joinClasses } from "./helpers";
import Game from "./components/Game";
import DeployedContracts from "./components/DeployedContracts";
import { useRPSGameFactory } from "./context/RPSGameFactoryContext";
import { useWallet } from "./context/WalletContext";
import { getProvider } from "./provider";

function App() {
  const { walletAddress, setWalletAddress } = useWallet();
  const { selectedGameAddress } = useRPSGameFactory();
  React.useEffect(() => {
    async function init() {
      try {
        const _provider = await getProvider();
        const network = await _provider.getNetwork();
        const { chainId } = network;
        if (chainId === 4 && setWalletAddress) {
          const signer = _provider.getSigner();
          setWalletAddress(await signer.getAddress());
        }
      } catch (err) {
        console.log(err);
      }
    }
    init();
  }, [setWalletAddress]);
  return (
    <Router>
      <div
        className={joinClasses(
          "grid",
          "grid-rows-3m",
          "min-h-screen",
          "max-w-4xl",
          "mx-auto",
          "text-center",
          "text-gray-600",
          "font-mono"
        )}
      >
        <Navbar />

        <div className="h-full">
          <Switch>
            <Route exact path="/">
              <DeployedContracts />
            </Route>
            <Route exact path="/game">
              {walletAddress && selectedGameAddress ? (
                <Game />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
