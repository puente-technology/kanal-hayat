import React, { Component } from 'react';

import './MobileAppLink.styles.css';

const googlePlay = require('../../../public/images/googleplay.svg');
const appStore = require('../../../public/images/appstore.svg');
const qrCode = require('../../../public/images/qrcode.svg');
const phone = require('../../../public/images/phone.svg');

export class MobileAppLink extends Component {

  render() {
    return (
      <div className="containerMobileAppLink">
        <div className="qrCodeStyle">
          <img alt='qrCode' key='qrCode' src={qrCode}/>
        </div>
        <div>
          <p className="firstText">
            Kanal Hayat uygulamamızı şimdi indirin!
          </p>
          <p className="secondText">
            Kanal Hayat
          </p>
          <p className="thirdText">
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          </p>
          <div className="googlePlayStyle">
            <a href="https://www.google.com" target="_blank">
              <img alt='googleplay' key='googleplay' src={googlePlay} style={{paddingRight: '24px'}}/>
            </a>
            <a href="https://www.google.com" target="_blank">
              <img alt='appstore' key='appstore' src={appStore}/>
            </a>
          </div>
        </div>
        <div>
          <img alt='phone' key='phone' src={phone}/>
        </div>
      </div>
     
    )
  }
}

export default MobileAppLink;
