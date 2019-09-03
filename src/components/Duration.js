
import React from 'react'
import PropTypes from 'prop-types';

export default function Duration({ className, seconds }) {
  function pad(string) {
    return (`0${string}`).slice(-2)
  }
  function format(secondsInfo) {
    const date = new Date(secondsInfo * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = pad(date.getUTCSeconds())
    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
  }

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

Duration.propTypes = {
  className: PropTypes.any,
  seconds: PropTypes.any,
}
