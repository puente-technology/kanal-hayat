import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import LayoutComp from '../components/LayoutComp'
import InfoPage from '../components/InfoPage'

// Export Template for use in CMS preview
export const InfoPageTemplate = data => (
  <InfoPage {...data} />
)

// Export Default HomePage for front-end
const InfoPageComponent = ({ data: { page } }) => (
  <LayoutComp>
    <InfoPage {...page} {...page.frontmatter} />
  </LayoutComp>
)

InfoPageComponent.propTypes = {
  data: PropTypes.any,
}

export default InfoPageComponent;

export const pageQuery = graphql`
query InfoPage($id: String!, $locale: String) {
  page: markdownRemark(id: { eq: $id }, frontmatter: { locale: { eq: $locale }}) {
    html
    frontmatter {
      template
      title
    }
  }
}
`
