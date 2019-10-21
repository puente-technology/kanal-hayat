/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { PureComponent } from 'react'
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { nFormatter, dateConverter } from '../utils/utils';
import { toggleDarkMode } from '../state/app';


class SerieInfo extends PureComponent {
  static propTypes = {
    frontmatter: PropTypes.any,
    handleCardCloseClick: PropTypes.any,
    slug: PropTypes.any,
    dispatch: PropTypes.any,
    hosts: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      hostSlugs: {},
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.getHostUrl()
    if (this.myRef.current) {
      this.myRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  getHostUrl = () => {
    const { hosts } = this.props
    let dqsdqs = { }
    if (hosts) {
      const result = hosts.map((el) => {
        const { fields, frontmatter } = el.node
        dqsdqs = { ...dqsdqs, [frontmatter.host]: fields.slug }
      })
      this.setState({ hostSlugs: dqsdqs })
      return result
    }
  }

  hanndlePlayClick = (e) => {
    const {
      dispatch,
      frontmatter,
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
      hosts,
      false,
    ))
  }

  handleCloseClick = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const { isOpen, hostSlugs } = this.state;
    const {
      frontmatter,
      handleCardCloseClick,
      slug,
    } = this.props;
    const { episodes } = frontmatter;
    const limitedEpisodes = episodes.slice(0, 3)
    return (
      <div ref={this.myRef} className="SerieCardInformation">
        <button onClick={handleCardCloseClick} type="button" className="Close" />
        <div className="InformationTitle">
          {frontmatter.title}
        </div>
        <div className="InformationHost">
          <Link
            to={hostSlugs[frontmatter.host]}
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
                    {dateConverter(episode.youtubeURL.duration)}
                  </div>
                </button>
                <div className="minicontainer">
                  <span className="subminititle">
                    {`${episode.youtubeURL.title}`}
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
  // hosts: state.app.hosts,
}), null)(SerieInfo)
