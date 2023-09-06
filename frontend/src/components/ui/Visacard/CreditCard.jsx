import React from "react";
import Card from "react-credit-cards-2";
import { Row, Col } from "reactstrap";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";

import "react-credit-cards-2/es/styles-compiled.css";
import "./creditcard.css";

export default class CreditCard extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // const { issuer } = this.state;
    // const formData = [...e.target.elements]
    //   .filter((d) => d.name)
    //   .reduce((acc, d) => {
    //     acc[d.name] = d.value;
    //     return acc;
    //   }, {});

    // this.setState({ formData });
    // this.form.reset();
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <>
        <Row>
          <div key="Payment">
            <div className="App-payment">
              <Row>
                <Col lg="6" md="6" sm="12" className="mb-5">
                  <Card
                    number={number}
                    name={name}
                    expiry={expiry}
                    cvc={cvc}
                    focused={focused}
                    callback={this.handleCallback}
                  />
                </Col>
                <Col lg="6" md="6" sm="12">
                  <form
                    ref={(c) => (this.form = c)}
                    onSubmit={this.handleSubmit}
                  >
                    <div className="form_input">
                      <input
                        type="tel"
                        name="number"
                        className="form-control"
                        placeholder="Card Number"
                        pattern="[\d| ]{16,22}"
                        required
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </div>
                    <div className="form_input">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </div>
                    <div className="row">
                      <div className="col-6 form_input">
                        <input
                          type="tel"
                          name="expiry"
                          className="form-control"
                          placeholder="Valid Thru"
                          pattern="\d\d/\d\d"
                          required
                          onChange={this.handleInputChange}
                          onFocus={this.handleInputFocus}
                        />
                      </div>
                      <div className="col-6 form_input">
                        <input
                          type="tel"
                          name="cvc"
                          className="form-control"
                          placeholder="CVC"
                          pattern="\d{3,4}"
                          required
                          onChange={this.handleInputChange}
                          onFocus={this.handleInputFocus}
                        />
                      </div>
                    </div>
                    <input type="hidden" name="issuer" value={issuer} />
                    <div className="form-actions">
                      <button className="btn btn-primary btn-block">ADD</button>
                    </div>
                  </form>
                </Col>
              </Row>

              {formData && (
                <div className="App-highlight">
                  {formatFormData(formData).map((d, i) => (
                    <div key={i}>{d}</div>
                  ))}
                </div>
              )}
              <div className="App-cards">
                <div className="App-cards-list">
                  <Card
                    name="John Smith"
                    number="5555 4444 3333 1111"
                    expiry="10/20"
                    cvc="737"
                  />

                  <Card
                    name="John Smith"
                    number="4111 1111 1111 1111"
                    expiry="10/20"
                    cvc="737"
                  />

                  <Card
                    name="John Smith"
                    number="3700 0000 0000 002"
                    expiry="10/20"
                    cvc="737"
                  />

                  <Card
                    name="John Smith"
                    number="3600 666633 3344"
                    expiry="10/20"
                    cvc="737"
                  />
                </div>
              </div>
            </div>
          </div>
        </Row>
      </>
    );
  }
}
