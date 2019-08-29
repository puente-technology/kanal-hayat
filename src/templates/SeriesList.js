import React from 'react'
import { graphql } from 'gatsby'
import LayoutComp from '../components/LayoutComp'
import SeriesList from '../components/SeriesList';

// Export Template for use in CMS preview
// export const AboutUsPageTemplate = data => (
//   <AboutUs {...data} />
// )

// Export Default HomePage for front-end
const SeriesListPage = (data) => {
  const { edges } = data.data.allMarkdownRemark
  return (
    <LayoutComp>
      <SeriesList data={edges} />
    </LayoutComp>
  )
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
