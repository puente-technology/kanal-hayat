import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './SSS.scss'


class SSSAnswer extends Component {
  state = {
  }

  render() {
    const { answer, videos } = this.props
    console.log('asma videos', videos)
    return (
      <React.Fragment>
        <div
          className="answer-container"
        >
          <span className="answer-text">
            {answer}
          </span>
          <div className="videos-container">
            {videos.map(items => (
              <div>
                <img
                  className="video"
                  style={{ }}
                  src={items.video}
                  alt="Content"
                />
                <div className="minicontainer">
                  <span className="subminititle">
                    <span className="title">
                      {`${items.title}`}
                    </span>
                  </span>
                  <span className="details">
                    <span style={{ paddingRight: '10px' }}>
                      {`${items.channel} • ${items.views} • ${items.date}`}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

SSSAnswer.propTypes = {
  answer: PropTypes.any,
  videos: PropTypes.any,
}


export default SSSAnswer;
