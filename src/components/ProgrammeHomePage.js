import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { toggleDarkMode } from '../state/app';
import './ProgrammeHomePage.scss';

class ProgrammeHomePage extends Component {
  static propTypes = {
    data: PropTypes.any,
    dispatch: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  hanndlePlayClick = (e) => {
    const { dispatch } = this.props;
    const { thumb, i } = JSON.parse(e.target.parentElement.value)
    this.setState({ isOpen: true })
    dispatch(toggleDarkMode(
      thumb,
      [],
      true,
      i,
      '',
      this.handleCloseClick,
      false,
    ))
  }

  handleCloseClick = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const { data } = this.props;
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
              tempData.thumbnails.map((thumb, i) => (
                <div key={i} className="ProgrammeThumbnail">
                  {
                    thumb.image
                      ? (
                        <img
                          alt={`thumbnail${i}`}
                          src={thumb.image}
                          width={280}
                          height={150}
                        />
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
                          <div className="playParavan" />
                        </button>
                      )
                  }
                  {isOpen}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  test: state,
}), null)(ProgrammeHomePage)
