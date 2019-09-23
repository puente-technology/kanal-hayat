import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toggleDarkMode } from '../state/app';
import Carousel from './HomePageCarousel';
import { dateConverter } from '../utils/utils';

import './ProgrammeHomePage.scss';

class ProgrammeHomePage extends Component {
  static propTypes = {
    data: PropTypes.any,
    dispatch: PropTypes.any,
    hosts: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  hanndlePlayClick = (e) => {
    const {
      dispatch,
      hosts,
    } = this.props;
    const { thumb, i } = JSON.parse(e.target.value)
    this.setState({ isOpen: true })
    dispatch(toggleDarkMode(
      thumb,
      [],
      true,
      i,
      '',
      this.handleCloseClick,
      false,
      hosts,
      false,
    ))
  }

  handleCloseClick = () => {
    this.setState({ isOpen: false })
  }


  render() {
    const { data, dispatch, hosts } = this.props;
    const { isOpen } = this.state;
    const tempData = data;

    return (
      <div
        style={{ background: `url(${tempData.bgImage}) no-repeat center`, backgroundSize: 'cover' }}
        className="program-container"
      >
        <div className={`Programme ${tempData.color} ${tempData.align}`}>
          <div className="ProgrammeTitle">
            {tempData.title}
          </div>
          <div className="ProgrammeContent">
            {tempData.content}
          </div>
          <div className="ProgrammeThumbnailTitle">
            {tempData.thumbnailTitle}
          </div>
          <div className="ProgrammeThumbnails">
            {
              tempData.thumbnails.length > 2 ? (
                <Carousel
                  dispatch={dispatch}
                  hosts={hosts}
                  episodes={tempData.thumbnails}
                  activeEpisode={0}
                />
              ) : (
                <div style={{ display: 'flex' }}>
                  {
                    tempData.thumbnails.map((thumb, i) => (
                      <div key={i} className="ProgrammeThumbnail">
                        {console.log('Thumb', thumb)}
                        {
                          thumb.image
                            ? (
                              <button
                                value={JSON.stringify({ thumb, i })}
                                type="button"
                                onClick={this.hanndlePlayClick}
                                style={{
                                  background: `url(${thumb.youtubeURL.imageURL}) no-repeat`,
                                  position: 'relative',
                                  backgroundSize: 'cover',
                                  width: '280px',
                                  height: '150px',
                                }}
                                src={thumb.image}
                                width={280}
                                height={150}
                                className="EpisodeVideo"
                              >
                                <div className="playParavan">
                                  {dateConverter(thumb.youtubeURL.duration)}
                                </div>
                              </button>
                            )
                            : (
                              <button
                                value={JSON.stringify({ thumb, i })}
                                onClick={this.hanndlePlayClick}
                                type="button"
                                style={{
                                  background: `url(${thumb.youtubeURL.imageURL}) 50%`,
                                  backgroundSize: 'cover',
                                  position: 'relative',
                                  width: '280px',
                                  height: '150px',
                                }}
                                className="EpisodeVideo"
                              >
                                <div className="playParavan">
                                  {dateConverter(thumb.youtubeURL.duration)}
                                </div>
                              </button>
                            )
                        }
                        {isOpen}
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ProgrammeHomePage
