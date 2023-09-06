import React, { useState } from "react";

import "./modal.css";

const SaleModal = ({ nftMarketplace, nftData, setShowModal }) => {
  const [price, setPrice] = useState(0);

  async function submitOnSale(token_id, price) {
    await nftMarketplace.addSale(token_id, price);
  }

  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <h6 className="text-center text-light">Listing</h6>

        <div className="nft__img">
          <img src={nftData.token.metadata.media} alt="" className="w-100" />
        </div>

        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>

        <div className="input__item mb-4">
          <input
            type="number"
            placeholder="0 NEAR"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button
          className="place__bid-btn"
          onClick={() => submitOnSale(nftData.token.token_id, price)}
        >
          Sale
        </button>
      </div>
    </div>
  );
};

export default SaleModal;
