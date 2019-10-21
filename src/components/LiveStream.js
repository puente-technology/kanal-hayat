import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { toggleDarkMode } from '../state/app';
import LiveNow from './LiveNow'

import './Player.scss';

const bigScreen = require('../../static/images/bigscreen.svg');
const cancelSvg = require('../../static/images/cancelicon.svg')


class Player extends Component {
  static propTypes = {
    playing: PropTypes.bool,
    handleCloseClick: PropTypes.any,
    frontmatter: PropTypes.any,
    dispatch: PropTypes.any,
    index: PropTypes.any,
    hosts: PropTypes.any,
    isBigScreen: PropTypes.any,
  }

  constructor(props) {
    super(props);
    const {
      playing,
    } = this.props;
    this.state = {
      played: 0,
      loaded: 0,
      seeking: false,
      duration: 0,
      volume: 1,
      fullscreen: false,
      expanding: true,
      playingBool: playing,
      showBool: true,
      expandedBoll: false,
      expandBool: false,
      isBigScreenState: true,
      isOpen: true,
      isPlayerInfoOpen: false,
      hoverBool: false,
      showinfoBool: true,
    }

    this.onPlayClick = this.onPlayClick.bind(this)
    this.showPlayer = this.showPlayer.bind(this)
    this.onExpandClick = this.onExpandClick.bind(this)
    this.playerPause = this.playerPause.bind(this)
    this.isBigScreenClick = this.isBigScreenClick.bind(this)
    this.onCloseClick = this.onCloseClick.bind(this)
  }

  onCloseClick = () => {
    const {
      handleCloseClick,
      dispatch,
      hosts,
      isBigScreen,
    } = this.props;
    handleCloseClick()
    dispatch(toggleDarkMode(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      hosts,
      isBigScreen,
    ))
    this.setState({ isOpen: false })
  }

  isBigScreenClick = () => {
    const { isBigScreenState, isPlayerInfoOpen } = this.state
    this.setState({
      isBigScreenState: !isBigScreenState,
      isPlayerInfoOpen: !isPlayerInfoOpen,
      expandBool: false,
    })
  }

  onShowInfo = () => {
    this.setState({ showinfoBool: true })
  }

  onCloseInfo = () => {
    this.setState({ showinfoBool: false })
  }

  onFullScreenChange = () => {
    this.setState({
      fullscreen: document.fullscreen
      || document.mozFullScreen
      || document.webkitIsFullScreen
      || document.msFullscreenElement,
    })
  }

  onPlay = () => {
    this.setState({ playingBool: true })
  }

  playerPlay = () => {
    const { playingBool } = this.state;
    this.state({ playingBool: !playingBool })
  }

  showPlayer = () => {
    const { showBool } = this.state;
    this.setState({ showBool: !showBool })
  }

  onDuration = (duration) => {
    this.setState({ duration })
  }

  setVolume = (e) => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  onSeekMouseDown = () => {
    this.setState({ seeking: true })
  }

  onSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  onSeekMouseUp = (e) => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  onPlayClick = () => {
    this.setState({ playingBool: true })
  }

  playerPause = () => {
    this.setState({ playingBool: false })
  }

  onExpandClick = () => {
    const { expandBool } = this.state;
    this.setState({ expandBool: !expandBool })
  }

  toggleOnHover = () => {
    this.setState({ hoverBool: true })
  }

  toggleOnHoverOut = () => {
    this.setState({ hoverBool: false })
  }

  ref = (player) => {
    this.player = player
  }

  getHeight = () => {
    if (typeof (window.innerWidth) === 'number') {
      // Non-IE
      return window.innerHeight;
    } if (document.documentElement
      && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
      // IE 6+ in 'standards compliant mode'
      return document.documentElement.clientHeight;
    } if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
      // IE 4 compatible
      return document.body.clientHeight;
    }
    return null;
  }

  getWidth = () => {
    if (typeof (window.innerWidth) === 'number') {
      // Non-IE
      return window.innerWidth;
    } if (document.documentElement
      && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
      // IE 6+ in 'standards compliant mode'
      return document.documentElement.clientWidth;
    } if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
      // IE 4 compatible
      return document.body.clientWidth;
    }
    return null
  }

  handleBigScreen = () => {
    this.setState({
      isBigScreenState: false,
      isPlayerInfoOpen: true,
      expandBool: false,
    })
  }

  componentDidUpdate = (prevPros) => {
    const {
      isBigScreen,
      dispatch,
      index,
      frontmatter,
      handleCloseClick,
      hosts,
    } = this.props;
    if (prevPros.isBigScreen !== isBigScreen && !prevPros.isBigScreen) {
      dispatch(toggleDarkMode(
        true,
        index,
        frontmatter,
        handleCloseClick,
        false,
        hosts,
        false,
      ))
      this.handleBigScreen()
    }
  }

  componentDidMount = () => {
  }

  onFullScreenClick = () => {
    const { isBigScreenState } = this.state;
    this.setState({ isBigScreenState: !isBigScreenState })
  }

  onFullCloseScreenClick = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen })
  }

  render = () => {
    const {
      playingBool,
      showBool,
      expandedBoll,
      expandBool,
      isBigScreenState,
      isOpen,
      hoverBool,
      showinfoBool,
      fullscreen,
    } = this.state;
    const props = {};
    const reactPlayerStyles = {}
    const isBigStyle = {}
    props.show = showBool;
    props.playing = playingBool;
    props.expanded = expandedBoll;
    props.expand = expandBool;
    props.controls = false;
    props.isBigScreen = isBigScreenState
    props.hoverBool = hoverBool
    props.showinfoBool = showinfoBool
    if (fullscreen) {
      props.height = '100%'
      props.width = '100%'
      props.controls = true
    } else if (props.expand) {
      const width = 461
      const height = 260
      props.height = height
      props.width = width
      reactPlayerStyles.position = 'absolute';
      reactPlayerStyles.top = '50%';
      reactPlayerStyles.height = '26rem';
      reactPlayerStyles.marginTop = -Math.round(props.height / 2);
      reactPlayerStyles.left = '50%';
      reactPlayerStyles.marginLeft = -Math.round(props.width / 2);
    } else if (isBigScreenState) {
      const width = this.getWidth() * 0.6
      const height = this.getHeight() * 0.5
      props.height = height
      props.width = width
      isBigStyle.margin = '8% auto'
      isBigStyle.marginBottom = '0px'
      isBigStyle.display = 'flex'
      isBigStyle.justifyContent = 'center'
      isBigStyle.flexDirection = 'column'
    } else {
      props.height = '8rem';
      props.width = '16rem';
      reactPlayerStyles.position = 'absolute';
      reactPlayerStyles.bottom = '-10rem';
      reactPlayerStyles.left = '0px';
      reactPlayerStyles.zIndex = 10;
    }
    props.progressFrequency = 100
    props.ref = this.ref
    console.log('asma this.getWidth()', this.getWidth())
    return (
      isOpen && (
      <div style={{ backgroundColor: '#3d3d3d' }}>
        <div id="playerSpaceHolder" className={props.show ? 'show' : 'hide'} />
        <div
          id="player"
          className={[
            props.expand ? 'expanded' : 'collapsed',
            props.show ? 'show' : 'hide',
            props.isBigScreen ? 'isBig' : '',
          ].join(' ')}
          style={{ height: !isBigScreenState && 'auto', backgroundColor: 'rgba(33, 37, 41, 0.8)' }}
        >
          <div id="playerBackdrop" className="'player-backdrop isBig" style={{ display: 'flex', flexDirection: isBigScreenState ? 'column' : 'row' }}>
            <div
              className="live-stream-video-container"
              style={isBigScreenState ? isBigStyle
                : { width: isBigScreenState ? '40%' : this.getWidth() < 700 ? '100% !important' : '40%', display: 'flex', flexDirection: 'column-reverse' }}
            >
              <iframe
                title="live"
                id="ls_embed_1518597697"
                src="https://livestream.com/accounts/7475784/events/8817566/player?width=320&height=180&enableInfoAndActivity=true&defaultDrawer=&autoPlay=true&mute=false"
                width={isBigScreenState ? props.width : '100%'}
                height={isBigScreenState ? props.height : '100%'}
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                className="iframe"
              />
              <div
                className="expand-view"
                style={{
                  width: '100%',
                  height: 35,
                  backgroundColor: 'black',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  justifyContent: 'flex-start',
                }}
              >
                <buttom
                  type="buttom"
                  style={{
                    background: `url(${cancelSvg}) no-repeat`,
                    backgroundSize: 'contain',
                    border: 'none',
                    minWidth: '25px',
                    minHeight: '20px',
                    margin: '10px',
                  }}
                  onClick={this.onFullCloseScreenClick}
                  className="player-volume-path"
                />
                <buttom
                  type="buttom"
                  style={{
                    background: `url(${bigScreen}) no-repeat`,
                    backgroundSize: 'contain',
                    border: 'none',
                    minWidth: '25px',
                    minHeight: '20px',
                    margin: '10px',
                  }}
                  onClick={this.onFullScreenClick}
                  className="player-volume-path"
                />
              </div>
            </div>
            {true && (
            <div
              style={{
                width: isBigScreenState ? props.width : '60%',
                margin: isBigScreenState ? 'auto' : 0,
                // height: isBigScreenState && '200px',
                background: 'black',
                position: 'relative',
                padding: 0,
                display: this.getWidth() < 700 ? !isBigScreenState && 'none' : 'table',
              }}
              className={['container-fluid', 'player-controls-container', props.expand ? 'expanded' : 'collapsed', isOpen && 'live-stream'].join(' ')}
            >
              <div className="col isBig player-control-container">
                <div className="isBigControls">
                  <LiveNow isLiveStream={isOpen} />
                </div>
              </div>
            </div>
            )
          }
          </div>
        </div>
      </div>
      )
    )
  }
}

export default connect(state => ({
  episodeInfo: state.app.episode || '',
  episodes: state.app.episodes || '',
  playing: state.app.playing || '',
  frontmatter: state.app.frontmatter || '',
  index: state.app.index || '',
  handleCloseClick: state.app.handleCloseClick || '',
  isActive: state.app.isOpen || '',
  hosts: state.app.hosts || '',
  isBigScreen: state.app.isBigScreen,
}), null)(Player)
