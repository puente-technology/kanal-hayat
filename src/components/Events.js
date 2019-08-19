import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { eventWeek, sortTimeString } from '../utils/utils';

import './Events.scss'
import { LiveNowC } from './LiveNow';

export const query = graphql`
  fragment EventsQ on MarkdownRemark {
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
`

class Events extends Component {
  state = {
    activeDay: '1',
  }

  filteredList = [];

  componentDidMount() {
    this.setState({
      activeDay: new Date().getDay().toString(),
    })
    const firstLoadedDay = new Date().getDay().toString()
    const { eventList } = this.props;
    console.log({ eventList });
    const filtered = eventList.filter(event => event.time.days
      .some(d => d === parseInt(firstLoadedDay, 10)))
    this.filteredList = filtered.sort(sortTimeString)
  }

  handleDateChange = (e) => {
    this.setState({
      activeDay: e.target.value,
    })
    const { eventList } = this.props;
    const filtered = eventList.filter(event => event.time.days
      .some(d => d === parseInt(e.target.value, 10)))
    this.filteredList = filtered.sort(sortTimeString)
  }


  render() {
    const { activeDay } = this.state;
    return (
      <React.Fragment>
        <LiveNowC {...this.filteredList} />
        <div className="Event-Week">
          {
            eventWeek().map((day, i) => (
              <button
                type="button"
                key={i}
                value={day.nthDayOfWeek}
                onClick={this.handleDateChange}
                className={`Event ${day.nthDayOfWeek === activeDay ? 'active' : ''}`}
              >
                {day.day}
                <br />
                {day.date}
              </button>
            ))
          }
        </div>
        <div className="Event-Container">
          {
            this.filteredList && this.filteredList.map((item, i) => (
              <div key={i} className="Event-Programme">
                <div className="Event-Time">
                  {item.time.startTime}
                </div>
                <div className="Event-Name">
                  <p className="Event-Title">
                    {item.title}
                  </p>
                  <p className="Event-Subtitle">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </React.Fragment>
    )
  }
}

Events.propTypes = {
  eventList: PropTypes.any,
}


export default Events;
