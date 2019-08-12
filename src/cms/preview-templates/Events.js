import React from 'react'
import { eventWeek, sortTimeString, days } from '../../utils/utils';

import './Events.css'

const EventsPreviewTemplate = (list) => {
  const { eventList } = list;
  const sorted = eventList.sort(sortTimeString)
  const times = sorted.map(s => s.time.startTime)
  const uniqueTimes = [...new Set(times)]
  console.log({ sorted });
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
                    .find(s => s.time.days.includes(value) && s.time.startTime === time)
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
