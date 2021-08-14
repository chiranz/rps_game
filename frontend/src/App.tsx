import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { joinClasses } from "./helpers";

function App() {
  return (
    <div
      className={joinClasses(
        "grid",
        "grid-rows-3m",
        "min-h-screen",
        "max-w-4xl",
        "mx-auto",
        "text-center"
      )}
    >
      <Navbar />
      <div>Body here</div>
      <Footer />
    </div>
  );
}

export default App;
