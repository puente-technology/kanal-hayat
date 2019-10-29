import React from 'react';

import './MobileAppLink.css';

const googlePlay = require('../../static/images/googleplay.svg');
const appStore = require('../../static/images/appstore.svg');
const qrCode = require('../../static/images/qrcode.svg');
// const phone = require('../../static/images/telephone.svg');

const MobileAppLink = () => (
  <div className="containerMobileAppLink">
    <div className="qrCodeStyle">
      <img className="qrCode" alt="qrCode" key="qrCode" src={qrCode} />
    </div>
    <div className="appLink">
      <p className="firstText">
        Kanal Hayat uygulamamızı şimdi indirin!
      </p>
      <p className="secondText">
        Kanal Hayat
      </p>
      <p className="thirdText">
        consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.
      </p>
      <div className="googlePlayStyle">
        <a rel="noopener noreferrer" href="https://www.google.com" target="_blank">
          <img alt="googleplay" key="googleplay" src={googlePlay} style={{ paddingRight: '24px' }} className="googlePlay" />
        </a>
        <a rel="noopener noreferrer" href="https://www.google.com" target="_blank">
          <img alt="appstore" key="appstore" src={appStore} className="appStore" />
        </a>
      </div>
    </div>
    <div className="phone">
      {/* <img alt="phone" key="phone" src={phone} /> */}
    </div>
  </div>

)

export default MobileAppLink;
