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
      windowWidth: null,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
    this.setState({
      windowWidth: this.getWidth()
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
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

  getWidth = () => {
    if (typeof (window.innerWidth) === 'number') {
      // Non-IE
      return window.innerWidth;
    } if (document.documentElement
      && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
      // IE 6+ in 'standards compliant mode'
      return document.documentElement.clientWidth;
    } if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
      // IE 4 compatible
      return document.body.clientWidth;
    }
    return null
  }

  handleCloseClick = () => {
    this.setState({ isOpen: false })
  }

  handleWindowSizeChange = () => {
    let widthValue
    if (typeof (window.innerWidth) === 'number') {
      widthValue = window.innerWidth
    }
    this.setState({ windowWidth: widthValue });
  };

  render() {
    const { data, dispatch, hosts } = this.props;
    const { isOpen, windowWidth } = this.state;
    const tempData = data;
    const isMobile = windowWidth <= 576;
    if (isMobile) {
      const title = tempData.title.split('/');
      return (
        <div className="program-container">
          <div className={`Programme ${tempData.color} ${tempData.align}`}>
            <div
              style={{ background: `url(${tempData.bgImage}) no-repeat` }}
              className="upperPart"
            >
              <div className="ProgrammeTitle">
                {title[0]}
                <br />
                {title[1]}
              </div>
            </div>
            <div
              // style={{ background: `url(${tempData.bgImage}) no-repeat` }}
              className="lowerPart"
            >
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
                      episodes={tempData.thumbnails}
                      activeEpisode={0}
                    />
                  ) : (
                    <div style={{ display: 'flex' }}>
                      {
                        tempData.thumbnails.map((thumb, i) => (
                          <div key={i} className="ProgrammeThumbnail">
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
        </div>
      );
    }

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
                                  backgroundPosition: 'center',
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
                                  backgroundPosition: 'center',
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
