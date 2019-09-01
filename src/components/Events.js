import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { eventWeek, sortTimeString } from '../utils/utils';

import './Events.scss'
import { LiveNowC } from './LiveNow';
import { dayPeriods } from '../constants/generics';


class Events extends Component {
  state = {
    activeDay: '1',
    dayPeriod: dayPeriods.ALL.value,
  }

  filteredList = [];

  componentDidMount() {
    this.setState({
      activeDay: new Date().getDay().toString(),
    })
    const firstLoadedDay = new Date().getDay().toString()
    const { eventList } = this.props;
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

  handleFilterBtnClick = (e) => {
    this.setState({
      dayPeriod: e.target.value,
    })
    const { activeDay } = this.state;
    const { eventList } = this.props;
    const { value } = e.target
    const periodObject = dayPeriods[value]
    const temp = eventList.filter(event => event.time.days
      .some(d => d === parseInt(activeDay, 10)))
    const filtered = temp
      .filter(item => periodObject.startTime <= item.time.startTime
        && periodObject.endTime > item.time.startTime)
    this.filteredList = filtered.sort(sortTimeString)
  }


  render() {
    const { activeDay } = this.state;
    const timeNow = new Date().toLocaleString()
    return (
      <React.Fragment>
        <LiveNowC eventList={this.filteredList} />
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
        <div className="Event-Filters">
          {
            Object.entries(dayPeriods).map((item) => {
              const { dayPeriod } = this.state;
              const isActive = item[1].value === dayPeriod
              return (
                <button
                  key={item[1].value}
                  type="button"
                  value={item[1].value}
                  onClick={this.handleFilterBtnClick}
                  className={`Filter-Button ${isActive ? 'active' : ''}`}
                >
                  {
                    item[1].label
                  }
                </button>
              )
            })
          }
        </div>
        <div className="Event-Container">
          <div className="Event-SubContainer">
            {
              this.filteredList && this.filteredList.map((item, i) => {
                const today = new Date();
                const startDay = new Date();
                startDay.setDate(today.getDate() - (today.getDay() - activeDay))
                const itemStartTime = `${new Date(startDay).toLocaleDateString()} ${item.time.startTime}`
                const itemEndTime = `${new Date(startDay).toLocaleDateString()} ${item.time.endTime}`

                const isNow = (itemStartTime <= timeNow && itemEndTime > timeNow)
                return (
                  <div key={i} className="Event-Programme">
                    <div className={`Event-Time ${isNow ? 'active' : ''}`}>
                      {item.time.startTime}
                    </div>
                    <div className={`Event-Name ${isNow ? 'active' : ''}`}>
                      <p className="Event-Title">
                        {item.title}
                      </p>
                      <p className="Event-Subtitle">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Events.propTypes = {
  eventList: PropTypes.any,
}


export default Events;
