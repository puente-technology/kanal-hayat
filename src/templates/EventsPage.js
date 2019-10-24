/* eslint-disable array-callback-return */
import React from 'react'
import { graphql } from 'gatsby'
import moment from 'moment'
import PropTypes from 'prop-types'
import LayoutComp from '../components/LayoutComp'
import Events from '../components/Events';
import EventsPreviewTemplate from '../cms/preview-templates/Events';

// Export Template for use in CMS preview
export const EventsTemplate = (data) => {
  let eventData
  if (data.mdfiles) {
    if (data.mdfiles.edges) {
      data.mdfiles.edges.map((obj) => {
        const time = moment(obj.node.frontmatter.title, 'YYYY MM DD')
        if (moment(time).isSame(moment().format('YYYY MM DD'), 'week')) {
          eventData = obj.node.frontmatter.eventList
        }
      })
    }
  }
  return (
    <React.Fragment>
      {
        data.frontmatter
          ? <Events title={data.frontmatter.title} eventList={eventData} />
          : <EventsPreviewTemplate eventList={data.eventList} />
      }
    </React.Fragment>
  )
}

// Export Default HomePage for front-end
const EventsPage = ({ data: { page, mdfiles } }) => (
  <LayoutComp>
    <EventsTemplate {...page} {...page.frontmatter} mdfiles={mdfiles} />
  </LayoutComp>
)

EventsPage.propTypes = {
  data: PropTypes.any,
}

export const pageQuery = graphql`
query Events($id: String!, $locale: String) {
  page: markdownRemark(id: { eq: $id }, frontmatter: { locale: { eq: $locale }}) {
    frontmatter {
      title
      eventList {
        seriesInfo {
          serieNames {
            series {
              label
              value
            }
            subtitles {
              label
              value
            }
          }
        }
        time {
          days
          startTime
          endTime
        } 
      }
    }
  }
  mdfiles :  allMarkdownRemark(filter: {fields: {contentType: {regex: "/yayin/"}}}) {
    edges {
      node {
        frontmatter {
          title
          eventList {
            seriesInfo {
              serieNames {
                series {
                  label
                  value
                }
                subtitles {
                  label
                  value
                }
              }
            }
            time {
              days
              startTime
              endTime
            }
          }
        }
      }
    }
  }
}
`

export default EventsPage;
