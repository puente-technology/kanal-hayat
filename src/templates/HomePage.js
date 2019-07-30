import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/LayoutComponent'
import FullPageSlider from '../components/FullPageSlider';

// Export Template for use in CMS preview
export const HomePageTemplate = ({ gallery, subtitle, featuredImage, body }) => (
  <div>
    <FullPageSlider gallery={gallery} />
  </div>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => {
  console.log({page});
  return (
  <Layout>
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)}

export default HomePage

export const pageQuery = graphql`
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
