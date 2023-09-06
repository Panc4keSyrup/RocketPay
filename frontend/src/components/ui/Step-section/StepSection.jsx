import React from "react";
import "./step-section.css";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const STEP__DATA = [
  {
    title: "Create and sell your NFTs",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit eligendi, facilis voluptatum fugit illum.",
    icon: "ri-wallet-line",
  },
  {
    title: "Create your collection",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit eligendi, facilis voluptatum fugit illum.",
    icon: "ri-layout-masonry-line",
  },
  {
    title: "Add your NFTs",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit eligendi, facilis voluptatum fugit illum.",
    icon: "ri-image-line",
  },
  {
    title: "List them for sale",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit eligendi, facilis voluptatum fugit illum.",
    icon: "ri-list-check",
  },
];

const StepSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-4">
            <h3 className="step__title">Create and sell your NFTs</h3>
          </Col>

          {STEP__DATA.map((item, index) => (
            <Col lg="3" md='4' sm='6' key={index}>
              <div className="single__step__item">
                <span>
                  <i className={item.icon}></i>
                </span>
                <div className="step__item__content">
                  <h5>
                    <Link to="/wallet">{item.title}</Link>
                  </h5>
                  <p>
                    {item.desc}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default StepSection;
