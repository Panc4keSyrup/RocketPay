import React from "react";
import HeroSection from "../components/ui/HeroSection";

import LiveAuction from "../components/ui/Live-auction/LiveAuction";

import StepSection from "../components/ui/Step-section/StepSection";

const Home = ({ isSignedIn, nftMarketplace, wallet }) => {
  return (
    <div className="bodycontainer">
      <HeroSection />
      <LiveAuction
        isSignedIn={isSignedIn}
        nftMarketplace={nftMarketplace}
        wallet={wallet}
      />
      {/* <SellerSection /> */}
      {/* <Trending /> */}
      <StepSection />
    </div>
  );
};

export default Home;
