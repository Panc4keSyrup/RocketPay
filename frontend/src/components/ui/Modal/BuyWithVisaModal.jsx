import React, { useEffect, useRef } from "react";
import { utils } from "near-api-js";

import useForm from "../../Payment/UseForm";
import "./modal.css";

const BuyWithVisaModal = ({ nftMarketplace, nftData, setShowModal }) => {
  const formElement = useRef(null);
  // You can skip useEffect if you're not using TailwindCSS
  // Otherwise, for the production usage refer to https://tailwindcss.com/docs/installation

  useEffect(() => {
    if (formElement.current) {
      formElement.current.focus();
    }
    console.log({ formElement });
    if (document) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href =
        "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css";

      document.head.appendChild(stylesheet);
    }
  }, []);

  const { handleSubmit, status, message, endPointUrl } = useForm({
    formElement: formElement.current,
  });

  if (status === "success") {
    return (
      <>
        <div className="text-2xl">Thank you!</div>
        <div className="text-md">{message}</div>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <div className="text-2xl">Something bad happened!</div>
        <div className="text-md">{message}</div>
      </>
    );
  }

  console.log(nftData);

  return (
    <form
      action={endPointUrl}
      onSubmit={handleSubmit}
      method="POST"
      target="_blank"
      ref={formElement}
      className="App-order"
    >
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
            <i
              className="ri-close-line"
              onClick={() => setShowModal(false)}
            ></i>
          </span>

          <div className="input__item mb-4">
            <input
              type="text"
              placeholder="Your name"
              name="buyer_fullname"
              required
            />
          </div>
          <div className="input__item mb-4">
            <input
              type="email"
              placeholder="Email"
              name="buyer_email"
              required
            />
          </div>
          <div className="input__item mb-4">
            <input
              type="text"
              placeholder="Your phone"
              name="buyer_mobile"
              required
            />
            <input
              type="hidden"
              name="order_description"
              value={nftData.token.metadata.title}
            />
            <input
              type="hidden"
              name="affiliate_code"
              value={utils.format.formatNearAmount(nftData.price)}
            />
            <input
              type="hidden"
              name="order_code"
              value={nftData.sale_id}
            />
          </div>

          {status !== "loading" && (
            <div className="mb-3 pt-0">
              <button className="place__bid-btn" type="submit">
                Buy
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default BuyWithVisaModal;
