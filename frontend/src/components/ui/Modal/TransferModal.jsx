import React, { useState } from "react";
import "./modal.css";

const TransferModal = ({ nftMarketplace, nftData, setTransferShowModal }) => {
  const [transferToId, setTransferId] = useState("");
  async function transferNft(transferToId, token_id) {
      await nftMarketplace.nftTransfer(transferToId, token_id, 0, "");
  }

  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <h6 className="text-center text-light">Transfer NFT</h6>

        <div className="nft__img">
          <img src={nftData.token.metadata.media} alt="" className="w-100" />
        </div>

        <span className="close__modal">
          <i
            className="ri-close-line"
            onClick={() => setTransferShowModal(false)}
          ></i>
        </span>

        <div className="input__item mb-4">
          <input
            type="text"
            placeholder="Receiver ID"
            onChange={(e) => setTransferId(e.target.value)}
          />
        </div>

        <button
          className="place__bid-btn"
          onClick={() => transferNft(transferToId, nftData.token.token_id)}
        >
          Transfer
        </button>
      </div>
    </div>
  );
};

export default TransferModal;
