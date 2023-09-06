import { utils } from "near-api-js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import BuyWithVisaModal from "../Modal/BuyWithVisaModal";
import BuyWithWalletModal from "../Modal/BuyWithWalletModal";
import RemoveSaleModal from "../Modal/RemoveSaleModal";

import SaleModal from "../Modal/SaleModal";
import TransferModal from "../Modal/TransferModal";
import "./nft-card.css";

const NftCard = ({
  isSignedIn,
  nftMarketplace,
  wallet,
  nftData,
  from = "market",
}) => {
  const { owner_id, price, sale_id, token } = nftData;
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showRemoveSaleModal, setShowRemoveSaleModal] = useState(false);
  const [showBuyWithWalletModal, setShowBuyWihWalletModal] = useState(false);
  const [showBuyWithVisaModal, setShowBuyWithVisaModal] = useState(false);
  const [showTransferModal, setTransferShowModal] = useState(false);

  return (
    <>
      <div className="single__nft__card" key={sale_id}>
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
                      <h6>Owner</h6>
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
                      <p>{utils.format.formatNearAmount(price)} NEAR</p>
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
                    <i className="ri-shopping-bag-line"></i> Mint
                  </button>
                );
              } else if (from === "market") {
                return (
                  <>
                    <button
                      className="bid__btn d-flex align-items-center gap-1"
                      onClick={() => setShowBuyWihWalletModal(true)}
                    >
                      <i className="ri-shopping-bag-line"></i> Buy
                    </button>
                    <button
                      className="bid__btn d-flex align-items-center gap-1"
                      onClick={() => setShowBuyWithVisaModal(true)}
                    >
                      <i className="ri-visa-fill"></i> Buy with visa
                    </button>
                  </>
                );
              } else if (from === "profile") {
                if (token.metadata.is_on_sale) {
                  return (
                    <button
                      className="bid__btn d-flex align-items-center gap-1"
                      onClick={() => setShowRemoveSaleModal(true)}
                    >
                      <i className="ri-arrow-go-back-fill"></i> Remove sale
                    </button>
                  );
                } else {
                  return (
                    <>
                      <button
                        className="bid__btn d-flex align-items-center gap-1"
                        onClick={() => setShowSaleModal(true)}
                      >
                        <i className="ri-shopping-bag-line"></i> Sale
                      </button>
                      <button
                        className="bid__btn d-flex align-items-center gap-1"
                        onClick={() => {
                          setTransferShowModal(true);
                        }}
                      >
                        <i class="ri-user-shared-fill"></i> Transfer
                      </button>
                    </>
                  );
                }
              }
            })()}
          </div>
        </div>
      </div>

      {showSaleModal && (
        <SaleModal
          nftMarketplace={nftMarketplace}
          nftData={nftData}
          setShowModal={setShowSaleModal}
        />
      )}
      {showRemoveSaleModal && (
        <RemoveSaleModal
          nftMarketplace={nftMarketplace}
          nftData={nftData}
          setShowModal={setShowRemoveSaleModal}
        />
      )}
      {showBuyWithWalletModal && (
        <BuyWithWalletModal
          nftMarketplace={nftMarketplace}
          nftData={nftData}
          isSignedIn={isSignedIn}
          wallet={wallet}
          setShowModal={setShowBuyWihWalletModal}
        />
      )}
      {showBuyWithVisaModal && (
        <BuyWithVisaModal
          nftMarketplace={nftMarketplace}
          nftData={nftData}
          setShowModal={setShowBuyWithVisaModal}
        />
      )}
      {showTransferModal && (
        <TransferModal
          nftMarketplace={nftMarketplace}
          nftData={nftData}
          setTransferShowModal={setTransferShowModal}
        />
      )}
    </>
  );
};

export default NftCard;
