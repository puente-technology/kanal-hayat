import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'
import { toggleDarkMode } from '../state/app';

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
    frontmatter: PropTypes.any,
    playerIndex: PropTypes.any,
    dispatch: PropTypes.any,
    index: PropTypes.any,
    hosts: PropTypes.any,
    isBigScreen: PropTypes.any,
  }

  constructor(props) {
    super(props);
    const {
      playing,
      episodeInfo,
      episodes,
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
      episodesInfo: episodes,
      episode: episodeInfo,
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
    this.playerNext = this.playerNext.bind(this)
  }

  onFullScreenClick = () => {
    const ele = document.getElementById('reactPlayer')
    // ele.addEventListener('dbclick', this.handleDoubleClick)
    requestFullScreen(ele)
  }

  // handleDoubleClick = () => {
  //   const ele = document.getElementById('reactPlayer')
  //   if (ele.exitFullscreen) {
  //     ele.exitFullscreen();
  //   } else if (ele.mozCancelFullScreen) {
  //     ele.mozCancelFullScreen();
  //   } else if (ele.webkitCancelFullScreen) {
  //     ele.webkitCancelFullScreen();
  //   }
  // }

  playerNext = () => {
    const {
      index,
      frontmatter,
      handleCloseClick,
      episodes,
      dispatch,
      hosts,
      isBigScreen,
    } = this.props;
    if (index < episodes.length - 1) {
      dispatch(toggleDarkMode(
        episodes[index + 1],
        episodes,
        true,
        index + 1,
        frontmatter,
        handleCloseClick,
        false,
        hosts,
        isBigScreen,
      ))
    }
  }

  playerPrev = () => {
    const {
      index,
      frontmatter,
      handleCloseClick,
      episodes,
      dispatch,
      hosts,
      isBigScreen,
    } = this.props;
    if (index > 0) {
      dispatch(toggleDarkMode(
        episodes[index - 1],
        episodes,
        true,
        index - 1,
        frontmatter,
        handleCloseClick,
        false,
        hosts,
        isBigScreen,
      ))
    }
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

  onReady = () => {
    // console.log('ready')
  }

  onStart = () => {
    // console.log('start')
  }

  onPlay = () => {
    this.setState({ playingBool: true })
  }

  handleVideoUrlChange = (episodeInfo, episodes) => {
    const {
      dispatch,
      index,
      frontmatter,
      handleCloseClick,
      hosts,
      isBigScreen,
    } = this.props;
    dispatch(toggleDarkMode(
      episodeInfo,
      episodes,
      true,
      index,
      frontmatter,
      handleCloseClick,
      false,
      hosts,
      isBigScreen,
    ))
    this.setState({ episode: episodeInfo, episodesInfo: episodes })
  }

  onProgress = (progress) => {
    const { seeking } = this.state;
    if (progress.played === 1) {
      this.setState({ playingBool: false })
      this.playerNext()
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

  urlChange = () => {
    const { episodeInfo } = this.props;
    this.setState({ episode: episodeInfo })
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
      episodeInfo,
      isBigScreen,
      dispatch,
      episodes,
      index,
      frontmatter,
      handleCloseClick,
      hosts,
    } = this.props;
    if (prevPros.isBigScreen !== isBigScreen && !prevPros.isBigScreen) {
      dispatch(toggleDarkMode(
        episodeInfo,
        episodes,
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

    if (episodeInfo.youtubeURL.url !== prevPros.episodeInfo.youtubeURL.url) {
      this.urlChange()
    }
  }

  componentDidMount = () => {
  }

  render = () => {
    const {
      playingBool,
      showBool,
      expandedBoll,
      expandBool,
      isBigScreenState,
      isOpen,
      isPlayerInfoOpen,
      hoverBool,
      showinfoBool,
      fullscreen,
      played,
      duration,
      volume,
      loaded,
      episode,
      episodesInfo,
    } = this.state;
    const {
      frontmatter,
      playerIndex,
      hosts,
    } = this.props;
    const props = {};
    const reactPlayerStyles = {}
    const isBigStyle = {}
    const showNextPrev = true;
    const showProgressThumb = true;
    props.playable = {
      style: reactPlayerStyles,
      url: episode.youtubeURL.url,
      show: showBool,
      playerPause: this.playerPause,
      playerPlay: this.playerPlay,
      playing: playingBool,
    }
    props.url = episode.youtubeURL.url;
    props.show = showBool;
    props.playerPause = this.playerPause
    props.playerPlay = this.playerPlay;
    props.playerNext = this.playerNext;
    props.playerPrev = this.playerPrev;
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
      const width = this.getWidth() - 460
      const height = this.getHeight() - 200
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
    const { title } = episode.youtubeURL || ''
    const artist = frontmatter.host || ''
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
          <div id="playerBackdrop" className={isBigScreenState ? 'player-backdrop-isBig ' : 'player-backdrop'}>
            <ReactPlayer
              ref={this.ref}
              id="reactPlayer"
              className={props.expand ? 'expanded' : 'collapsed'}
              style={isBigStyle}
              {...props}
            />
            {
              isBigScreenState && (
                <div
                  onMouseLeave={this.toggleOnHoverOut}
                  onMouseEnter={this.toggleOnHover}
                  style={{
                    width: props.width, height: props.height, position: 'absolute', margin: '30px auto', left: '0px', right: '0px', top: '0px',
                  }}
                  className="hovering-container"
                />
              )
            }
            {
              showinfoBool && (
                <PlayerInfoExpand
                  playerProps={props}
                  onCloseClick={this.onCloseInfo}
                  episodeInfo={episode}
                  episodes={episodesInfo}
                  frontmatter={frontmatter}
                  playerIndex={playerIndex}
                  handleVideoUrlChange={this.handleVideoUrlChange}
                />
              )
            }
            {
              true && (
                <PlayerButtonsBigScreenHover
                  onCloseClick={this.onCloseClick}
                  onShowInfo={this.onShowInfo}
                  playerProps={props}
                  toggleOnHover={this.toggleOnHover}
                  toggleOnHoverOut={this.toggleOnHoverOut}
                />
              )
              }
            {isBigScreenState && (
            <div
              style={{
                // width: props.width,
                margin: '71px auto !important',
                height: '6rem',
                background: 'black',
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
                  onSeekMouseDown={this.onSeekMouseDown}
                  onSeekChange={this.onSeekChange}
                  onSeekMouseUp={this.onSeekMouseUp}
                  showProgressThumb={showProgressThumb}
                />
                <div className="isBigControls">
                  <div className="dummyDiv" style={{ width: '25%' }} />
                  <PlayerControls
                    playerProps={props}
                    playerNext={this.playerNext}
                    playerPrev={this.playerPrev}
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
            playerNext={this.playerNext}
            playerPrev={this.playerPrev}
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
                    hosts={hosts}
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
                      onSeekMouseDown={this.onSeekMouseDown}
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
