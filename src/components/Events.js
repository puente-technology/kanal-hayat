import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { graphql } from 'gatsby'
import { eventWeek } from '../utils/utils';

import './Events.scss'

class Events extends Component {
  state = {
    activeDay: 0,
  }

  componentDidMount() {
    const { activeDay } = this.state;
    console.log({ activeDay });
  }

  render() {
    return (
      <React.Fragment>
        <div className="Event-Week">
          {
            eventWeek().map(day => (
              <div className={`Event ${day.isActive ? 'active' : ''}`}>
                <p>{day.day}</p>
                <p>{day.date}</p>
              </div>
            ))
          }
        </div>
        <div className="Event-Programme">
          AKIŞ
        </div>
      </React.Fragment>
    )
  }
}

export default Events;
