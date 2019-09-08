import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import LayoutComp from '../components/LayoutComp'
import AboutUs from '../components/AboutUs'

// Export Template for use in CMS preview
export const AboutUsPageTemplate = data => (
  <AboutUs {...data} />
)

// Export Default HomePage for front-end
const AboutUsPage = ({ data: { page } }) => (
  <LayoutComp>
    <AboutUs {...page} {...page.frontmatter} />
  </LayoutComp>
)

AboutUsPage.propTypes = {
  data: PropTypes.any,
}

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
