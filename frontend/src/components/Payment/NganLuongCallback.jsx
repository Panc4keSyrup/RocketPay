import CryptoJS from "crypto-js";
import { utils } from "near-api-js";
import fetch from "node-fetch";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from "../../AppContext";
import { buyNFTwithPool } from "../../services/contractUtils";
import { sendEmail } from "../../services/sendMail";
import "./order.css";

const NganLuongCallback = () => {
  const [isLoading, setLoading] = useState(true);
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  AppContext.token = token;

  function handleBuyNFTwithPool(sale_id, price, owner_email) {
    buyNFTwithPool(sale_id, price, owner_email)
      .then(() => {
        sendEmail(owner_email)
          .then(() => {
            setLoading(false);
            toast.success("The NFT has been purchased successfully! Please check your email", {
              position: toast.POSITION.BOTTOM_LEFT
            });
          }).catch((error) => {
            toast.error("Fail to send email", {
              position: toast.POSITION.BOTTOM_LEFT
            });
          })
      })
      .catch((error) => {
        toast.error("NFT buy fail!", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      })
  }

  useEffect(() => {

    // You can skip useEffect if you're not using TailwindCSS
    // Otherwise, for the production usage refer to https://tailwindcss.com/docs/installation
    if (document) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href =
        "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css";

      document.head.appendChild(stylesheet);
    }

    // Step 1: Map data to ngan luong get detail params
    /* prettier-ignore */
    const nlSecretKey = process.env.REACT_APP_NGAN_LUONG_SECRETKEY;
    const merchantId = process.env.REACT_APP_NGAN_LUONG_MERCHANT_ID;
    let data = {
      nganluongMerchant: merchantId,
      nganluongSecretKey: nlSecretKey
    };

    const arrParam = {
      merchant_id: data.nganluongMerchant,
      checksum: CryptoJS.MD5(token + "|" + data.nganluongSecretKey).toString(),
      token: token,
    };

    const params = [];
    Object.keys(arrParam).forEach((key) => {
      const value = arrParam[key];

      if (value == null || value.length === 0) {
        // skip empty params (but they must be optional)
        return;
      }

      if (value.length > 0) {
        params.push(`${key}=${encodeURIComponent(value)}`);
      }
    });

    const host_api_checkorder = process.env.REACT_APP_HOST_API_CHECKORDER;
    try {
      fetch(
        `${host_api_checkorder}?${params.join(
          "&"
        )}`,
        {
          method: "POST"
        }
      )
        .then((rs) => rs.json())
        .then((json) => {
          let order_code = json.data.order_code.split('_saleid_');
          console.log(order_code[0]);
          handleBuyNFTwithPool(order_code[0], utils.format.parseNearAmount(json.data.affiliate_code), json.data.buyer_email)

        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (isLoading) {
    return <div className="App-order">
      <h6 className="text-center text-light">
        Payment received, starting NFT purchase process ...
      </h6><br />
    </div>
  }

  return (
    <div className="App-order">
      <h6 className="text-center text-light">
        The NFT was purchased successfully!
      </h6><br />
      <ToastContainer />
    </div>
  );
};

export default NganLuongCallback;