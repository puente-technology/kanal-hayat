import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import LayoutComp from '../components/LayoutComp'
import ContactUsPage from '../components/ContactUs'

// Export Template for use in CMS preview
export const ContactUsTemplate = data => (
  <ContactUsPage {...data} />
)

// Export Default HomePage for front-end
const ContactUs = ({ data: { page } }) => (
  <LayoutComp>
    <ContactUsPage {...page} {...page.frontmatter} />
  </LayoutComp>
)

ContactUs.propTypes = {
  data: PropTypes.any,
}

export default ContactUs;

export const pageQuery = graphql`
query ContactUs($id: String!, $locale: String) {
  page: markdownRemark(id: { eq: $id }, frontmatter: { locale: { eq: $locale }}) {
    html
    frontmatter {
      template
      address
      email
      header
      telefon
      title
    }
  }
}
`
