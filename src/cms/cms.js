import React from 'react'
import CMS from 'netlify-cms-app'
// import './cms-utils'

import { HomePageTemplate } from '../templates/HomePage'

// if (
//   window.location.hostname === 'localhost' &&
//   window.localStorage.getItem('netlifySiteURL')
// ) {
//   // CMS.registerPreviewStyle(
//   //   window.localStorage.getItem('netlifySiteURL') + '/styles.css'
//   // )
// } else {
//   // CMS.registerPreviewStyle('/styles.css')
// }

CMS.registerPreviewTemplate('home-page', ({ entry }) => {
  console.log('home-pageee');
  return (
  <HomePageTemplate {...entry.toJS().data} />
)})
