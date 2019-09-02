/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { nFormatter } from '../utils/utils';
import Player from './Player'

class SeriesPage extends Component {
  static propTypes = {
    episodes: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeEpisode: null,
    };
  }

  hanndlePlayClick = (episode) => {
    console.log(episode)
    this.setState({ isOpen: true, activeEpisode: episode })
  }

  handleCloseClick = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const { episodes } = this.props;
    const { isOpen, activeEpisode } = this.state;
    return (
      <div className="SeriesPage">
        {
          episodes.map((episode, index) => (
            <div className="Episode">
              <div
                key={index}
                onClick={() => this.hanndlePlayClick(episode)}
                style={{
                  background: `url(${episode.youtubeURL.imageURL})`,
                  backgroundSize: 'cover',
                  position: 'relative',
                }}
                className="EpisodeVideo"
              >
                <div className="playParavan" />
              </div>
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
              {isOpen && (
                <Player
                  episodes={episodes}
                  episodeInfo={activeEpisode}
                  handleCloseClick={this.handleCloseClick}
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
