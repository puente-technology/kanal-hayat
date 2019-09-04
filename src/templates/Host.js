import React from 'react'
import { graphql, Link } from 'gatsby'
import Nav from '../components/Nav';
import Content from '../components/Content';

import './Host.scss'

// Export Template for use in CMS preview
// export const AboutUsPageTemplate = data => (
//   <AboutUs {...data} />
// )

// Export Default HomePage for front-end
const Host = (data) => {
  const hostArr = data.data.host.nodes
  const { frontmatter } = hostArr[0]
  const hostName = frontmatter.host
  const seriesArr = data.data.series.nodes
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
                type="button"
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

// Host.propTypes = {
//   allMarkdownRemark: PropTypes.any,
// }

export default Host;

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
