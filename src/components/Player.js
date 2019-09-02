import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import './Player.scss';
import {
  PlayerInfo,
  PlayerControls,
  PlayerButtons,
  PlayerBar,
  PlayerVolume,
  MiniPlayer,
  PlayerButtonsBigScreen,
  PlayerButtonsBigScreenHover,
} from './PlayerPieces'

import PlayerInfoExpand from './PlayerInfo';

const requestFullScreen = (element) => {
  // Supports most browsers and their versions.
  const requestMethod = element.requestFullScreen
  || element.webkitRequestFullScreen
  || element.mozRequestFullScreen
  || element.msRequestFullScreen;

  if (requestMethod) { // Native full screen.
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== 'undefined') { // Older IE.
    const wscript = new ActiveXObject('WScript.Shell');
    if (wscript !== null) {
      wscript.SendKeys('{F11}');
    }
  }
}

class Player extends Component {
  static propTypes = {
    location: PropTypes.object,
    playing: PropTypes.bool,
    currentType: PropTypes.string,
    currentPlaylistId: PropTypes.number,
    currentId: PropTypes.number,
    playable: PropTypes.object,
    loadingMsg: PropTypes.string,
    playerPlay: PropTypes.func,
    playerPause: PropTypes.func,
    playerNext: PropTypes.func,
    playerPrev: PropTypes.func,
    onExpandClick: PropTypes.func,
    onCollapseClick: PropTypes.func,
    hidePlayer: PropTypes.func,
    showPlayer: PropTypes.func,
    episodes: PropTypes.any,
    episodeInfo: PropTypes.any,
    handleCloseClick: PropTypes.any,
  }

  constructor(props) {
    super(props);
    this.state = {
      played: 0,
      loaded: 0,
      seeking: false,
      duration: 0,
      volume: 1,
      fullscreen: false,
      expanding: true,
      playingBool: false,
      showBool: true,
      expandedBoll: false,
      expandBool: false,
      isBigScreen: false,
      isOpen: true,
      isPlayerInfoOpen: true,
      hoverBool: false,
      showinfoBool: false,
    }

    document.addEventListener('fullscreenchange', this.onFullScreenChange, false);
    document.addEventListener('mozfullscreenchange', this.onFullScreenChange, false);
    document.addEventListener('webkitfullscreenchange', this.onFullScreenChange, false);
    document.addEventListener('msfullscreenchange', this.onFullScreenChange, false);
    this.onPlayClick = this.onPlayClick.bind(this)
    this.showPlayer = this.showPlayer.bind(this)
    this.onExpandClick = this.onExpandClick.bind(this)
    this.playerPause = this.playerPause.bind(this)
    this.isBigScreenClick = this.isBigScreenClick.bind(this)
    this.onCloseClick = this.onCloseClick.bind(this)
  }

  onFullScreenClick = () => {
    const ele = document.getElementById('reactPlayer')
    requestFullScreen(ele)
  }

  onCloseClick = () => {
    const { handleCloseClick } = this.props;
    handleCloseClick()
    this.setState({ isOpen: false })
  }

  isBigScreenClick = () => {
    const { isBigScreen, isPlayerInfoOpen } = this.state
    this.setState({
      isBigScreen: !isBigScreen,
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

  onReady = () => {
    // console.log('ready')
  }

  onStart = () => {
    // console.log('start')
  }

  onPlay = () => {
    this.setState({ playingBool: true })
  }

  onProgress = (progress) => {
    const { seeking } = this.state;
    if (progress.played === 1) {
      this.setState({ playingBool: false })
    }
    if (seeking) {
      this.setState({
        loaded: progress.loaded,
      })
    } else {
      this.setState({
        played: progress.played,
        loaded: progress.loaded,
      })
    }
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

  onPause = () => {
    this.setState({ playingBool: false })
  }

  onBuffer = () => {

  }

  onSeek = () => {

  }

  onEnded = () => {

  }

  onError = () => {
    // this.props.playerPause()
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

  onSeekMouseUp = () => {
    this.setState({ seeking: false })
    // this.player.seekTo(parseFloat(e.target.value))
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

  onCollapseClick = () => {
    // this.props.onCollapseClick()
  }

  onHideClick = () => {
    // this.props.hidePlayer()
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


  componentDidUpdate = () => {}

  componentDidMount = () => {
  }

  render = () => {
    const {
      playingBool,
      showBool,
      expandedBoll,
      expandBool,
      isBigScreen,
      isOpen,
      isPlayerInfoOpen,
      hoverBool,
      showinfoBool,
      fullscreen,
      played,
      duration,
      volume,
      loaded,
    } = this.state;
    const { episodes, episodeInfo } = this.props;
    console.log(episodeInfo)
    console.log(episodes)
    const props = {};
    const reactPlayerStyles = {}
    const isBigStyle = {}
    const showNextPrev = true;
    const showProgressThumb = true;
    props.playable = {
      style: reactPlayerStyles,
      url: episodeInfo.youtubeURL.url || '',
      show: showBool,
      playerPause: this.playerPause,
      playerPlay: this.playerPlay,
      playing: playingBool,
    }
    props.url = episodeInfo.youtubeURL.url || ''
    props.show = showBool;
    props.playerPause = this.playerPause
    props.playerPlay = this.playerPlay;
    props.playing = playingBool;
    props.expanded = expandedBoll;
    props.expand = expandBool;
    props.controls = false;
    props.isBigScreen = isBigScreen
    props.hoverBool = hoverBool
    if (fullscreen) {
      props.height = '100%'
      props.width = '100%'
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
    } else if (isBigScreen) {
      const width = this.getWidth() - 100
      const height = this.getHeight() - 100
      props.height = height
      props.width = width
      isBigStyle.margin = '30px auto'
    } else {
      props.height = '8rem';
      props.width = '16rem';
      reactPlayerStyles.position = 'absolute';
      reactPlayerStyles.bottom = '-10rem';
      reactPlayerStyles.left = '0px';
      reactPlayerStyles.zIndex = 10;
    }
    const title = episodeInfo.youtubeURL.title;
    const artist = episodeInfo.host
    const elapsed = duration * played
    const remaining = duration * (1 - played)

    props.onReady = this.onReady
    props.onStart = this.onStart
    props.onPlay = this.onPlay
    props.onProgress = this.onProgress
    props.onDuration = this.onDuration
    props.onPause = this.onPause
    props.onBuffer = this.onBuffer
    props.onSeek = this.onSeek
    props.onEnded = this.onEnded
    props.onError = this.onError
    props.progressFrequency = 100
    props.ref = this.ref
    props.volume = volume

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
        >
          <div id="playerBackdrop" className={isBigScreen ? 'player-backdrop-isBig ' : 'player-backdrop'}>
            <ReactPlayer
              id="reactPlayer"
              className={props.expand ? 'expanded' : 'collapsed'}
              style={isBigStyle}
              {...props}
            />
            {
              isBigScreen && (
                <div
                  onMouseLeave={this.toggleOnHoverOut}
                  onMouseEnter={this.toggleOnHover}
                  style={{
                    width: props.width, height: props.height, position: 'absolute', margin: '30px auto', left: '0px', right: '0px', top: '0px',
                  }}
                />
              )
            }
            {
              showinfoBool && (
                <PlayerInfoExpand playerProps={props} onCloseClick={this.onCloseInfo} />
              )
            }
            {
              hoverBool && (
                <PlayerButtonsBigScreenHover
                  onCloseClick={this.onCloseClick}
                  onShowInfo={this.onShowInfo}
                  playerProps={props}
                  toggleOnHover={this.toggleOnHover}
                  toggleOnHoverOut={this.toggleOnHoverOut}
                />
              )
              }
            {isBigScreen && (
            <div
              style={{
                width: props.width, margin: '0 auto', height: '6rem', background: 'black',
              }}
              className={['container-fluid', 'player-controls-container', props.expand ? 'expanded' : 'collapsed'].join(' ')}
            >
              <MiniPlayer
                title={title}
                playerProps={props}
                showNextPrev={showNextPrev}
                onPlayClick={this.onPlayClick}
                onShowClick={this.showPlayer}
              />
              <div className="col isBig player-control-container">
                <PlayerBar
                  elapsed={elapsed}
                  remaining={remaining}
                  played={played}
                  loaded={loaded}
                  onSeekMouseDown={this.onMouseDown}
                  onSeekChange={this.onSeekChange}
                  onSeekMouseUp={this.onSeekMouseUp}
                  showProgressThumb={showProgressThumb}
                />
                <div className="isBigControls">
                  <PlayerControls
                    playerProps={props}
                    showNextPrev={showNextPrev}
                    onPlayClick={this.onPlayClick}
                  />
                  <div className="isBigVolumeAndScreen">
                    <PlayerVolume playerProps={props} volume={volume} setVolume={this.setVolume} />
                    <PlayerButtonsBigScreen
                      playerProps={props}
                      isBigScreenClick={this.isBigScreenClick}
                      onFullScreenClick={this.onFullScreenClick}
                      onCollapseClick={this.onCollapseClick}
                      onExpandClick={this.onExpandClick}
                      onHideClick={this.onHideClick}
                      onCloseClick={this.onCloseClick}
                    />
                  </div>
                </div>
              </div>
            </div>
            )
          }
          </div>
          <MiniPlayer
            title={title}
            playerProps={props}
            showNextPrev={showNextPrev}
            onPlayClick={this.onPlayClick}
            onShowClick={this.showPlayer}
          />
          {
            isPlayerInfoOpen && (
              <div className={['container-fluid', 'player-controls-container', props.expand ? 'expanded' : 'collapsed'].join(' ')}>
                { props.expand && (
                <PlayerInfo
                  playerProps={props}
                  title={title}
                  artist={artist}
                  style={{ }}
                />
                )
              }
                <div className="row">
                  <PlayerInfo
                    playerProps={props}
                    title={title}
                    artist={artist}
                    style={props.expand ? { visibility: ' hidden' } : {}}
                  />
                  <div className="col player-control-container">
                    <PlayerControls
                      playerProps={props}
                      showNextPrev={showNextPrev}
                      onPlayClick={this.onPlayClick}
                    />
                    <PlayerBar
                      elapsed={elapsed}
                      remaining={remaining}
                      played={played}
                      loaded={loaded}
                      onSeekMouseDown={this.onMouseDown}
                      onSeekChange={this.onSeekChange}
                      onSeekMouseUp={this.onSeekMouseUp}
                      showProgressThumb={showProgressThumb}
                    />
                  </div>
                  <PlayerVolume playerProps={props} volume={volume} setVolume={this.setVolume} />
                  <PlayerButtons
                    playerProps={props}
                    isBigScreenClick={this.isBigScreenClick}
                    onFullScreenClick={this.onFullScreenClick}
                    onCollapseClick={this.onCollapseClick}
                    onExpandClick={this.onExpandClick}
                    onHideClick={this.onHideClick}
                    onCloseClick={this.onCloseClick}
                  />
                </div>
              </div>
            )
          }
        </div>
      </div>
      )
    )
  }
}

export default Player
