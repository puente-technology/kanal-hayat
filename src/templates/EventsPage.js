import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import LayoutComp from '../components/LayoutComp'
import Events from '../components/Events';

// Export Template for use in CMS preview
// export const ContactUsTemplate = data => (
//   <ContactUsPage {...data} />
// )

// Export Default HomePage for front-end
const EventsPage = ({ data: { page } }) => (
  <LayoutComp>
    <Events eventList={page.frontmatter.eventList} />
  </LayoutComp>
)

EventsPage.propTypes = {
  data: PropTypes.any,
}

export const pageQuery = graphql`
query Events($id: String!, $locale: String) {
  page: markdownRemark(id: { eq: $id }, frontmatter: { locale: { eq: $locale }}) {
    frontmatter {
      eventList {
        title
        subtitle
        time {
          days
          startTimeH
          startTimeM
        }
      }
    }
  }
}
`

export default EventsPage;
