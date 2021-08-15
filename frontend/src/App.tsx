import React from "react";
import Footer from "./components/layout/Footer";
import Leaderboard from "./components/Leaderboard";
import Navbar from "./components/layout/Navbar";
import { joinClasses } from "./helpers";
import Playground from "./components/Playground";
import { WalletProvider } from "./context/WalletContext";
import { MessageProvider } from "./context/MessageContext";

function App() {
  return (
    <WalletProvider>
      <MessageProvider>
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

          <div>
            <Leaderboard />
            <Playground />
          </div>
          <Footer />
        </div>
      </MessageProvider>
    </WalletProvider>
  );
}

export default App;
