import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout';
import FullPageSlider from '../components/FullPageSlider';

// import PageHeader from '../components/PageHeader'
// import Content from '../components/Content'
// import Layout from '../components/Layout'

// Export Template for use in CMS preview
export const HomePageTemplate = ({ gallery, subtitle, featuredImage, body }) => (
  // {
  //   gallery.map(photo =>)
  // }
  <div>
    <FullPageSlider gallery={gallery} />
  </div>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => {
  console.log({page});
  return (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)}

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      # ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
        gallery {
          alt
          image
          title
        }
      }
    }
  }
`
