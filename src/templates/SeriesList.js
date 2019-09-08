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
  let { edges } = data.data.allMarkdownRemark
  edges = {
    // title: edges[0].node && edges[0].node.frontmatter.title,
    ...edges.filter(x => x.node.fields.slug !== '/series/'),
    title: 'Seriler',
  }
  return (
    <LayoutComp>
      <SeriesList data={edges} />
    </LayoutComp>

  )
}

export default SeriesListPage;

export const pageQuery = graphql`
query SeriesList {
  allMarkdownRemark(filter: {fields: {contentType: {regex: "/series/|/series-page/"}}}) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          episodes {
            guests
            youtubeURL {
              viewCount
              url
              title
              tags
              mediaType
              imageURL
              id
              description
              publishedAt
            }
          }
          targetGroup
          language
          selectedCategories
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
