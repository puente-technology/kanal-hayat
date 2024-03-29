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
    divHeight: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      widthClient: null,
    };
  }


  componentDidMount() {
    this.setState({ widthClient: this.getWidth() })
  }

  hanndlePlayClick = (e) => {
    const {
      dispatch,
      episodes,
      frontmatter,
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
      hosts,
      false,
    ))
  }


  handleCloseClick = () => {
    this.setState({ isOpen: false })
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

  render() {
    const { episodes, divHeight } = this.props;
    const { isOpen, widthClient } = this.state;
    return (
      <div className="SeriesPage" style={widthClient < 700 ? { paddingTop: divHeight - 175 } : {}}>
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
