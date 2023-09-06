import React from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../styles/wallet.css";

import nearImg from "../assets/images/near.png";

const wallet__data = [
  {
    title: "Near",
    desc: "Connect to your Near wallet",
    icon: nearImg,
  }
];

const Wallet = () => {
  return (
    <>
      <CommonSection title="Connect Wallet" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <div className="w-50 m-auto">
                <h3 className="text-light">Connect your wallet</h3>
                <p>
                  If you don't have a wallet yet, you can select a provider and
                  create one now.
                </p>
              </div>
            </Col>

            {wallet__data.map((item, index) => (
              <Col lg="3" md="4" sm="6" key={index} className="mb-4">
                <div className="wallet__item">
                  <span>
                    {/* <i className={item.icon}></i> */}
                    <img src={item.icon} alt="" />
                  </span>
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Wallet;
