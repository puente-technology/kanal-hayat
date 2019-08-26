import React from 'react'
import CMS from 'netlify-cms-app'
import youtube from "netlify-cms-widget-youtube-extended";
import './cms-util'
import { HomePageTemplate } from '../templates/HomePage'
import FooterBanner from './preview-templates/FooterBanner'
import FriendSiteBanner from './preview-templates/FriendSiteBanner'
import HeaderBanner from './preview-templates/HeaderBanner'
import { AboutUsPageTemplate } from '../templates/AboutUs'
import { ContactUsTemplate } from '../templates/ContactUs'
import EventsPage, { EventsTemplate } from '../templates/EventsPage';


console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");

 console.log({youtubeControl});
CMS.registerWidget("youtube", youtubeControl, youtubePreview);

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

CMS.registerPreviewTemplate('event-page', ({ entry }) => {
  return (
  <EventsTemplate {...entry.toJS().data }/>
)})

