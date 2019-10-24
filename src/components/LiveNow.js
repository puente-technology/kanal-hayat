/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby'
import { toggleDarkMode } from '../state/app';
// import { sortTimeString } from '../utils/utils';
import './LiveNow.scss'
import { sortTimeString } from '../utils/utils';

export default ({ isLiveStream }) => {
  return (
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
                endTime
              }
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
              title
              subtitle
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
    `}
      render={(data) => {
        let eventData
        data.mdfiles.edges.map((obj) => {
          const time = moment(obj.node.frontmatter.title, 'YYYY MM DD')
          if (moment(time).isSame(moment().format('YYYY MM DD'), 'week')) {
            eventData = obj.node.frontmatter.eventList
          }
        })
        return (
          <LiveNowC eventList={eventData} isLiveStream />

        )
      }
  }
    />
  )
}

const sixHours = 60000 * 720;
export const LiveNowC = (props) => {
  const {
    eventList, isLiveStream, dispatch,
  } = props;
  let firstLoadedDay = new Date().getDay().toString()
  if (firstLoadedDay === '0') firstLoadedDay = '99'
  const options = { hour12: false };
  const timeNow = new Date().toLocaleString('en-US', options).replace(',', '')
  const upperBoundTimeLimit = new Date(new Date().getTime() + sixHours).toLocaleString('en-US', options).replace(',', '')
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

  const handleChange = () => {
    dispatch(toggleDarkMode(
      null,
      null,
      true,
      null,
      null,
      null,
      false,
      null,
      false,
      true,
      true,
    ))
  }

  return (
    <div className="LiveNow">
      <div className={`LiveNow--Title ${isLiveStream && 'live-stream'}`}>
        Şimdi Canlı Yayında!
      </div>
      <div className="LiveNow--Line" />
      <div className="LiveNow--Events">
        {
          filteredList.map((item, i) => (
            <div className="LiveNow--Item" key={i} style={{ paddingTop: isLiveStream && 28, fontSize: isLiveStream && 14 }}>
              <span className={`Item-Header ${i === 0 ? 'now' : ''}`} style={{ fontSize: isLiveStream && 14 }}>
                {`${item.title}${i === 0 ? '(ŞİMDİ)' : ''}`}
              </span>
              <span className={`Item-SubHeader ${i === 0 ? 'now' : ''}`}>
                {item.subtitle}
              </span>
              <div className={`Item-Time ${i === 0 ? 'now' : ''}`} style={{ fontSize: isLiveStream && 24 }}>
                {item.time.startTime}
                {
                  i === 0 && !isLiveStream && <button onClick={handleChange} type="button" style={{ width: isLiveStream && 90 }}>Canlı İzle</button>
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
  isLiveStream: PropTypes.bool,
}
