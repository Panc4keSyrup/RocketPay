import { utils } from "near-api-js";
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./modal.css";

const BuyWithWalletModal = ({
  nftMarketplace,
  isSignedIn,
  wallet,
  nftData,
  setShowModal,
}) => {
  async function handleBuyNFT(sale_id, price) {
    if (isSignedIn) {
      await nftMarketplace.buy(sale_id, price);
    } else {
      setShowModal(false)
      wallet.signIn();
    }
  }

  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <h6 className="text-center text-light">Buy with Visa</h6>

        <div className="nft__img">
          <img src={nftData.token.metadata.media} alt="" className="w-100" />
        </div>

        <h5 className="nft__title">
          <p>{nftData.token.metadata.title}</p>
        </h5>

        <div>
          <p>{utils.format.formatNearAmount(nftData.price)} NEAR</p>
        </div>
        <br />
        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <button
          className="place__bid-btn"
          onClick={() => handleBuyNFT(nftData.sale_id, nftData.price)}
        >
          Buy
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BuyWithWalletModal;
