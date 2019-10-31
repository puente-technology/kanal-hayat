/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types';

import './PageFooter.css';

const youtubeIcon = require('../../static/images/youtube.svg');
const twitterIcon = require('../../static/images/twitter.svg');
const instagramIcon = require('../../static/images/instagram.svg');
const locationIcon = require('../../static/images/location.svg');
const facebookIcon = require('../../static/images/facebook.svg');

const menuItems = {
  izle: 'Izle',
  yayinAkisi: 'Yayın Akışı',
  bilgiEdin: 'Bilgi Edin',
  aboutKH: 'Kanal Hayat Hakkında',
  contact: 'İletişim',
  canli: 'CANLI İZLE',
}

const iconsLink = {
  youtube: 'https://www.youtube.com/user/kanalhayatplay',
  twitter: 'https://twitter.com/kanalhayat',
  facebook: 'https://www.facebook.com/kanalhayat',
}


const menuItemsLinks = {
  izle: 'series',
  yayinAkisi: 'events',
  bilgiEdin: 'info-page',
  aboutKH: 'about-us',
  contact: 'contact-us',
  canli: 'canli',
}

const icons = {
  youtube: youtubeIcon,
  location: locationIcon,
  facebook: facebookIcon,
  twitter: twitterIcon,
  instagram: instagramIcon,
}

export default () => (
  <StaticQuery
    query={graphql`
    query PageFooter {
      allFooterBannerYaml {
        edges {
          node {
            program {
              link
              programName
            }
          }
        }
      }
    }
    `}
    render={data => (
      <PageFooter edges={data.allFooterBannerYaml.edges} />
    )}
  />
)


export class PageFooter extends Component {
  static propTypes = {
    edges: PropTypes.any.isRequired,
  };

  render() {
    const { edges } = this.props;
    return (
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
                  <a href={`/${menuItemsLinks[key]}`} key={key}>
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
          <div className="rightColumn">
            <p className="mostViewedCol">
              En Çok İzlenen
            </p>
            <div>
              {
              Object.entries(edges).map(([index, obj]) => {
                let programItems
                if (obj.node.program) {
                  programItems = obj.node.program.map((item, index2) => (
                    <p key={`${index}${index2}`} className="menuContentStyle">
                      <a href={`/${item.link}`} key={index2}>
                        {item.programName}
                      </a>
                    </p>
                  ))
                }
                return programItems
              })
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
          <div className="iconsColmStyle">
            {
              Object.entries(icons).map(([key, val]) => (
                <a href={iconsLink[key]} rel="noopener noreferrer" target="_blank" className="socialIconsLinks">
                  <img alt={key} className="iconStyle" key={key} src={val} />
                </a>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}
