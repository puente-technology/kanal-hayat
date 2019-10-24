import React, { PureComponent } from 'react'
import { graphql, Link } from 'gatsby'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Nav from '../components/Nav';
import Content from '../components/Content';
import { toggleDarkMode } from '../state/app';


import './Host.scss'

class Host extends PureComponent {
  static propTypes = {
    data: PropTypes.any,
    dispatch: PropTypes.any,
    hosts: PropTypes.any,
    episode: PropTypes.any,
    episodes: PropTypes.any,
    handleCloseClick: PropTypes.any,
    frontmatter: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {
      dispatch,
      hosts,
      episode,
      episodes,
      handleCloseClick,
      frontmatter,
    } = this.props

    dispatch(toggleDarkMode(
      episode,
      episodes,
      true,
      '',
      frontmatter,
      handleCloseClick,
      false,
      hosts,
      true,
    ))
  }


  render() {
    const {
      data,
    } = this.props
    const hostArr = data.host.nodes
    const { frontmatter } = hostArr[0]
    const hostName = frontmatter.host
    const seriesArr = data.series.nodes
    const series = seriesArr.filter(x => x.frontmatter.host === hostName)
    return (
      <React.Fragment>
        <div
          style={{ background: `url(${frontmatter.coverImage})` }}
          className="HostContainer"
        >
          <Nav color="light" />
        </div>
        <div className="HostDescription">
          <Content source={frontmatter.html} />
        </div>
        <div className="HostSeries">
          <span className="HostTile">
          PROGRAMLAR
            <img alt="Programlar" src="/images/Polygondown.png" />
          </span>
          <div className="HostSeries">
            {
            series.map((serie, key) => (
              <div
                key={key}
                style={{
                  background: `url(${serie.frontmatter.coverImage})`,
                }}
                className="SerieCard"

              >
                <Link to={serie.fields.slug}>
                  <button
                    type="button"
                    value={frontmatter.title}
                    className="paravan"
                  />
                </Link>

                <div className="SpanContainer">
                  <span className="SerieCardTitle">
                    {serie.frontmatter.title}
                  </span>
                  <span className="SerieCardHost">
                    {serie.frontmatter.host}
                  </span>
                </div>
              </div>

            ))
          }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  // hosts: state.app.hosts,
  episode: state.app.episode,
  episodes: state.app.episodes,
  handleCloseClick: state.app.handleCloseClick,
  frontmatter: state.app.frontmatter,

}), null)(Host)


export const pageQuery = graphql`
query Host($slug: String!) {
  host: allMarkdownRemark(filter: { fields: { slug: { eq: $slug } }}) {
    nodes {
      frontmatter {
        host
        coverImage
        html
        episodes {
          youtubeURL {
            imageURL
            title
          }
          guests
        }
      }
    }
  }

  series: allMarkdownRemark(filter: {fields: {contentType: {regex: "/series/"}}}) {
    nodes {
      frontmatter {
          host
          publishDate
          title
          coverImage
      }
      fields {
          slug
        }
    }
  }
}
`
