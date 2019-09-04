import React, { Component } from 'react'
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { nFormatter } from '../utils/utils';
import { toggleDarkMode } from '../state/app';


class SerieInfo extends Component {
  static propTypes = {
    frontmatter: PropTypes.any,
    handleCardCloseClick: PropTypes.any,
    slug: PropTypes.any,
    dispatch: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  hanndlePlayClick = (e) => {
    const { dispatch, frontmatter } = this.props
    const { episodes } = frontmatter;
    const { episode, index } = JSON.parse(e.target.parentElement.value)
    this.setState({ isOpen: true })
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
    const { isOpen } = this.state;
    const {
      frontmatter,
      handleCardCloseClick,
      slug,
    } = this.props;
    const { episodes } = frontmatter;
    const limitedEpisodes = episodes.slice(0, 3)
    return (
      <div className="SerieCardInformation">
        <button onClick={handleCardCloseClick} type="button" className="Close" />
        <div className="InformationTitle">
          {frontmatter.title}
        </div>
        <div className="InformationHost">
          {frontmatter.host}
        </div>
        <div className="InformationDesc">
          {frontmatter.description.slice(0, 500)}
        </div>
        <div className="Episodes">
          <span className="EpisodesTitle">Bölümler</span>
          <Link
            to={slug}
            className="EpisodesAll"
          >
            Tümünü Gör
          </Link>
        </div>
        <div className="InformationEpisodes">
          {
            limitedEpisodes.map((episode, index) => (
              <div className="Episode">
                <button
                  type="button"
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
                    {`${episode.youtubeURL.title.slice(0, 25)}: ${episode.youtubeURL.description.slice(0, 25)}`}
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
      </div>
    )
  }
}
export default connect(state => ({
  test: state,
}), null)(SerieInfo)
