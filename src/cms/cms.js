import React from 'react'
import CMS from 'netlify-cms-app'
import './cms-util'
import { HomePageTemplate } from '../templates/HomePage'

// import * as NativeColorWidget from 'netlify-cms-widget-native-color'
// CMS.registerWidget('native-color', NativeColorWidget.Control)

// console.log({xx: window.localStorage.getItem('netlifySiteURL')})

// CMS.registerPreviewStyle(styles.toString(), { raw: true })
// if (
//   window.location.hostname === 'localhost' &&
//   window.localStorage.getItem('netlifySiteURL')
// ) {
//   CMS.registerPreviewStyle(
//     window.localStorage.getItem('netlifySiteURL') + '/templates/HomePageSlider.css'
//   )
// } else {
// }

  CMS.registerPreviewTemplate('home-page', ({ entry }) => {
  return (
  <HomePageTemplate {...entry.toJS().data} />
)})
