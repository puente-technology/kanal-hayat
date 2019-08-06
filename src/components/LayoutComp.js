import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import PageFooter from './PageFooter';
import MobileAppLink from './MobileAppLink'
// import FriendSiteBanner from './FriendSiteBanner'
import HeaderBanner from './HeaderBanner';

import './globalStyles.css'

export default ({ children }) => {
  return (
    <Fragment>
      <Helmet>
        <link href="https://ucarecdn.com" rel="preconnect" crossOrigin />
        <link rel="dns-prefetch" href="https://ucarecdn.com" />
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" />
      </Helmet>
      {/* <Nav color={color} align={align} /> */}
      <div className="MainDiv">
        <HeaderBanner data={children.props.title} />
        {children}
        <MobileAppLink />
        <PageFooter />
      </div>
    </Fragment>
  )
}
