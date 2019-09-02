/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PlayerInfo.css';
import Carousel from './PlayerCarousel';

const arrovSvg = require('../../static/images/expand.svg');

class PlayerInfoExpand extends Component {
  static propTypes = {
    playerProps: PropTypes.any.isRequired,
    onCloseClick: PropTypes.any.isRequired,
    episodeInfo: PropTypes.any,
    episodes: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      playerProps,
      onCloseClick,
      episodeInfo,
      episodes,
    } = this.props
    return (
      <div style={{
        width: playerProps.width,
        height: '800px',
        background: 'black',
        bottom: '0',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
      }}
      >
        <div className="player-info-header">
          <p className="player-info-txt-head">
            Spoken Talks: Bölüm 1
          </p>
          <p className="player-info-txt">
            Yeşu: Sahte Tanrılar
          </p>
          <p className="player-info-txt">
            Her Çarşamba
          </p>
          <p className="player-info-txt">
            16.00 - 17.00
          </p>
        </div>
        <div>
          <p className="player-info-contet">
            Sotto La Loggia hosts scores of albums and improvisations from distinct
            genres of jazz music from national,
            regional, and local cultures. Our programme, aired at 9 p.m.
            every Sunday, will be an essential for all jazz lovers and an instructive project for
            all those who have just started exploring jazz music. Photo: Jens Thekkeveettil
          </p>
        </div>
        <div className="player-info-info-div-parent">
          <div className="player-info-info-div">
            <p className="player-info-text-bold">
              Host:
            </p>
            <p className="player-info-text-lighter">
              Yeşua
            </p>
          </div>
          <div className="player-info-info-div">
            <p className="player-info-text-bold">
              Guests:
            </p>
            <p className="player-info-text-lighter">
              Joyce Meyer
            </p>
          </div>
          <div className="player-info-info-div">
            <p className="player-info-text-bold">
              Target Group:
            </p>
            <p className="player-info-text-lighter">
              Adult, Type:Teaching, Sub Category: Growth, Language: Türkçe-English
            </p>
          </div>
          <div className="player-info-info-div">
            <p className="player-info-text-bold">
              Keywords:
            </p>
            <p className="player-info-text-lighter">
              spoken, words, sahte, tanrilar, kanalhayat...
            </p>
          </div>
          <div style={{ marginTop: '30px' }}>
            <p className="player-info-text-bold">
              Bölümler
            </p>
          </div>
        </div>
        <div>
          <Carousel episodes={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} activeEpisode={0} />
        </div>
        <div style={{ margin: '300px auto', transform: 'rotate(90deg)' }}>
          <img width="50px" height="40px" onClick={onCloseClick} src={arrovSvg} alt="closeArrow" />
        </div>
      </div>
    )
  }
}

export default PlayerInfoExpand;
