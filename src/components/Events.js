import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { graphql } from 'gatsby'
import { eventWeek } from '../utils/utils';

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
      <div>
        {
          eventWeek.map(day => (
            <div>
              <p>{day.day}</p>
              <p>{day.date}</p>
            </div>
          ))
        }
      </div>
    )
  }
}

export default Events;
