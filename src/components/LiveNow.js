/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby'
import { toggleDarkMode } from '../state/app';
// import { sortTimeString } from '../utils/utils';
import './LiveNow.scss'
import { sortTimeString } from '../utils/utils';

const scrollIndicator = require('../../static/images/scrollIndicator.svg');

export default (isLiveStream) => {
  return (
    <StaticQuery
      query={graphql`
    query LiveNow {
      allMarkdownRemark(filter: {frontmatter: {template: {eq: "EventsPage"}}}) {
        nodes {
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
      series : allMarkdownRemark(filter: {fields: {contentType: {regex: "/series/|/series-page/"}}}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              host
              title
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
    `}
      render={(data) => {
        const liveBool = isLiveStream
        let eventData
        data.mdfiles.edges.map((obj) => {
          if (obj.node.frontmatter.eventList) {
            const time = moment(obj.node.frontmatter.title, 'YYYY MM DD')
            if (moment(time).isSame(moment().format('YYYY MM DD'), 'week')) {
              eventData = obj.node.frontmatter.eventList
            }
          }
        })
        return (
          <LiveNowC
            series={data.series}
            eventList={eventData}
            dispatch={liveBool.dispatch}
            isLiveStream={liveBool.isLiveStream}
          />

        )
      }
  }
    />
  )
}

export class LiveNowC extends React.Component {
  static propTypes = {
    eventList: PropTypes.any,
    isLiveStream: PropTypes.bool,
    dispatch: PropTypes.any,
    series: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      urlIndex: {},
    };
  }

  componentDidMount() {
    this.initUrls()
  }

  initUrls = () => {
    const { series } = this.props
    let tempObj = {}
    Object.entries(series).map(([key, val]) => {
      Object.entries(val).map(([key1, obj]) => {
        if (obj.node) {
          const { fields, frontmatter } = obj.node
          tempObj = { ...tempObj, [frontmatter.title]: fields.slug }
        }
      })
    })
    this.setState({ urlIndex: tempObj })
  }


  handleChange = () => {
    const { dispatch } = this.props
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

  render() {
    const { isLiveStream, eventList } = this.props
    const { urlIndex } = this.state
    const sixHours = 60000 * 720;
    let firstLoadedDay = new Date().getDay().toString()
    if (firstLoadedDay === '0') firstLoadedDay = '99'
    const options = { hour12: false };
    const timeNow = new Date().toLocaleString('en-US', options).replace(',', '')
    const upperBoundTimeLimit = new Date(new Date().getTime() + sixHours).toLocaleString('en-US', options).replace(',', '')
    let filtered
    let filteredList
    if (eventList) {
      filtered = eventList.filter((
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
    }
    if (filtered) {
      filteredList = filtered.sort((sortTimeString))
    }
    /* if (filteredList && filteredList.length > 4) {
      filteredList = filteredList.slice(0, 4)
    } */
    return (
      <div className="LiveNow">
        <div className={`LiveNow--Title ${isLiveStream && 'live-stream'}`}>
        Şimdi Canlı Yayında!
        </div>
        <div className="LiveNow--Line" />
        <div className="LiveNow--Events">
          {
          filteredList && filteredList.map((item, i) => {
            const { seriesInfo, time } = item
            return (
              <div className="LiveNow--Item" key={i} style={{ paddingTop: isLiveStream && 28, fontSize: isLiveStream && 14 }}>
                <span className={`Item-Header ${i === 0 ? 'now' : ''}`} style={{ fontSize: isLiveStream && 14 }}>
                  <Link
                    to={urlIndex[seriesInfo.serieNames.series.value]}
                  >
                    {`${seriesInfo.serieNames.series.value}${i === 0 ? '(ŞİMDİ)' : ''}`}
                  </Link>
                </span>
                <span className={`Item-SubHeader ${i === 0 ? 'now' : ''}`}>
                  {seriesInfo.serieNames.subtitles.value}
                </span>
                <div className={`Item-Time ${i === 0 ? 'now' : ''}`} style={{ fontSize: isLiveStream && 24 }}>
                  {time.startTime}
                  {
                    i === 0 && !isLiveStream
                    && <button onClick={this.handleChange} type="button" style={{ width: isLiveStream && 90 }}>Canlı İzle</button>
                  }
                </div>
              </div>
            )
          })
        }
          {
          !filteredList && (
            <div>
              There is no events for this week!
            </div>
          )
        }
        </div>
        {
        filteredList && (
          <div className="LiveNow--ScrollIcon">
            <img src={scrollIndicator} alt="scrolling" />
          </div>
        )
        }
      </div>
    )
  }
}
