import React from 'react'
import Routers from '../routes/Routers'
import Header from './Header/Header'
import Footer from './Footer/Footer'

const Layout = ({isSignedIn, nftMarketplace, wallet}) => {
  return (
    <>
      <Header isSignedIn={isSignedIn} wallet={wallet} />
      <div>
        <Routers isSignedIn={isSignedIn} nftMarketplace={nftMarketplace} wallet={wallet}/>
      </div>
      <Footer />
    </>
  )
}

export default Layout
