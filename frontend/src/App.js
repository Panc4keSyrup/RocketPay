import "./app.css";
import Layout from "./components/Layout";

export default function App({ isSignedIn, nftMarketplace, wallet }) {
  return (
    <Layout
      isSignedIn={isSignedIn}
      nftMarketplace={nftMarketplace}
      wallet={wallet}
    />
  );
}
