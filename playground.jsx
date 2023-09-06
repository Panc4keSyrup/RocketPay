import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nft-card.css";
import { NFTMarketplace } from "../../../near-interface";

const NftCard = ({ nftData, from = "market" }) => {
  const { owner_id, price, sale_id, token } = nftData;


    const [inputPrice, getPrice] = useState(0);
    const [transferId, getTransferId] = useState("");

    async function sellNft() {
      var input = parseFloat(prompt("Please enter the price", "price"));
      input.addEventListener("change", function(e){getPrice(e.target.value)});
      if (input != null) {
      await NFTMarketplace.addSale(
        token.token_id,
        inputPrice
      );
      }
    }

    async function transfer() {
      var input = prompt("Enter the receiver Id", "...");
      input.addEventListener("change", function(e){getTransferId(e.target.value)});
      if (input != null) {
        await NFTMarketplace.nftTransfer(
          transferId,
          token.token_id,
          0,
          ""
        )  
      }
    }

    async function remove_sale() {
      await NFTMarketplace.removeSale(
        sale_id
      )
    }
    
  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={token.metadata.media} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          {(() => {
            if (sale_id !== undefined && sale_id !== null) {
              return (
                <Link to={`/market/${sale_id}`}>{token.metadata.title}</Link>
              );
            } else {
              return <p>{token.metadata.title}</p>;
            }
          })()}
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            {(() => {
              if (owner_id !== undefined && owner_id !== null) {
                return (
                  <div>
                    <h6>Created By</h6>
                    <p>{token.owner_id}</p>
                  </div>
                );
              }
            })()}

            {(() => {
              if (price !== undefined && price !== null) {
                return (
                  <div>
                    <h6>Price</h6>
                    <p>{price} NEAR</p>
                  </div>
                );
              }
            })()}
          </div>
        </div>

        <div className=" mt-3 d-flex align-items-center justify-content-between">
          {(() => {
            if (from === "minting") {
              return (
                <button className="bid__btn d-flex align-items-center gap-1">
                  <i class="ri-shopping-bag-line"></i> Mint
                </button>
              );
            } else if (from === "market") {
              return (
                <button className="bid__btn d-flex align-items-center gap-1">
                  <i class="ri-shopping-bag-line"></i> Buy
                </button>
              );
            } 
            else if (from === "profile") {
              return (
                <div id="multibutton">
                <button className="bid__btn d-flex align-items-center gap-1" id="sell" onClick={() => { sellNft(); }}>
                  <i class="ri-shopping-bag-line" ></i> Sale
                </button>

                <button className="bid__btn d-flex align-items-center gap-1" id="sell" onClick={() => { transfer(); }}>
                <i class="ri-shopping-bag-line" ></i> Transfer
                </button>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default NftCard;
