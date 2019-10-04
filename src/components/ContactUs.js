import React from 'react';
import PropTypes from 'prop-types';
import './ContactUs.css'

const logo = require('../../static/images/blackLogo.svg');


const ContactUsPage = (props) => {
  const {
    header,
    address,
    telefon,
    email,
  } = props;
  return (
    <div className="contact-us">
      <div className="contactInfo">
        <div>
          <div className="logoContainer">
            <div className="logo">
              <img className="logoImg" src={logo} alt="logo" />
            </div>
          </div>
          <div className="ContactUsHeaderText" style={{ marginTop: '25px' }}>
            <p className="ContactUsHeaderTextStyle">
              {header}
            </p>
          </div>
          <div className="ContactUsInfoText" style={{ marginTop: '11px' }}>
            <p className="ContactUsInfoTextStyleBold">
              Telefon:
            </p>
            <p className="ContactUsInfoTextStyle">
              {telefon}
            </p>
          </div>
          <div className="ContactUsInfoText" style={{ marginTop: '14px' }}>
            <p className="ContactUsInfoTextStyleBold">
              Email:
            </p>
            <p className="ContactUsInfoTextStyle">
              {email}
            </p>
          </div>
          <div className="ContactUsInfoText" style={{ width: '265px', marginTop: '14px' }}>
            <p className="ContactUsInfoTextStyleBold">
              Address:
            </p>
            <p className="ContactUsInfoTextStyle">
              {address}
            </p>
          </div>
        </div>
      </div>
      <div className="form">
        <form name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="contact" />
          <p className="formHeader">
            İletişim Formu
          </p>
          <div className="field" style={{ marginTop: '25px' }}>
            <div>
              <input className="fieldStyle" type="text" name="name" placeholder="İsim-Soyisim *" />
            </div>
            <div className="rightFieldStyle">
              <input className="fieldStyle" type="email" name="email" placeholder="E-mail *" />
            </div>
          </div>
          <div className="field">
            <div>
              <input className="fieldStyle" type="text" name="konu" placeholder="Konu *" />
            </div>
            <div className="rightFieldStyle">
              <input className="fieldStyle" type="text" name="telefon" placeholder="Telefon *" />
            </div>
          </div>
          <div className="textArea" style={{ marginTop: '21px' }}>
            <p className="messageLabel">
              Mesaj *
            </p>
            <hr className="lineStyle" />
            <textarea name="message" className="textAreaStyle" />
            <hr className="lineStyle" />
          </div>
          <p style={{ textAlign: 'center' }}>
            <button className="buttonStyle" type="submit">Gönder</button>
          </p>
        </form>
      </div>
    </div>
  )
}

ContactUsPage.propTypes = {
  header: PropTypes.any,
  address: PropTypes.any,
  telefon: PropTypes.any,
  email: PropTypes.any,
}

export default ContactUsPage
