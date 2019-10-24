import React from 'react';
import PropTypes from 'prop-types';
import './AboutUs.css'

const AboutUs = (props) => {
  const { content, featuredImage } = props;
  return (
    <div className="about-us">
      <div className="imageContainer">
        <img
          style={{ position: 'relative' }}
          src={featuredImage}
          alt="Content"
          className="imageContainerBackground"
        />
        <div className="gradientDiv" />
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

AboutUs.propTypes = {
  content: PropTypes.any,
  featuredImage: PropTypes.any,
}

export default AboutUs
