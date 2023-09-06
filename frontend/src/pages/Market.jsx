import React, { useEffect, useState } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";

import NftCard from "../components/ui/Nft-card/NftCard";

import { Col, Container, Row } from "reactstrap";

import "../styles/market.css";

const Market = ({ isSignedIn, nftMarketplace, wallet }) => {
  const [sales, setSales] = useState([]);
  const [storedData, setStoredData] = useState([]);

  async function fetchSales() {
    let data = await nftMarketplace.getSales();
    setSales(data);
    setStoredData(data);
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    const filteredData = storedData.filter((item) =>
      item.token.metadata.title
        .toUpperCase()
        .includes(searchValue.toUpperCase())
    );
    setSales([...filteredData]);
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    if (sortValue === "highToLow") {
      const filteredData = sales.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
      setSales([...filteredData]);
    }

    if (sortValue === "lowToHigh") {
      const filterData = sales.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
      setSales([...filterData]);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <>
      <CommonSection title={"MarketPlace"} />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="market__product__filter d-flex align-items-center justify-content-between">
                <div className="filter__left d-flex align-items-center gap-5">
                  <div className="all__category__filter">
                    <div className="input__item mb-4">
                      <input
                        type="text"
                        placeholder="Search by name"
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                </div>

                <div className="filter__right">
                  <select onChange={handleSort}>
                    <option value="highToLow">Price high to low</option>
                    <option value="lowToHigh">Price low to high</option>
                  </select>
                </div>
              </div>
            </Col>

            {sales?.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4">
                <NftCard
                  isSignedIn={isSignedIn}
                  nftMarketplace={nftMarketplace}
                  wallet={wallet}
                  nftData={item}
                  from="market"
                  key={item.id}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Market;
