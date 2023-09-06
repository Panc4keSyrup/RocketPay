import { utils } from "near-api-js";
import React from "react";

import "./modal.css";

const RemoveSaleModal = ({ nftMarketplace, nftData, setShowModal }) => {
  console.log(nftData);

  async function subbitOnRemoveSale(sale_id) {
    await nftMarketplace.removeSale(sale_id);
  }

  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <h6 className="text-center text-light">Unlisting</h6>

        <div className="nft__img">
          <img src={nftData.token.metadata.media} alt="" className="w-100" />
        </div>

        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>

        <h5 className="nft__title">
          <p>{nftData.token.metadata.title}</p>
        </h5>

        <div>
          <p>
            Current listing price:{" "}
            {utils.format.formatNearAmount(nftData.price)} NEAR
          </p>
        </div>
        <button
          className="place__bid-btn"
          onClick={() => subbitOnRemoveSale(nftData.sale_id)}
        >
          Unlist
        </button>
      </div>
    </div>
  );
};

export default RemoveSaleModal;
