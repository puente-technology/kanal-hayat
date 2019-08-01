// https://fonts.googleapis.com/css?family=Nunito
import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import PageFooter from './PageFooter';
import MobileAppLink from './MobileAppLink'
import FriendSiteBanner from './FriendSiteBanner'

import 'modern-normalize/modern-normalize.css'
import './globalStyles.css'
import Nav from './Nav';

export default ({ children, meta, title, color, align }) => {
  return (
    <Fragment>
      <Helmet>
        {title}
        <link href="https://ucarecdn.com" rel="preconnect" crossorigin />
        <link rel="dns-prefetch" href="https://ucarecdn.com" />
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" />
      </Helmet>
      <Nav color={color} align={align} />
      <div className="MainDiv">
        {children}
        <FriendSiteBanner/>
        <MobileAppLink />
        <PageFooter />
      </div>
    </Fragment>
  )
}
