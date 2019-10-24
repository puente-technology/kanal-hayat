import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { eventWeek, sortTimeString } from '../utils/utils';

import './Events.scss'
import { LiveNowC } from './LiveNow';
import { dayPeriods } from '../constants/generics';

const rightArrow = require('../../static/images/right-arrow-black.svg');

class Events extends Component {
  state = {
    activeDay: '1',
    dayPeriod: dayPeriods.ALL.value,
    scrollWeekPosition: 0,
    scrollLeftMax: 1,
  }

  filteredList = [];

  componentDidMount() {
    this.setState({
      activeDay: new Date().getDay().toString(),
    })
    let firstLoadedDay = new Date().getDay().toString()
    if (firstLoadedDay === '0') firstLoadedDay = '99'
    const { eventList } = this.props;
    const filtered = eventList.filter(event => event.time.days
      .some(d => d === parseInt(firstLoadedDay, 10)))
    this.filteredList = filtered.sort(sortTimeString);
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

  handleScroll = (e) => {
    const elem = e.target;
    const scrollLeftMax = elem.scrollWidth - elem.clientWidth;
    this.setState(() => ({ scrollLeftMax, scrollWeekPosition: elem.scrollLeft }));
  }

  render() {
    const { activeDay, scrollWeekPosition, scrollLeftMax } = this.state;
    const timeNow = new Date().toLocaleString();

    return (
      <React.Fragment>
        <LiveNowC eventList={this.filteredList} />
        <div className="Event-Week" onScroll={this.handleScroll}>
          { scrollWeekPosition > 23 && scrollWeekPosition <= scrollLeftMax
          && (
          <div className="categoryArrowLeft">
            <button
              type="button"
              style={{
                background: `url(${rightArrow}) no-repeat`,
                backgroundSize: 'contain',
                border: 'none',
              }}
              className="left-arrow"
            />
          </div>
          )}
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
          { scrollWeekPosition < scrollLeftMax
          && (
          <div className="categoryArrowRight">
            <button
              type="button"
              style={{
                background: `url(${rightArrow}) no-repeat`,
                backgroundSize: 'contain',
                border: 'none',
              }}
              className="right-arrow"
            />
          </div>
          )}
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
                const { seriesInfo, time } = item
                const today = new Date();
                const startDay = new Date();
                startDay.setDate(today.getDate() - (today.getDay() - activeDay))
                const itemStartTime = `${new Date(startDay).toLocaleDateString()} ${time.startTime}`
                const itemEndTime = `${new Date(startDay).toLocaleDateString()} ${time.endTime}`
                const isNow = (itemStartTime <= timeNow && itemEndTime > timeNow)
                return (
                  <div key={i} className="Event-Programme">
                    <div className={`Event-Time ${isNow ? 'active' : ''}`}>
                      {time.startTime}
                    </div>
                    <div className={`Event-Name ${isNow ? 'active' : ''}`}>
                      <p className="Event-Title">
                        {seriesInfo.serieNames.series.value}
                      </p>
                      <p className="Event-Subtitle">
                        {seriesInfo.serieNames.subtitles.value}
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
