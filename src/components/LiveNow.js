/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';

import { StaticQuery, graphql } from 'gatsby'
// import { sortTimeString } from '../utils/utils';
import './LiveNow.scss'
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

const sixHours = 60000 * 720;
export const LiveNowC = (props) => {
  const {
    eventList,
  } = props;
  const firstLoadedDay = new Date().getDay().toString()
  const timeNow = new Date().toLocaleString()
  const upperBoundTimeLimit = new Date(new Date().getTime() + sixHours).toLocaleString()
  const filtered = eventList.filter((
    {
      time:
      {
        days,
        startTime,
        endTime,
      },
    },
  ) => {
    const itemStartTime = `${new Date().toLocaleDateString()} ${startTime}`
    const itemEndTime = `${new Date().toLocaleDateString()} ${endTime}`

    return (
      days
        .some(d => d === parseInt(firstLoadedDay, 10)
          && ((itemStartTime >= timeNow && itemStartTime <= upperBoundTimeLimit)
            || (itemStartTime <= timeNow && itemEndTime > timeNow))))
  })

  let filteredList = filtered.sort((sortTimeString))
  if (filteredList.length > 4) {
    filteredList = filteredList.slice(0, 4)
  }

  return (
    <div className="LiveNow">
      <div className="LiveNow--Title">
        Şimdi Canlı Yayında!
      </div>
      <div className="LiveNow--Line" />
      <div className="LiveNow--Events">
        {
          filteredList.map((item, i) => (
            <div className="LiveNow--Item" key={i}>
              <span className={`Item-Header ${i === 0 ? 'now' : ''}`}>
                {`${item.title}${i === 0 ? '(ŞİMDİ)' : ''}`}
              </span>
              <span className={`Item-SubHeader ${i === 0 ? 'now' : ''}`}>
                {item.subtitle}
              </span>
              <div className={`Item-Time ${i === 0 ? 'now' : ''}`}>
                {item.time.startTime}
                {
                  i === 0 && <button type="button">Canlı İzle</button>
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

LiveNowC.propTypes = {
  eventList: PropTypes.any,
}
