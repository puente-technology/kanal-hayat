/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import PropTypes from 'prop-types';
import Duration from './Duration'


const playSvg = require('../../static/images/play.svg');
const prevVideo = require('../../static/images/leftArrow.svg')
const nextVideo = require('../../static/images/rightArrow.svg')
const pauseSvg = require('../../static/images/pause.svg')
const cancelSvg = require('../../static/images/cancelicon.svg')
const volumeSvg = require('../../static/images/volume.svg');
const elipse1 = require('../../static/images/elipse1.svg');
const elipse2 = require('../../static/images/elipse2.svg');
const elipse3 = require('../../static/images/elipse3.svg');
const mute = require('../../static/images/mute.svg');
const fullScreen = require('../../static/images/screenSize.svg');
const expand = require('../../static/images/expand.svg');
const bigScreen = require('../../static/images/bigscreen.svg');
const infoSvg = require('../../static/images/info.svg')

const ShowIcon = 'M7 0L13.9282 8.25H0.0717969L7 0Z'

export const PlayerInfo = ({
  playerProps, title, artist, style,
}) => (
  <div className="col-auto player-info" style={style}>
    <div className="row">
      <div className={
        playerProps.expand ? 'col expanded player-info-txt' : 'col player-info-txt'
        }
      >
        <div className={
          playerProps.expand ? 'player-info-expanded' : 'player-info-collapsed'
          }
        >
          <div className="player-artist">{`${artist}:  `}</div>
          <div className="player-title">{title}</div>
        </div>
      </div>
    </div>
  </div>
)

export const PlayerControls = ({ playerProps, showNextPrev, onPlayClick }) => (
  <div className={playerProps.isBigScreen ? 'player-controls isBig' : 'player-controls'}>
    {
    showNextPrev
      ? (
        <img src={prevVideo} alt="prev" className={playerProps.isBigScreen ? 'player-controls-svg-isBig' : 'player-controls-svg'} onClick={playerProps.playerPrev} style={{ marginLeft: '31px' }} width="27" height="27" />
      )
      : <span />
  }
    {
    playerProps.playing
      ? (
        <img
          alt="PauseIcon"
          src={pauseSvg}
          className={playerProps.isBigScreen ? 'player-controls-svg-isBig' : 'player-controls-svg'}
          onClick={playerProps.playerPause}
          style={{
            marginLeft: '10px', marginRight: '10px',
          }}
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
        />
      )
      : (
        <img
          className={playerProps.isBigScreen ? 'player-controls-svg-isBig' : 'player-controls-svg'}
          src={playSvg}
          alt="play"
          onClick={onPlayClick}
          style={{
            marginLeft: '10px', marginRight: '10px',
          }}
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
        />
      )
  }
    {
    showNextPrev
      ? (
        <img src={nextVideo} alt="next" className={playerProps.isBigScreen ? 'player-controls-svg-isBig' : 'player-controls-svg'} onClick={playerProps.playerNext} style={{ marginRight: '31px' }} width="27" height="27" />
      )
      : <span />
  }
  </div>
)

export const PlayerButtons = ({
  playerProps, onFullScreenClick, isBigScreenClick, onExpandClick, onCloseClick,
}) => (
  <div className="player-expand">
    <div className="player-expand-close-btns">
      {
        playerProps.expand
          ? (
            <img onClick={onExpandClick} className="player-expanded-less" src={expand} alt="Expand Icon" />
          )
          : (

            <img onClick={onExpandClick} className="player-expanded-more" src={expand} alt="Expand Icon" />
          )
        }
      <img
        src={cancelSvg}
        alt="cancel"
        onClick={onCloseClick}
        style={{ minWidth: '20px', minHeight: '20px' }}
      />
    </div>
    <div className={playerProps.isBigScreen ? 'player-screen-control isBig' : 'player-screen-control'}>
      {
        playerProps.isBigScreen
          ? (
            <img
              src={bigScreen}
              onClick={isBigScreenClick}
              alt="fullScreen"
              className="player-volume-path"
              style={{
                minWidth: '18px', minHeight: 'px', paddingTop: '1.8rem', marginRight: '21px',
              }}
            />
          ) : (
            <img
              src={bigScreen}
              onClick={isBigScreenClick}
              alt="fullScreen"
              className="player-volume-path"
              style={{
                minWidth: '24px', minHeight: '24px', paddingTop: '1.8rem', marginRight: '15px',
              }}
            />
          )
      }
      <img
        src={fullScreen}
        onClick={onFullScreenClick}
        alt="fullScreen"
        className="player-volume-path"
        style={{ minWidth: '20px', minHeight: '20px', paddingTop: '1.8rem' }}
      />
    </div>
  </div>
)

export const PlayerBar = ({
  elapsed, remaining, played, loaded, onSeekMouseDown,
  onSeekChange, onSeekMouseUp, showProgressThumb,
}) => (
  <div className="player-bar">
    <div className="player-elapsed">
      <Duration seconds={elapsed} className="duration-elapsed" />
    </div>
    <div className="player-bar-bar">
      <div className="player-play-bar" style={{ width: `${played * 100}%` }} />
      <div className="player-load-bar" style={{ width: `${loaded * 100}%` }} />
      <input
        className={['player-range', showProgressThumb ? '' : 'no-thumb'].join(' ')}
        type="range"
        step="any"
        min="0"
        max="1"
        value={played}
        onMouseDown={onSeekMouseDown}
        onChange={onSeekChange}
        onMouseUp={onSeekMouseUp}
      />
    </div>
    <div className="player-remaining">
      <Duration seconds={remaining} className="duration-remaining" />
    </div>
  </div>
)

export const PlayerVolume = ({ playerProps, volume, setVolume }) => (
  <div className={playerProps.isBigScreen ? 'player-volume isBig' : 'player-volume'}>
    <div className="player-volume-icon">
      <img
        src={volumeSvg}
        alt="volume"
        className="player-volume-path"
        style={{ minWidth: '18px', minHeight: '18px', padding: '4px' }}
        viewBox="0 0 24 24"
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {volume > 0 ? <img alt="elipseSmall" className={playerProps.isBigScreen ? 'elipse-sml' : ''} src={elipse1} /> : null}
        {volume > 0.4 ? <img alt="elipseMedium" className={playerProps.isBigScreen ? 'elipse-md' : ''} src={elipse2} /> : null}
        {volume > 0.8 ? <img alt="elipseLarge" className={playerProps.isBigScreen ? 'elipse-lg' : ''} src={elipse3} /> : null}
        {volume === 0 ? <img alt="MuteIcon" className={playerProps.isBigScreen ? 'mute' : ''} src={mute} /> : null}
      </div>
    </div>
    <div className="player-volume-bar">
      <div className="player-play-bar" style={{ width: `${volume * 100}%` }} />
      <input
        className="player-range"
        type="range"
        step="any"
        min="0"
        max="1"
        value={volume}
        onChange={setVolume}
      />
    </div>
  </div>
)
export const MiniPlayer = ({
  title, showNextPrev, playerProps, onPlayClick, onShowClick,
}) => (
  <div
    id="playerMini"
    className={playerProps.show && !playerProps.expanded ? 'hide' : 'show'}
  >
    <div className="playerMiniContainer">
      {title}
      {
        showNextPrev
          ? (
            <svg className="mini-player-svg" onClick={playerProps.playerPrev} style={{ minWidth: '24px', minHeight: '24px', marginLeft: '15px' }} width="27" height="27" viewBox="0 0 27 27" fill="none">
              <path d="M25.4774 13.5C25.4774 20.4221 19.9796 26 13.2387 26C6.49779 26 1 20.4221 1 13.5C1 6.57793 6.49779 1 13.2387 1C19.9796 1 25.4774 6.57793 25.4774 13.5Z" stroke="white" strokeWidth="2" />
              <rect x="1" y="17.22182" width="3" height="11" rx="1.5" transform="rotate(-45 0 8.22182)" fill="white" />
              <rect x="-7.12134" y="11" width="3" height="11" rx="1.5" transform="rotate(-135 2.12134 10)" fill="white" />
            </svg>
          )
          : <span />
      }
      {
        playerProps.playing
          ? (
            <svg
              className="mini-player-svg"
              onClick={playerProps.playerPause}
              style={{
                minWidth: '24px', minHeight: '24px', marginLeft: '7px', marginRight: '7px',
              }}
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
            >
              <path d="M25.4774 13.5C25.4774 20.4221 19.9796 26 13.2387 26C6.49779 26 1 20.4221 1 13.5C1 6.57793 6.49779 1 13.2387 1C19.9796 1 25.4774 6.57793 25.4774 13.5Z" stroke="white" strokeWidth="2" />
              <rect x="9" y="8" width="3" height="11" rx="1.5" fill="white" />
              <rect x="14" y="8" width="3" height="11" rx="1.5" fill="white" />
            </svg>
          )
          : (
            <svg
              className="mini-player-svg"
              onClick={onPlayClick}
              style={{
                minWidth: '24px', minHeight: '24px', marginLeft: '7px', marginRight: '7px',
              }}
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
            >
              <path d="M13.5 25.4774C6.57792 25.4774 1 19.9796 1 13.2387C1 6.49779 6.57792 1 13.5 1C20.4221 1 26 6.49779 26 13.2387C26 19.9796 20.4221 25.4774 13.5 25.4774Z" stroke="white" strokeWidth="2" />
              <path d="M21 13.5L9.75 20.8612L9.75 6.13878L21 13.5Z" fill="white" />
            </svg>
          )
      }
      {
        showNextPrev
          ? (
            <svg className="mini-player-svg" onClick={playerProps.playerNext} style={{ minWidth: '24px', minHeight: '24px' }} width="27" height="27" viewBox="0 0 27 27" fill="none">
              <path d="M25.4774 13.5C25.4774 20.4221 19.9796 26 13.2387 26C6.49779 26 1 20.4221 1 13.5C1 6.57793 6.49779 1 13.2387 1C19.9796 1 25.4774 6.57793 25.4774 13.5Z" stroke="white" strokeWidth="2" />
              <rect x="6.89941" y="-1.87868" width="3" height="11" rx="1.5" transform="rotate(135 9.89941 7.87868)" fill="white" />
              <rect x="17.88808" y="3.4005" width="3" height="11" rx="1.5" transform="rotate(45 7.77808 6.1005)" fill="white" />
            </svg>
          )
          : <span />
      }
      <svg className="mini-player-svg" onClick={onShowClick} style={{ minWidth: '24px', minHeight: '24px', marginLeft: '13px' }} width="14" height="9" viewBox="0 0 14 9" fill="white">
        <path className="mini-player-path" d={ShowIcon} />
      </svg>
    </div>


  </div>
)


export const PlayerButtonsBigScreen = ({
  playerProps, onFullScreenClick, isBigScreenClick,
}) => (
  <div className="player-expand">
    <div className={playerProps.isBigScreen ? 'player-screen-control isBig' : 'player-screen-control'}>
      {
        playerProps.isBigScreen
          ? (
            <img
              src={bigScreen}
              onClick={isBigScreenClick}
              alt="fullScreen"
              className="player-volume-path"
              style={{ minWidth: '18px', minHeight: 'px', marginRight: '21px' }}
            />
          ) : (
            <img
              src={bigScreen}
              onClick={isBigScreenClick}
              alt="fullScreen"
              className="player-volume-path"
              style={{ minWidth: '24px', minHeight: '24px', marginRight: '15px' }}
            />
          )
      }
      <img
        src={fullScreen}
        onClick={onFullScreenClick}
        alt="fullScreen"
        className="player-volume-path"
        style={{ minWidth: '20px', minHeight: '20px' }}
      />
    </div>
  </div>
)

export const PlayerButtonsBigScreenHover = ({
  onCloseClick, onShowInfo, playerProps, toggleOnHover, toggleOnHoverOut,
}) => (
  <div onMouseLeave={toggleOnHoverOut} onMouseEnter={toggleOnHover} className="bigScreenInfo" style={{ width: playerProps.width, height: playerProps.height }}>
    <img
      src={cancelSvg}
      alt="cancel"
      onClick={onCloseClick}
      style={{ minWidth: '20px', minHeight: '20px', marginBottom: '16px' }}
    />
    <img
      src={infoSvg}
      alt="info"
      onClick={onShowInfo}
      style={{ minWidth: '20px', minHeight: '20px' }}
    />
  </div>
)

PlayerButtonsBigScreenHover.protoType = {
  onCloseClick: PropTypes.any,
  onShowInfo: PropTypes.any,
  playerProps: PropTypes.any,
  toggleOnHover: PropTypes.any,
  toggleOnHoverOut: PropTypes.any,
}

PlayerButtonsBigScreen.protoType = {
  onFullScreenClick: PropTypes.any,
  onShowInfo: PropTypes.any,
  playerProps: PropTypes.any,
  isBigScreenClick: PropTypes.any,
  toggleOnHoverOut: PropTypes.any,
}
