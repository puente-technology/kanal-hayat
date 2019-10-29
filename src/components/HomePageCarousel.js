import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import { toggleDarkMode } from '../state/app';
import './HomePageCarousel.scss';
import { dateConverter } from '../utils/utils';

const arrovSvg = require('../../static/images/expand.svg');

class Carousel extends Component {
  static propTypes = {
    episodes: PropTypes.any.isRequired,
    activeEpisode: PropTypes.any.isRequired,
    frontmatter: PropTypes.any.isRequired,
    handleVideoUrlChange: PropTypes.any.isRequired,
    hosts: PropTypes.any,
    dispatch: PropTypes.any,
  };

  constructor(props) {
    super(props)
    const { episodes, activeEpisode } = this.props
    this.state = {
      items: episodes,
      active: activeEpisode,
      direction: '',
    }
    this.rightClick = this.moveRight.bind(this)
    this.leftClick = this.moveLeft.bind(this)
  }

  generateItems() {
    const {
      frontmatter,
      handleVideoUrlChange,
      hosts,
      dispatch,
    } = this.props
    const { active, items } = this.state
    const itemsArr = []
    let level
    for (let i = active - 1; i < active + 1; i += 1) {
      let index = i
      if (i < 0) {
        index = items.length + i
      } else if (i >= items.length) {
        index = i % items.length
      }
      level = active - i
      itemsArr.push(<Item
        key={index}
        id={items[index]}
        level={level}
        frontmatter={frontmatter}
        activeEpisode={active}
        episodes={items}
        handleVideoUrlChange={handleVideoUrlChange}
        hosts={hosts}
        dispatch={dispatch}
      />)
    }
    return itemsArr
  }

  moveLeft() {
    const { active, items } = this.state
    let newActive = active
    newActive -= 1
    setTimeout(() => {
      this.setState({
        active: newActive < 0 ? items.length - 1 : newActive,
        direction: 'left',
      })
    }, 600)
  }

  moveRight() {
    const { active, items } = this.state
    const newActive = active
    setTimeout(() => {
      this.setState({
        active: (newActive + 1) % items.length,
        direction: 'right',
      })
    }, 600)
  }

  render() {
    const { direction } = this.state
    return (
      <div id="home-carousel" className="noselect">
        <button type="button" className="arrow arrow-left" onClick={this.leftClick}><img className="arrow-img" src={arrovSvg} alt="LeftArrow" /></button>
        <div style={{ display: 'flex' }}>
          <ReactCSSTransitionGroup
            component={React.Fragment}
            transitionName={direction}
          >
            {this.generateItems()}
          </ReactCSSTransitionGroup>
        </div>
        <button type="button" className="arrow arrow-right" onClick={this.rightClick}><img className="arrow-img" src={arrovSvg} alt="RightArrow" /></button>
      </div>
    )
  }
}

export default Carousel


class Item extends React.Component {
  static propTypes = {
    level: PropTypes.any.isRequired,
    id: PropTypes.any.isRequired,
    episodes: PropTypes.any,
    handleVideoUrlChange: PropTypes.any,
    dispatch: PropTypes.any,
    hosts: PropTypes.any,
  };

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  hanndlePlayClick = (e) => {
    console.log('asma home carousel page', this.props)
    const {
      dispatch,
      hosts,
    } = this.props;
    const { id, level } = JSON.parse(e.target.value)
    dispatch(toggleDarkMode(
      id,
      [],
      true,
      level,
      '',
      this.handleCloseClick,
      false,
      hosts,
      false,
    ))
  }

  handleCloseClick = () => {
  }

  handleClick = () => {
    const {
      id,
      episodes,
      handleVideoUrlChange,
    } = this.props
    handleVideoUrlChange(id, episodes)
  }

  render() {
    const {
      level,
      id,
    } = this.props
    const className = `item homeLevel${level}`
    return (
      <div className={className}>
        {
        id.image
          ? (
            <button
              value={JSON.stringify({ id, level })}
              type="button"
              onClick={this.hanndlePlayClick}
              style={{
                background: `url(${id.youtubeURL.imageURL}) no-repeat`,
                position: 'relative',
                backgroundSize: 'cover',
                width: '280px',
                height: '150px',
                backgroundPosition: 'center',
              }}
              src={id.image}
              width={280}
              height={150}
              className="EpisodeVideoInfo"
            >
              <div className="playParavan">
                {dateConverter(id.youtubeURL.duration)}
              </div>
            </button>
          )
          : (
            <button
              value={JSON.stringify({ id, level })}
              onClick={this.hanndlePlayClick}
              type="button"
              style={{
                background: `url(${id.youtubeURL.imageURL}) 50%`,
                backgroundSize: 'cover',
                position: 'relative',
                width: '280px',
                height: '150px',
                backgroundPosition: 'center',
              }}
              className="EpisodeVideo"
            >
              <div className="playParavan">
                {dateConverter(id.youtubeURL.duration)}
              </div>
            </button>
          )
      }
      </div>
    )
  }
}
