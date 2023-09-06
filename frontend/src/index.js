import React from "react";
import ReactDOM from "react-dom";

import { HashRouter } from "react-router-dom";

import { initContract } from './services/utils'

import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import App from "./App";
import { NFTMarketplace } from "./near-interface";
import { Wallet } from "./near-wallet";

const wallet = new Wallet({ createAccessKeyFor: process.env.REACT_APP_CONTRACT_NAME });
const nftMarketplace = new NFTMarketplace({
  contractId: process.env.REACT_APP_CONTRACT_NAME,
  wallet,
});

window.nearSteps = []
window.nearInitPromise = initContract()
  .then(() => {
    console.log("Pool init success")
  })
  .catch(console.error)

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();

  ReactDOM.render(
    <React.StrictMode>
      <HashRouter>
        <App
          isSignedIn={isSignedIn}
          nftMarketplace={nftMarketplace}
          wallet={wallet}
        />
      </HashRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
};
