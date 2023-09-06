import { useRef, useEffect  } from "react";
import useForm from "./UseForm";
import "./order.css";

const Order = () => {
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
      stylesheet.href = "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css";

      document.head.appendChild(stylesheet);
    }
  }, []);

  const { handleSubmit, status, message } = useForm({
    formElement: formElement.current
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

  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      ref={formElement}
      className="App-order"
    >
      <div className="mb-3 pt-0">
        <input
          type="text"
          placeholder="Your name"
          name="buyer_fullname"
          className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          required
        />
      </div>
      <div className="mb-3 pt-0">
        <input
          type="email"
          placeholder="Email"
          name="buyer_email"
          className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          required
        />
      </div>
      <div className="mb-3 pt-0">
        <textarea
          placeholder="Your phone"
          name="buyer_mobile"
          className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          required
        />
      </div>
      {status !== "loading" && (
        <div className="mb-3 pt-0">
          <button
            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
          >
            Send a message
          </button>
        </div>
      )}
    </form>
  );
};

export default Order;