import React, { useEffect, useState } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";

import NftCard from "../components/ui/Nft-card/NftCard";

import { Col, Container, Row } from "reactstrap";
const Profile = ({ isSignedIn, nftMarketplace, wallet }) => {
  const [nonSaleNfts, setNonSaleNfts] = useState([]);
  const [saleNfts, setSaleNfts] = useState([]);

  async function fetchNonSaleNfts() {
    let data = await wallet.viewMethod({
      contractId: nftMarketplace.contractId,
      method: "nft_non_sale_tokens_for_owner",
      args: {
        account_id: wallet.accountId,
        from_index: "0",
        limit: 100,
      },
    });
    setNonSaleNfts(data);
  }

  async function fetchSaleNfts() {
    let data = await wallet.viewMethod({
      contractId: nftMarketplace.contractId,
      method: "nft_sale_tokens_for_owner",
      args: {
        account_id: wallet.accountId,
        from_index: "0",
        limit: 100,
      },
    });
    setSaleNfts(data);
  }

  useEffect(() => {
    if (isSignedIn) {
      fetchNonSaleNfts();
      fetchSaleNfts();
    } else {
      wallet.signIn();
    }
  }, []);

  return (
    <>
      <CommonSection title={"Collectibles"} />
      return (
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="live__auction__top d-flex align-items-center justify-content-between">
                <h3>Your NFTs</h3>
              </div>
            </Col>
            {nonSaleNfts?.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item.token_id}>
                <NftCard
                  nftMarketplace={nftMarketplace}
                  nftData={{ token: item }}
                  from="profile"
                />
              </Col>
            ))}
          </Row>
          <br/>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="live__auction__top d-flex align-items-center justify-content-between">
                <h3>Your listing NFTs</h3>
              </div>
            </Col>
            {saleNfts?.map((item) => (
              <Col
                lg="3"
                md="4"
                sm="6"
                className="mb-4"
                key={item.token.token_id}
              >
                <NftCard
                  nftMarketplace={nftMarketplace}
                  nftData={item}
                  from="profile"
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      );
    </>
  );
};

export default Profile;
