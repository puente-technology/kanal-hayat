import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { nFormatter } from '../utils/utils';
import Player from './Player'
import { toggleDarkMode } from '../state/app';

class SeriesPage extends Component {
  static propTypes = {
    episodes: PropTypes.any.isRequired,
    frontmatter: PropTypes.any.isRequired,
    dispatch: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeEpisode: null,
      activeIndex: null,
    };
  }

  hanndlePlayClick = (e) => {
    const { dispatch, episodes, frontmatter } = this.props
    const { episode, index } = JSON.parse(e.target.parentElement.value)
    this.setState({ isOpen: true, activeEpisode: episode, activeIndex: index })
    dispatch(toggleDarkMode(
      episode,
      episodes,
      true,
      index,
      frontmatter,
      this.handleCloseClick,
    ))
  }

  handleCloseClick = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const { episodes, frontmatter } = this.props;
    const { isOpen, activeEpisode, activeIndex } = this.state;
    return (
      <div className="SeriesPage">
        {
          episodes.map((episode, index) => (
            <div key={index} className="Episode">
              <button
                type="button"
                key={index}
                value={JSON.stringify({ episode, index })}
                onClick={this.hanndlePlayClick}
                style={{
                  background: `url(${episode.youtubeURL.imageURL}) 50%`,
                  position: 'relative',
                }}
                className="EpisodeVideo"
              >
                <div className="playParavan" />
              </button>
              <div className="minicontainer">
                <span className="subminititle">
                  <span className="title">
                    {`${episode.youtubeURL.title.slice(0, 25)}: `}
                  </span>
                  {`${episode.youtubeURL.description.slice(0, 25)}`}
                </span>
                <span className="details">
                  <span>
                    KanalHayat
                  </span>
                  <span style={{ paddingLeft: '15px' }}>
                    {`• ${nFormatter(episode.youtubeURL.viewCount)}`}
                  </span>
                  {/* {frontmatter.channelTitle} */}
                </span>
              </div>
              {isOpen && activeEpisode && activeIndex === index && (
                <Player
                  episodes={episodes}
                  episodeInfo={activeEpisode}
                  handleCloseClick={this.handleCloseClick}
                  frontmatter={frontmatter}
                  playerIndex={index}
                  playing
                />
              )}
            </div>
          ))
        }
      </div>
    )
  }
}

export default connect(state => ({
  test: state,
}), null)(SeriesPage)
