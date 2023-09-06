import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useLocation } from "react-router-dom";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import { nftTokenForEmailOwner } from "../services/contractUtils";

const Collectible = () => {
  const [nfts, setNfts] = useState([]);

  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const owner_email = query.get('owner_email')

  async function fetchNfts() {
    let data = await nftTokenForEmailOwner(owner_email)
    setNfts(data)
  }

  useEffect(() => {
    fetchNfts();
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
                <h3>{owner_email}'s NFTs</h3>
              </div>
            </Col>
            {nfts?.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item.token_id}>
                <NftCard
                  nftData={{ token: item }}
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

export default Collectible;
