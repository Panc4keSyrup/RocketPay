import React from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container } from "reactstrap";
import PaymentForm from "../components/ui/Visacard/CreditCard";
import 'react-credit-cards-2/es/styles-compiled.css';

const VisaCard = () => {
  return (
    <>
      <CommonSection title="Connect VisaCard" />
      <section>
        <Container>
          <PaymentForm />
        </Container>
      </section>
    </>
  );
};

export default VisaCard;
