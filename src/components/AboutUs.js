import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './AboutUs.css'

export class AboutUs extends Component {

  static propTypes = {
    edges: PropTypes.any.isRequired,
    title: PropTypes.any.isRequired,
  };

  render() {
    const { content, featuredImage } = this.props;
    return (
      <div className="about-us">
        <div className="imageContainer">
          <img style={{ position: 'relative' }} src={featuredImage} alt='Content Image'/>
          <div className="gradientDiv"/>
        </div>
        <div className="contentContainer">
          <div className="contentAbout">
            <p className="contenIntroductionText">
              {content.introduction}
            </p>
            <p className="contenFrekansText">
              Frekansımız:
            </p>
            <p className="contenFrekans">
              {content.frekansInfo.dogu}
            </p>
            <p className="contenFrekans">
              {content.frekansInfo.dikey}
            </p>
            <p className="contenFrekans">
              {content.frekansInfo.saniye}
            </p>
            <p className="contenFrekans">
              {content.frekansInfo.fec}
            </p>
            <p className="contenAboutText">
              {content.about}
            </p>
            <p className="contenContactText">
              {content.contactInfo}
            </p>
            <p className="contenAboutText">
              {content.footerInfo}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutUs
