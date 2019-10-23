import React from 'react'
import { eventWeek, sortTimeString } from '../../utils/utils';

import './Events.css'
import { days } from '../../constants/generics';

const EventsPreviewTemplate = (list) => {
  const { eventList } = list;
  let sorted
  let times
  let uniqueTimes
  if (eventList) {
    sorted = eventList.sort(sortTimeString)
    times = sorted.map(s => s.time && s.time.startTime)
    uniqueTimes = [...new Set(times)]
  }

  return (
    <table id="events">
      <thead>
        <tr>
          <th>Time</th>
          {
            eventWeek().map((g, i) => (<th key={i}>{g.date}</th>))
          }
        </tr>
      </thead>
      <tbody>
        {
          uniqueTimes && uniqueTimes.map(time => (
            <tr>
              <td>
                {time}
              </td>
              {
                Object.values(days).map((value) => {
                  const found = sorted
                    .find(s => s.time && s.time.days && s.time.days.includes(value)
                    && (s.time && s.time.startTime === time))
                  console.log('FOUND', found)
                  return (
                    <td style={{ display: 'flex', flexDirection: 'column' }}>
                      {found ? found.seriesInfo[0].serieNames.series.value : ''}
                      {found ? found.seriesInfo[0].serieNames.subtitles : ''}
                    </td>
                  )
                })
              }

            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default EventsPreviewTemplate;
