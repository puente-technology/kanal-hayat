import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import LayoutComp from '../components/LayoutComp'
import SeriesList from '../components/SeriesList';

// Export Template for use in CMS preview
// export const AboutUsPageTemplate = data => (
//   <AboutUs {...data} />
// )

// Export Default HomePage for front-end
const SeriesListPage = (data) => {
  const { edges } = data.data.allMarkdownRemark
  console.log({ edges });
  return (
    <LayoutComp>
      <SeriesList data={edges} />
    </LayoutComp>
  )
}

SeriesListPage.propTypes = {
  data: PropTypes.any,
}

export default SeriesListPage;

export const pageQuery = graphql`
query SeriesList {
  allMarkdownRemark(filter: {fields: {contentType: {regex: "/series//"}}}) {
    edges {
      node {
        frontmatter {
          episodes {
            host
            language
            youtubeURL {
              viewCount
              url
              title
              tags
              mediaType
              imageURL
              id
              description
            }
            targetGroup
          }
          category
          description
          host
          publishDate
          title
          coverImage
        }
      }
    }
  }
}
`
