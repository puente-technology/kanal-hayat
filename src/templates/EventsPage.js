import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import LayoutComp from '../components/LayoutComp'
import Events from '../components/Events';
import EventsPreviewTemplate from '../cms/preview-templates/Events';

// Export Template for use in CMS preview
export const EventsTemplate = (data) => {
  console.log({ data });
  return (
    <React.Fragment>
      {
        data.frontmatter
          ? <Events eventList={data.eventList} />
          : <EventsPreviewTemplate eventList={data.eventList} />
      }
    </React.Fragment>
  )
}

// Export Default HomePage for front-end
const EventsPage = ({ data: { page } }) => (
  <LayoutComp>
    <EventsTemplate {...page} />
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
          startTime
        }
      }
    }
  }
}
`

export default EventsPage;
