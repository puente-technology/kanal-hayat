/* eslint-disable prefer-destructuring */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'gatsby';
import './PlayerInfo.scss';
import Carousel from './PlayerCarousel';


const arrovSvg = require('../../static/images/expand.svg');

class PlayerInfoExpand extends Component {
  static propTypes = {
    playerProps: PropTypes.any.isRequired,
    onCloseClick: PropTypes.any.isRequired,
    episodeInfo: PropTypes.any,
    episodes: PropTypes.any,
    frontmatter: PropTypes.any,
    playerIndex: PropTypes.any,
    handleVideoUrlChange: PropTypes.any,
    hosts: PropTypes.any,
    questionIndex: PropTypes.any,
    index: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  getHostUrl = (hostName) => {
    const { hosts } = this.props
    if (hosts) {
      const result = hosts.map((el) => {
        const { fields, frontmatter } = el.node
        if (frontmatter.host === hostName) {
          return fields.slug
        }
      })
      return result
    }
  }

  render() {
    const {
      playerProps,
      onCloseClick,
      episodeInfo,
      episodes,
      frontmatter,
      playerIndex,
      handleVideoUrlChange,
      questionIndex,
      index,
    } = this.props

    let hostName = frontmatter.host
    let guests = episodeInfo.guests
    let targetGroup = frontmatter.targetGroup

    if (frontmatter.title === 'SSS Page') {
      hostName = frontmatter.questions[questionIndex].videos[index].host
      guests = frontmatter.questions[questionIndex].videos[index].guests
      targetGroup = frontmatter.questions[questionIndex].videos[index].targetGroup
    }

    return (
      <div
        className="player-info-container"
        style={{
          width: playerProps.width,
          height: '800px',
          background: 'black',
          bottom: '0',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="player-info-header">
          {/* <p className="player-info-txt-head">
            {frontmatter.title || ''}
          </p> */}
          <p className="player-info-txt">
            {episodeInfo.youtubeURL.title}
          </p>
          <p className="player-info-txt">
            {frontmatter.publishDate || ''}
          </p>
        </div>
        <div>
          <p className="player-info-contet">
            {episodeInfo.youtubeURL.description}
          </p>
        </div>
        <div className="player-info-info-div-parent">
          <div className="player-info-info-div">
            <p className="player-info-text-bold">
              Sunucu:
            </p>
            <p className="player-info-text-lighter">
              <Link
                to={this.getHostUrl(hostName)}
              >
                {hostName || ''}
              </Link>
            </p>
          </div>
          <div className="player-info-info-div">
            <p className="player-info-text-bold">
              Konuk:
            </p>
            <p className="player-info-text-lighter">
              { guests || ''}
            </p>
          </div>
          <div className="player-info-info-div">
            <p className="player-info-text-bold">
              Hedef Kitle:
            </p>
            <p className="player-info-text-lighter">
              {targetGroup || ''}
            </p>
          </div>
          <div className="player-info-info-div">
            <p className="player-info-text-bold">
            Anahtar Kelimeler:
            </p>
            <p className="player-info-text-lighter" style={{ height: '32px', overflow: 'scroll' }}>
              {episodeInfo.youtubeURL.tags}
            </p>
          </div>
          <div style={{ marginTop: '20px' }}>
            <p className="player-info-text-bold">
              Bölümler
            </p>
          </div>
        </div>
        <div>
          {
            episodes.length > 2 && (
              <Carousel
                episodes={episodes}
                activeEpisode={playerIndex}
                frontmatter={frontmatter}
                handleVideoUrlChange={handleVideoUrlChange}
              />
            )
          }
        </div>
        <div className="player-info-close-info" style={{ margin: '324px auto', transform: 'rotate(90deg)' }}>
          <button
            type="button"
            width="50px"
            height="40px"
            onClick={onCloseClick}
            style={{
              background: `url(${arrovSvg})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '23px',
              height: '40px',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  test: state,
  hosts: state.app.hosts,
  index: state.app.index,
  questionIndex: state.app.questionIndex,
}), null)(PlayerInfoExpand)
