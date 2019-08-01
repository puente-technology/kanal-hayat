import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import FullPageSlider from '../components/FullPageSlider';
import { HomePageSlider } from '../cms/preview-templates/HomePageSlider';

// Export Template for use in CMS preview
export const HomePageTemplate = (data) => {
    return (
      <div>
          {
            data.frontmatter ?
            <FullPageSlider autoSlide gallery={data.gallery} slideTime={5000} />
            : <HomePageSlider data={data.gallery} />
          }
      </div>
    )
}

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => {
  return (
  <Layout >
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)}

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!, $locale: String) {
    page: markdownRemark(id: { eq: $id }, frontmatter: { locale: { eq: $locale }}) {
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
          align
          color
          programName
          programTime
          programURL
        }
      }
    }
  }
`
