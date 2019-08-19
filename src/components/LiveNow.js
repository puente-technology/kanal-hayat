/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';

import { StaticQuery, graphql } from 'gatsby'
// import { sortTimeString } from '../utils/utils';
import './LiveNow.css'
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
      <LiveNowC eventList={data.allMarkdownRemark.nodes[0].frontmatter.eventList} />
    )}
  />
)

export const LiveNowC = (props) => {
  const {
    eventList,
  } = props;

  if (eventList) {
    const firstLoadedDay = new Date().getDay().toString()
    // const { eventList } = data;
    console.log({ eventList });
    const timeNow = new Date().toLocaleTimeString()
    const filtered = eventList.filter(event => event.time.days
      .some(d => d === parseInt(firstLoadedDay, 10))
      && (event.time.startTime >= timeNow
        || (event.time.startTime <= timeNow && event.time.endTime > timeNow)))
    console.log({ filtered });
    const filteredList = filtered.sort((sortTimeString))
    console.log({ filteredList });
  }

  return (
    <div className="LiveNow">
      <div className="LiveNow--Title">
        Şimdi Canlı Yayında!
      </div>
      <div className="LiveNow--Line" />
      <div className="LiveNow-Events">
        {/* {
          filteredList.map(item => {

          })
        } */}
        1
      </div>
    </div>
  )
}

LiveNowC.propTypes = {
  eventList: PropTypes.any,
}
