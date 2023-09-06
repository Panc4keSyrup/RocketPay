import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Button, Container } from "reactstrap";
import "./header.css";
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
const NAV__LINKS = [
  {
    display: "Home",
    url: "/home",
    requireLogin: false,
  },
  {
    display: "Market",
    url: "/market",
    requireLogin: false,
  },
  {
    display: "Create",
    url: "/create",
    requireLogin: false,
  },
  {
    display: "Your Collectibles",
    url: "/profile",
    requireLogin: true,
  },
];

const Header = ({ isSignedIn, wallet }) => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }

      return () => {
        window.removeEventListener("scroll");
      };
    });
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2 className=" d-flex gap-2 align-items-center ">
              <span>
                <i className="ri-fire-fill"></i>
              </span>{" "}
              K10 Rocket NFT Marketplace
            </h2>
          </div>

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index}>
                  {(() => {
                    if (
                      !item.requireLogin ||
                      (item.requireLogin && isSignedIn)
                    ) {
                      return (
                        <NavLink
                          to={item.url}
                          className={(navClass) =>
                            navClass.isActive ? "active" : ""
                          }
                        >
                          {item.display}
                        </NavLink>
                      );
                    }
                  })()}
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center gap-5">
            {isSignedIn ? (
              <>
                <Button
                  className="btn d-flex gap-2 align-items-center"
                  onClick={() => {
                    wallet.signOut();
                  }}
                >
                  Logout {wallet.accountId}
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="btn d-flex gap-2 align-items-center"
                  onClick={() => {
                    wallet.signIn();
                  }}
                >
                  <span>
                    <i className="ri-wallet-line"></i>
                  </span>
                  Login with NEAR
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
