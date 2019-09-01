
import React from 'react'

export default function Duration({ className, seconds }) {
  return (
    Number.isNaN(seconds) || seconds === Number.POSITIVE_INFINITY
      ? <div className={[className, 'duration-inf'].join(' ')}>{'\u221E'}</div>
      : (
        <time dateTime={`P${Math.round(seconds)}S`} className={className}>
          {format(seconds)}
        </time>
      )
  )
}

function pad(string) {
  return (`0${string}`).slice(-2)
}

function format(seconds) {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`
  }
  return `${mm}:${ss}`
}
