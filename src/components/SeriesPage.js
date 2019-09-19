/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { nFormatter } from '../utils/utils';
import { toggleDarkMode } from '../state/app';

class SeriesPage extends Component {
  static propTypes = {
    episodes: PropTypes.any.isRequired,
    frontmatter: PropTypes.any.isRequired,
    dispatch: PropTypes.any,
    durations: PropTypes.any,
    hosts: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  getDuration = (episode) => {
    const { durations } = this.props
    const result = durations.map((el) => {
      if (el[episode.youtubeURL.id]) {
        return el[episode.youtubeURL.id]
      }
    })
    return result
  }


  hanndlePlayClick = (e) => {
    const {
      dispatch,
      episodes,
      frontmatter,
      durations,
      hosts,
    } = this.props
    const { episode, index } = JSON.parse(e.target.value)
    this.setState({ isOpen: true })
    dispatch(toggleDarkMode(
      episode,
      episodes,
      true,
      index,
      frontmatter,
      this.handleCloseClick,
      false,
      durations,
      false,
      hosts,
      false,
    ))
  }

  handleCloseClick = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const { episodes } = this.props;
    const { isOpen } = this.state;
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
                <div className="playParavan">
                  {this.getDuration(episode)}
                </div>
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
                  {isOpen}
                </span>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default connect(state => ({
  test: state,
  durations: state.app.durations,
  hosts: state.app.hosts,
}), null)(SeriesPage)
