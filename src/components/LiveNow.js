/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';

import { StaticQuery, graphql } from 'gatsby'
import { sortTimeString } from '../utils/utils';

export default () => (
  <StaticQuery
    query={graphql`
    query LiveNow {
      allMarkdownRemark(filter: {frontmatter: {template: {eq: "EventsPage"}}}) {
        nodes {
          frontmatter {
            eventList {
              subtitle
              title
              time {
                days
                startTime
              }
            }
          }
        }
      }
    }
    `}
    render={data => (
      <LiveNow eventList={data.allMarkdownRemark.nodes[0].frontmatter.eventList} />
    )}
  />
)

const LiveNow = (props) => {
  console.log({ props });
  // const {
  //   eventList,
  // } = props;

  // console.log({eventList});
  // if (eventList) {
  //   const firstLoadedDay = new Date().getDay().toString()
  //   // const { eventList } = data;
  //   const filtered = eventList.filter(event => event.time.days
  //     .some(d => d === parseInt(firstLoadedDay, 10))
  //     && event.time.startTime >= new Date().toLocaleTimeString())
  //   const filteredList = filtered.sort((sortTimeString)
  // }

  return (
    <div className="contact-us">
      AKIŞ
    </div>
  )
}

// LiveNow.propTypes = {
//   eventList: PropTypes.any,
// }
