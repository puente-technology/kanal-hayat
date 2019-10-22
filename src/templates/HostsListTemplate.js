/* eslint-disable no-unused-vars */
import React from 'react'
import { graphql } from 'gatsby'
import LayoutComp from '../components/LayoutComp'
import SeriesList from '../components/SeriesList';
import HostsList from '../components/HostsPage';

// Export Template for use in CMS preview
// export const AboutUsPageTemplate = data => (
//   <AboutUs {...data} />
// )

// Export Default HomePage for front-end
const HostsListPage = (data) => {
  const hostList = new Set()
  const hosts = data.data.hosts.edges
  console.log('asma data', data)
  let { edges } = data.data.allMarkdownRemark
  Object.entries(edges).forEach(([index, object]) => {
    if (object.node.frontmatter.host) {
      hostList.add(object.node.frontmatter.host)
    }
  })
  edges = {
    // title: edges[0].node && edges[0].node.frontmatter.title,
    ...edges.filter(x => x.node.fields.slug !== '/series/'),
    title: 'Sunucular',
  }
  return (
    <LayoutComp>
      <HostsList data={edges} hosts={hosts} hostList={[...hostList]} />
    </LayoutComp>

  )
}

export default HostsListPage;

export const pageQuery = graphql`
query HostsList {
  allMarkdownRemark(filter: {fields: {contentType: {regex: "/hosts/"}}}) {
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
              duration
            }
          }
          targetGroup
          language
          selectedCategories
          description
          host
          popularity
          publishDate
          title
          coverImage
        }
      }
    }
  }
  hosts: allMarkdownRemark(filter: {fields: {contentType: {regex: "/hosts/"}}}) {
    edges {
      node {
        fields {
          slug
          contentType
        }
        frontmatter {
          host
          coverImage
        }
      }
    }
  }
}
`
