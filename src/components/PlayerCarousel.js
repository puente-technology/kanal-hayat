import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './PlayerCarousel.scss';
import PropTypes from 'prop-types';
import { nFormatter } from '../utils/utils';

const arrovSvg = require('../../static/images/expand.svg');

class Carousel extends Component {
  static propTypes = {
    episodes: PropTypes.any.isRequired,
    activeEpisode: PropTypes.any.isRequired,
    frontmatter: PropTypes.any.isRequired,
    handleVideoUrlChange: PropTypes.any.isRequired,
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
    const { frontmatter, handleVideoUrlChange } = this.props
    const { active, items } = this.state
    const itemsArr = []
    let level
    for (let i = active - 1; i < active + 2; i += 1) {
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
      />)
    }
    return itemsArr
  }

  moveLeft() {
    const { active, items } = this.state
    let newActive = active
    newActive -= 1
    this.setState({
      active: newActive < 0 ? items.length - 1 : newActive,
      direction: 'left',
    })
  }

  moveRight() {
    const { active, items } = this.state
    const newActive = active
    this.setState({
      active: (newActive + 1) % items.length,
      direction: 'right',
    })
  }

  render() {
    const { direction } = this.state
    return (
      <div id="carousel" className="noselect">
        <button type="button" className="arrow arrow-left" onClick={this.leftClick}><img src={arrovSvg} alt="LeftArrow" /></button>
        <div style={{ display: 'flex' }}>
          <ReactCSSTransitionGroup
            component={React.Fragment}
            transitionName={direction}
          >
            {this.generateItems()}
          </ReactCSSTransitionGroup>
        </div>
        <button type="button" className="arrow arrow-right" onClick={this.rightClick}><img src={arrovSvg} alt="RightArrow" /></button>
      </div>
    )
  }
}

class Item extends React.Component {
  static propTypes = {
    level: PropTypes.any.isRequired,
    id: PropTypes.any.isRequired,
    frontmatter: PropTypes.any,
    episodes: PropTypes.any,
    handleVideoUrlChange: PropTypes.any,
  };

  constructor(props) {
    super(props)
    this.state = {
    }
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
      frontmatter,
    } = this.props
    const className = `item level${level}`
    return (
      <div className={className}>
        <button
          type="button"
          onClick={this.handleClick}
          style={{
            background: `url(${id.youtubeURL.imageURL})`,
            backgroundSize: 'cover',
            position: 'relative',
          }}
          className="EpisodeVideoInfo"
        />
        <div className="info">
          <div className="infoDiv">
            {`${id.youtubeURL.title.slice(0, 25)}: `}
          </div>
          <div className="infoDiv">
            {frontmatter.host || ''}
          </div>
          <div className="infoDivView">
            <div>
              Views
            </div>
            <div>
              {`• ${nFormatter(id.youtubeURL.viewCount)}`}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Carousel;