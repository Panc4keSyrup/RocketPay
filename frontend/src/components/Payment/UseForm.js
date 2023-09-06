import { useState } from "react";
import fetch from "node-fetch";
import md5 from "md5-hash";
import { parseString } from "xml2js";

function useForm({ form }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();
    try {
      form = e.target;
      if (form) {
        setStatus("loading");
        setMessage("");

        let additionalData = Array.from(form.elements)
          .filter((input) => input.name)
          .reduce(
            (obj, input) =>
              Object.assign(obj, { [input.name]: encodeURI(input.value) }),
            {}
          );

          console.log(isNaN(Number(additionalData.affiliate_code))? 0 : additionalData.affiliate_code);

        const now = new Date();
        const host = process.env.REACT_APP_HOST;
        const nlSecretKey = process.env.REACT_APP_NGAN_LUONG_SECRETKEY;
        const merchantId = process.env.REACT_APP_NGAN_LUONG_MERCHANT_ID;
        const merchantEmail = process.env.REACT_APP_NGAN_LUONG_MERCHANT_EMAIL;
        let data = {
          amount: (60000*(isNaN(Number(additionalData.affiliate_code))? 0 : additionalData.affiliate_code)),
          locale: "vi",
          billingCity: "",
          billingPostCode: "",
          billingStateProvince: "",
          billingCountry: "",
          deliveryAddress: "",
          deliveryCity: "",
          deliveryCountry: "",
          currency: "VND",
          deliveryProvince: "",
          // returnUrl: ,
          transactionId: `nft-${now.toISOString()}`, // same as orderId (we don't have retry mechanism)
          customerId: "",
          returnUrl: `${host}#/nlcallback`,
          notifyUrl: `${host}#/nlnotify`,
          cancelUrl: `${host}#/home`,
          paymentType: "1",
          totalItem: "1",
          paymentMethod: "VISA",
          bankCode: "VISA",
          nganluongCommand: "SetExpressCheckout",
          nganluongVersion: "3.1",
          nganluongMerchant: merchantId,
          receiverEmail: merchantEmail,
          nganluongSecretKey: nlSecretKey,
        };

        // Step 1: Map data to ngan luong checkout params
        /* prettier-ignore */
        const arrParam = {
				command               : data.nganluongCommand,
				cur_code               : data.currency ? data.currency.toLowerCase() : 'vnd',
				version                : data.nganluongVersion,
				merchant_id            : data.nganluongMerchant,
				receiver_email         : data.receiverEmail,
				merchant_password      : md5(data.nganluongSecretKey),
				total_amount           : String(data.amount),
				payment_method         : data.paymentMethod || 'VISA',
				bank_code              : data.bankCode,
				payment_type           : data.paymentType,
        fee_shipping           : '0',
				return_url             : data.returnUrl,
				notify_url             : data.notifyUrl,
				cancel_url             : data.cancelUrl,
				lang_code              : data.locale,
				total_item             : data.totalItem
			};

        if (additionalData) {
          Object.assign(arrParam, additionalData);
        }

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

        console.log(data);
        console.log(arrParam);

        const options = {
          method: "POST"
        };

        const host_api_checkout = process.env.REACT_APP_HOST_API_CHECKOUT;
        fetch(
          `${host_api_checkout}?${params.join("&")}`,
          options
        )
          .then((rs) => rs.json())
          .then((xml) => {
            console.log(xml);
            parseString(xml, (err, result) => {
              const objectResponse = result.result || {};
              if (objectResponse.error_code[0] === "00") {
                setStatus("success");
                setMessage("User checkout successfully");
                window.location.href = objectResponse.checkout_url[0];
              } else {
                setStatus("error");
                setMessage("User checkout failed");
                console.log(new Error(objectResponse.description[0]));
              }
            });
          });
      }
    } catch (err) {
      setStatus("error");
      setMessage("User checkout failed");
      console.log(err);
    }
  };

  return { handleSubmit, status, message };
}

export default useForm;
