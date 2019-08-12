import React from 'react'
import { eventWeek, sortTimeString, days } from '../../utils/utils';

const EventsPreviewTemplate = (list) => {
  const { eventList } = list;
  const sorted = eventList.sort(sortTimeString)
  const times = sorted.map(s => s.time.startTime)
  console.log({ eventList });
  const uniqueTimes = [...new Set(times)]
  return (
    <table>
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
            Object.values(days).map((value) => {
              const found = sorted.find(s => s.time.day === value && s.time.startTime === time)
              return (
                <tr>
                  <td>
                    {time}
                  </td>
                  <td>
                    {found ? found.title : ''}
                  </td>

                </tr>
              )
            })
          ))
        }
      </tbody>
    </table>
  )
}

export default EventsPreviewTemplate;
