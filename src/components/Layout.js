// https://fonts.googleapis.com/css?family=Nunito
import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import 'modern-normalize/modern-normalize.css'
import './globalStyles.css'

export default ({ children, meta, title }) => {
  return (
    <Fragment>
      <Helmet>
        {title}
        <link href="https://ucarecdn.com" rel="preconnect" crossorigin />
        <link rel="dns-prefetch" href="https://ucarecdn.com" />
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet"/>
        {/* Add font link tags here */}
      </Helmet>
      <Fragment>{children}</Fragment>
    </Fragment>
  )
}
