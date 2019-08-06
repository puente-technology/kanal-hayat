import React from 'react'
import { graphql } from 'gatsby'
import LayoutComp from '../components/LayoutComp'
import AboutUs from '../components/AboutUs'

// Export Template for use in CMS preview
export const HomePageTemplate = data => (
  <AboutUsPage data={data} />
)

// Export Default HomePage for front-end
const AboutUsPage = ({ data: { page } }) => (
  <LayoutComp>
    <AboutUs {...page} {...page.frontmatter} />
  </LayoutComp>
)

export default AboutUsPage;

export const pageQuery = graphql`
query AboutUs($id: String!, $locale: String) {
  page: markdownRemark(id: { eq: $id }, frontmatter: { locale: { eq: $locale }}) {
    html
    frontmatter {
      title
      template
      slug
      locale
      featuredImage
      subtitle
      content {
        about
        contactInfo
        footerInfo
        frekansInfo {
          dogu
          dikey
          saniye
          fec
        }
        introduction
      }
    }
  }
}
`
