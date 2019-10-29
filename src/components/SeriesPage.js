import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { nFormatter, dateConverter } from '../utils/utils';
import { toggleDarkMode } from '../state/app';

class SeriesPage extends Component {
  static propTypes = {
    episodes: PropTypes.any.isRequired,
    frontmatter: PropTypes.any.isRequired,
    dispatch: PropTypes.any,
    hosts: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }


  hanndlePlayClick = (e) => {
    const {
      dispatch,
      episodes,
      frontmatter,
      hosts,
    } = this.props
    console.log('asma series page', this.props)
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
                  {dateConverter(episode.youtubeURL.duration)}
                </div>
              </button>
              <div className="minicontainer">
                <span className="subminititle">
                  <span className="title">
                    {`${episode.youtubeURL.title}`}
                  </span>
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
  hosts: state.app.hosts,
}), null)(SeriesPage)
