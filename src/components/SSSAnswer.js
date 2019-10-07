import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { nFormatter, dateConverter } from '../utils/utils';
import { toggleDarkMode } from '../state/app';


import './SSS.scss'


class SSSAnswer extends Component {
  state = {
  }


  hanndlePlayClick = (e) => {
    console.log('ayeee', e.target.value)
    const {
      dispatch,
      frontmatter,
      hosts,
      videos,
    } = this.props
    const { items, index } = JSON.parse(e.target.value)
    dispatch(toggleDarkMode(
      items,
      videos,
      true,
      index,
      frontmatter,
      this.handleCloseClick,
      false,
      hosts,
      false,
    ))
  }

  handleCloseClick = () => {
  }

  render() {
    const { answer, videos } = this.props
    return (
      <React.Fragment>
        <div
          className="answer-container"
        >
          <span className="answer-text">
            {answer}
          </span>
          <div className="videos-container">
            {videos.map((items, index) => (
              <div className="Episode">
                <button
                  type="button"
                  value={JSON.stringify({ items, index })}
                  onClick={this.hanndlePlayClick}
                  style={{
                    background: `url(${items.youtubeURL.imageURL}) 50%`,
                    backgroundSize: 'cover',
                    position: 'relative',
                  }}
                  className="EpisodeVideo"
                >
                  <div className="playParavan">
                    {dateConverter(items.youtubeURL.duration)}
                  </div>
                </button>
                <div className="minicontainer">
                  <span className="subminititle">
                    {`${items.youtubeURL.title}`}
                  </span>
                  <span className="details">
                    <span>
                    KanalHayat
                    </span>
                    <span style={{ paddingLeft: '15px' }}>
                      {`• ${nFormatter(items.youtubeURL.viewCount)}`}
                    </span>
                    {/* {frontmatter.channelTitle} */}
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
  frontmatter: PropTypes.any,
  hosts: PropTypes.any,
  dispatch: PropTypes.any,
}


export default connect(state => ({
  test: state,
  hosts: state.app.hosts,
}), null)(SSSAnswer)
