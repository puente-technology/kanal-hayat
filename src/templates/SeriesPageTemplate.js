
import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import LayoutComp from '../components/LayoutComp'
import SeriesPage from '../components/SeriesPage';

// Export Template for use in CMS preview
// export const AboutUsPageTemplate = data => (
//   <AboutUs {...data} />
// )

// Export Default HomePage for front-end
const SeriesPageTemplate = ({ data: { page } }) => (
  <LayoutComp>
    <SeriesPage {...page} {...page.frontmatter} />
  </LayoutComp>
)

SeriesPageTemplate.propTypes = {
  data: PropTypes.any,
}

export default SeriesPageTemplate;

export const pageQuery = graphql`
query SeriesPageTemplate($id: String!, $locale: String) {
  page: markdownRemark(id: { eq: $id }, frontmatter: { locale: { eq: $locale }}) {
    html
  }
}
`
