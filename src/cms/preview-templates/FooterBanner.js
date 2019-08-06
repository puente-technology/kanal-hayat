import React from 'react'
import './FooterBanner.css'

const menuItems = {
  izle: 'Izle',
  yayinAkisi: 'Yayın Akışı',
  bilgiEdin: 'Bilgi Edin',
  aboutKH: 'Kanal Hayat Hakkında',
  contact: 'İletişim',
  canli: 'CANLI İZLE',
}

const FooterBanner = data => (
  <div className="footerBanner">
    <div className="bannerHeader">
      <div className="menuHeader">
        <p className="menuTextStyle">
            Menü
        </p>
        <div>
          {
            Object.entries(menuItems).map(([key, val]) => (
              <p key={key} className="menuContentStyle">
                <a href={`/${key}`} key={key}>
                  {val}
                </a>
              </p>
            ))
          }
        </div>

      </div>
      <div className="registerColumn">
        <p className="menuTextStyle">
            Kayıt Olun!
        </p>
        <input className="emailInput" type="text" name="email" placeholder="E-mail" />
        <button type="submit" className="register-btn">
            Kayıt Ol
        </button>
      </div>
      <div>
        <p className="mostViewedCol">
            En Çok İzlenen
        </p>
        <div>
          {
            Object.entries(data.program).map(([index, obj]) => (
              <p key={index} className="menuContentStyle">
                <a href={`/${obj.link}`} key={index}>
                  {obj.programName}
                </a>
              </p>
            ))
          }
        </div>
      </div>
    </div>
    <div className="footerInfo">
      <div className="copyRightInfo">
          Telif hakkı 2019 © Kanal Hayat. Tüm hakları saklıdır.
      </div>
      {/* <div className="languageSelection">
          Turkce Ingilizce
        </div> */}
    </div>
  </div>
)

export default FooterBanner;
