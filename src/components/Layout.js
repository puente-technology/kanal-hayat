import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux';
import Helmet from 'react-helmet'
import PropTypes from 'prop-types';
import Player from './Player';
import LiveStream from './LiveStream'

class LayoutComp extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    frontmatter: PropTypes.any,
    episode: PropTypes.any,
    episodes: PropTypes.any,
    playing: PropTypes.any,
    index: PropTypes.any,
    handleCloseClick: PropTypes.any,
    liveStream: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      children,
      episode,
      episodes,
      index,
      frontmatter,
      handleCloseClick,
      playing,
      liveStream,
    } = this.props
    return (
      <Fragment>
        <Helmet>
          <link href="https://ucarecdn.com" rel="preconnect" crossOrigin />
          <link rel="dns-prefetch" href="https://ucarecdn.com" />
          <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" />
        </Helmet>
        <div className="MainDiv">
          <Fragment>{children}</Fragment>
          {
            episode && (
              <Player
                episodeInfo={episode}
                episodes={episodes}
                playing={playing}
                playerIndex={index}
                handleCloseClick={handleCloseClick}
                frontmatter={frontmatter}
              />
            )
          }
          {liveStream && (
            <LiveStream />
          )}
        </div>
      </Fragment>
    )
  }
}

export default connect(state => ({
  episode: state.app.episode || null,
  episodes: state.app.episodes || null,
  playing: state.app.playing || null,
  frontmatter: state.app.frontmatter || null,
  index: state.app.index || null,
  handleCloseClick: state.app.handleCloseClick || null,
  isActive: state.app.isOpen || null,
  liveStream: state.app.liveStream || null,
}), null)(LayoutComp)
