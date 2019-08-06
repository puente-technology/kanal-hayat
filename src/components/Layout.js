// https://fonts.googleapis.com/css?family=Nunito
import React, { Fragment } from 'react'
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import PageFooterQ from './PageFooter';
import MobileAppLink from './MobileAppLink'
// import FriendSiteBanner from './FriendSiteBanner'
import './globalStyles.css'
// import Nav from './Nav';

const Layout = ({
  children, title,
}) => (
  <Fragment>
    <Helmet>
      {title}
      <link href="https://ucarecdn.com" rel="preconnect" crossOrigin />
      <link rel="dns-prefetch" href="https://ucarecdn.com" />
      <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" />
    </Helmet>
    {/* <Nav color={color} align={align} /> */}
    <div className="MainDiv">
      {children}
      <MobileAppLink />
      <PageFooterQ />
    </div>
  </Fragment>
)

Layout.propTypes = {
  children: PropTypes.any,
  // meta: PropTypes.any,
  title: PropTypes.any,
}

export default Layout;
