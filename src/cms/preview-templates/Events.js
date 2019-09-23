import React from 'react'
import { eventWeek, sortTimeString } from '../../utils/utils';

import './Events.css'
import { days } from '../../constants/generics';

const EventsPreviewTemplate = (list) => {
  const { eventList } = list;
  const sorted = eventList.sort(sortTimeString)

  const times = sorted.map(s => s.time && s.time.startTime)
  const uniqueTimes = [...new Set(times)]
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
          uniqueTimes.map(time => (
            <tr>
              <td>
                {time}
              </td>
              {
                Object.values(days).map((value) => {
                  const found = sorted
                    .find(s => s.time && s.time.days && s.time.days.includes(value)
                    && (s.time && s.time.startTime === time))
                  return (
                    <td>
                      {found ? found.title : ''}
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
