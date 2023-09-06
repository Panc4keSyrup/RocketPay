import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import NganLuongCallback from "../components/Payment/NganLuongCallback";
import NganLuongNotify from "../components/Payment/NganLuongNotify";
import Order from "../components/Payment/Order";
import Payment from "../components/Payment/Payment";
import Collectible from "../pages/Collectible";
import Contact from "../pages/Contact";
import Create from "../pages/Create";
import Home from "../pages/Home";
import Market from "../pages/Market";
import NftDetails from "../pages/NftDetails";
import Profile from "../pages/Profile";
import SellerProfile from "../pages/SellerProfile";
import VisaCard from "../pages/VisaCard";
import Wallet from "../pages/Wallet";

const Routers = ({ isSignedIn, nftMarketplace, wallet }) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="/home"
        element={
          <Home
            isSignedIn={isSignedIn}
            nftMarketplace={nftMarketplace}
            wallet={wallet}
          />
        }
      />
      <Route
        path="/market"
        element={
          <Market
            isSignedIn={isSignedIn}
            nftMarketplace={nftMarketplace}
            wallet={wallet}
          />
        }
      />
      <Route
        path="/create"
        element={
          <Create
            isSignedIn={isSignedIn}
            nftMarketplace={nftMarketplace}
            wallet={wallet}
          />
        }
      />
      <Route path="/contact" element={<Contact />} />
      <Route path="/sellerprofile" element={<SellerProfile />} />
      <Route
        path="/profile"
        element={
          <Profile
            isSignedIn={isSignedIn}
            nftMarketplace={nftMarketplace}
            wallet={wallet}
          />
        }
      />

      <Route path="/collectible" element={<Collectible />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/visacard" element={<VisaCard />} />
      <Route path="/market/:id" element={<NftDetails />} />
      <Route path="/order" element={<Order />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/nlcallback" element={<NganLuongCallback />} />
      <Route path="/nlnotify" element={<NganLuongNotify />} />
    </Routes>
  );
};

export default Routers;
