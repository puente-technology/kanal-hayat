import React from 'react'
import CMS from 'netlify-cms-app'
import youtube from "netlify-cms-widget-youtube-extended";
import option from "netlify-cms-widget-linked-option";

import './cms-util'
import { HomePageTemplate } from '../templates/HomePage'
import FooterBanner from './preview-templates/FooterBanner'
import FriendSiteBanner from './preview-templates/FriendSiteBanner'
import HeaderBanner from './preview-templates/HeaderBanner'
import { AboutUsPageTemplate } from '../templates/AboutUs'
// import { SSSPageTemplate } from '../templates/SSS'
import { ContactUsTemplate } from '../templates/ContactUs'
import EventsPage, { EventsTemplate } from '../templates/EventsPage';


CMS.registerWidget("youtube", youtubeControl, youtubePreview);

CMS.registerWidget("option", optionComponent, optionPreview);


CMS.registerPreviewTemplate('home-page', ({ entry }) => {
  return (
  <HomePageTemplate {...entry.toJS().data} />
)})

CMS.registerPreviewTemplate('footer-banner-info', ({ entry }) => {
  return (
  <FooterBanner {...entry.toJS().data }/>
)})

CMS.registerPreviewTemplate('friend-site-banner', ({ entry }) => {
  return (
  <FriendSiteBanner {...entry.toJS().data }/>
)})

CMS.registerPreviewTemplate('header-banner-info', ({ entry }) => {
  return (
  <HeaderBanner {...entry.toJS().data }/>
)})

CMS.registerPreviewTemplate('about-us', ({ entry }) => {
  return (
  <AboutUsPageTemplate {...entry.toJS().data }/>
)})

CMS.registerPreviewTemplate('contact-us', ({ entry }) => {
  return (
  <ContactUsTemplate {...entry.toJS().data }/>
)})

CMS.registerPreviewTemplate('yayin-akisi', ({ entry }) => {
  return (
  <EventsTemplate {...entry.toJS().data }/>
)})

// CMS.registerPreviewTemplate('s-s-s', ({ entry }) => {
//   return (
//   <SSSPageTemplate {...entry.toJS().data }/>
// )})

