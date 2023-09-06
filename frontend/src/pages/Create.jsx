import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import "../styles/create-item.css";

export default function Create({ isSignedIn, nftMarketplace, wallet }) {
  const [tokenId, setTokenId] = useState("");
  const [tokenTitle, setTokenTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");

  async function submitOnMint() {
    await nftMarketplace.mintNFT(
      tokenId,
      {
        title: tokenTitle,
        description,
        media,
      },
      wallet.accountId
    );
  }

  useEffect(() => {
    if (!isSignedIn) {
      wallet.signIn();
    }
  }, []);

  return (
    <>
      <CommonSection title="Mint new NFT" />

      <section>
        <Container>
          <Row>
            {(() => {
              if (isSignedIn) {
                return (
                  <Col lg="12" md="12" sm="12">
                    <div className="create_item">
                      <form>
                        <div className="form_input">
                          <label htmlFor="">Token ID</label>
                          <input
                            type="text"
                            name="tokenId"
                            placeholder="Enter token id"
                            onChange={(e) => setTokenId(e.target.value)}
                          />
                        </div>
                        <div className="form_input">
                          <label htmlFor="">Media URL</label>
                          <input
                            type="text"
                            name="mediaUrl"
                            placeholder="Enter media URL"
                            onChange={(e) => setMedia(e.target.value)}
                          />
                        </div>

                        <div className="form_input">
                          <label htmlFor="">Title</label>
                          <input
                            type="text"
                            name="title"
                            placeholder="Enter title"
                            onChange={(e) => setTokenTitle(e.target.value)}
                          />
                        </div>

                        <div className="form_input">
                          <label htmlFor="">Description</label>
                          <textarea
                            name="description"
                            rows="7"
                            placeholder="Enter description"
                            className="w100"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>

                        <div className="form_input">
                          <button
                            type="button"
                            className="bid__btn d-flex align-items-center gap-1 centered"
                            value="Mint"
                            onClick={() => {
                              submitOnMint();
                            }}
                          >
                            <i className="ri-shopping-bag-line"></i> Mint
                          </button>

                          {/* <input
                        type="button"
                        oncli
                        onClick={() => {
                          submitOnMint(tokenId, tokenTitle, description, media);
                        }}
                        className="bid__btn d-flex align-items-center gap-1 centered"
                      >
                        <i className="ri-shopping-bag-line"></i> Mint
                      </input> */}
                        </div>
                      </form>
                    </div>
                  </Col>
                );
              } else {
                return (
                  <Col lg="12" md="12" sm="12">
                    <div className="create_item">
                      <h2>You need to login to do this action</h2>
                    </div>
                  </Col>
                );
              }
            })()}
          </Row>
        </Container>
      </section>
    </>
  );
}
