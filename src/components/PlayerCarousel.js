/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './PlayerCarousel.scss';
import PropTypes from 'prop-types';


const arrovSvg = require('../../static/images/expand.svg');

class Carousel extends Component {
  static propTypes = {
    episodes: PropTypes.any.isRequired,
    activeEpisode: PropTypes.any.isRequired,
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
      itemsArr.push(<Item key={index} id={items[index]} level={level} />)
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
        <div className="arrow arrow-left" onClick={this.leftClick}><img src={arrovSvg} alt="LeftArrow" /></div>
        <ReactCSSTransitionGroup
          transitionName={direction}
        >
          {this.generateItems()}
        </ReactCSSTransitionGroup>
        <div className="arrow arrow-right" onClick={this.rightClick}><img src={arrovSvg} alt="RightArrow" /></div>
      </div>
    )
  }
}

class Item extends React.Component {
  static propTypes = {
    level: PropTypes.any.isRequired,
    id: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { level, id } = this.props
    const className = `item level${level}`
    return (
      <div className={className}>
        {id}
      </div>
    )
  }
}

export default Carousel;
