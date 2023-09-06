import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import "./live-auction.css";
import NftCard from "../Nft-card/NftCard";

const LiveAuction = ({ isSignedIn, nftMarketplace, wallet }) => {
  const [sales, setSales] = useState([]);

  async function fetchSales() {
    let data = await nftMarketplace.getSales();
    setSales(data);
  }

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="live__auction__top d-flex align-items-center justify-content-between">
              <h3>Now Listing</h3>
              <span>
                <Link to="/market">Explore more</Link>
              </span>
            </div>
          </Col>

          {sales?.slice(0, 4).map((item) => (
            <Col lg="3" key={item.sale_id}>
              <NftCard
                isSignedIn={isSignedIn}
                nftMarketplace={nftMarketplace}
                wallet={wallet}
                nftData={item}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default LiveAuction;
