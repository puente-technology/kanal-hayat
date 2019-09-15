/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { PureComponent } from 'react'
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { nFormatter } from '../utils/utils';
import { toggleDarkMode } from '../state/app';


class SerieInfo extends PureComponent {
  static propTypes = {
    frontmatter: PropTypes.any,
    handleCardCloseClick: PropTypes.any,
    slug: PropTypes.any,
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

  getHostUrl = (hostName) => {
    const { hosts } = this.props
    console.log(hosts)
    if (hosts) {
      const result = hosts.map((el) => {
        const { fields, frontmatter } = el.node
        if (frontmatter.host === hostName) {
          return fields.slug
        }
      })
      return result
    }
  }

  hanndlePlayClick = (e) => {
    const {
      dispatch,
      frontmatter,
      durations,
      hosts,
    } = this.props
    const { episodes } = frontmatter
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
          <Link
            to={this.getHostUrl(frontmatter.host)}
          >
            {frontmatter.host}
          </Link>
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
                    background: `url(${episode.youtubeURL.imageURL}) 50%`,
                    backgroundSize: 'cover',
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
  shouldInit: state.app.shouldInit,
  durations: state.app.durations,
  hosts: state.app.hosts,
}), null)(SerieInfo)
