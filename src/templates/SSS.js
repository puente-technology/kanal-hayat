import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import LayoutComp from '../components/LayoutComp'
import SSS from '../components/SSS'

// Export Template for use in CMS preview
// export const SSSPageTemplate = data => (
//   <SSS {...data} />
// )

// Export Default HomePage for front-end
const SSSPage = ({ data: { page } }) => (
  <LayoutComp>
    <SSS {...page} {...page.frontmatter} />
  </LayoutComp>
)

SSSPage.propTypes = {
  data: PropTypes.any,
}

export default SSSPage;

export const pageQuery = graphql`
query SSS($id: String!, $locale: String) {
  page: markdownRemark(id: { eq: $id }, frontmatter: { locale: { eq: $locale }}) {
    html
    frontmatter {
      title
      template
      locale
      slug
      questions {
          question
          answer
          videos {
            video
            title
            channel
            views
            date
          }
      }
    }
  }
}
`
