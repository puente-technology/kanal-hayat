// https://fonts.googleapis.com/css?family=Nunito
import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

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
        {/* Add font link tags here */}
      </Helmet>
      <div className="MainDiv">
        <Nav color={color} align={align} />
        {children}
      </div>
    </Fragment>
  )
}
