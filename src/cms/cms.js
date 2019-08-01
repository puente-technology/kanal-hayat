import React from 'react'
import CMS from 'netlify-cms-app'
import './cms-util'
import { HomePageTemplate } from '../templates/HomePage'

import PgaeFooter from '../components/PageFooter';
import MobileAppLink from '../components/MobileAppLink';
import FriendSiteBanner from '../components/FriendSiteBanner';

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
  console.log('home-pageee', entry.toJS());
  return (
  <HomePageTemplate {...entry.toJS().data} />
)})

CMS.registerPreviewTemplate('foterBanner', ({ entry }) => {
  console.log('asdasd', entry.toJS());
  return (
  <PgaeFooter />
)})

CMS.registerPreviewTemplate('friendSiteBanner', ({ entry }) => {
  console.log('asdasd', entry.toJS());
  return (
  <FriendSiteBanner />
)})


CMS.registerPreviewTemplate('mobile-link', ({ entry }) => {
  console.log('asdasd', entry.toJS());
  return (
  <MobileAppLink />
)})
