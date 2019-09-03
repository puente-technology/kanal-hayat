import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { nFormatter } from '../utils/utils';
import Player from './Player'

class SeriesPage extends Component {
  static propTypes = {
    episodes: PropTypes.any.isRequired,
    frontmatter: PropTypes.any.isRequired,
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
    const { episode, index } = JSON.parse(e.target.parentElement.value)
    this.setState({ isOpen: true, activeEpisode: episode, activeIndex: index })
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
            <div className="Episode">
              <button
                type="button"
                key={index}
                value={JSON.stringify({ episode, index })}
                onClick={this.hanndlePlayClick}
                style={{
                  background: `url(${episode.youtubeURL.imageURL})`,
                  backgroundSize: 'cover',
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

export default SeriesPage;
