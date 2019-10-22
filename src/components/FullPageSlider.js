/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-bind */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import './FullPageSlider.scss'
import Nav from './Nav';

export const query = graphql`
  fragment FullPageSlider on MarkdownRemark {
    frontmatter {
      gallery {
        alt
        image
        title
      }
    }
  }
`

export default class FullPageSlider extends Component {
  state = {
    id: 0,
    openNav: false,
  }

  getElement = {};

  componentDidMount() {
    this.getElement = {
      wrapper: document.getElementById('wrapper'),
      slides: [].concat(this._toConsumableArray(document.querySelectorAll('#slide'))),
      currentSlide: document.querySelector('.slide.current'),
      nextBtn: document.querySelector('.slider__btn--next'),
      prevBtn: document.querySelector('.slider__btn--prev'),
      indicators: [].concat(this._toConsumableArray(document.querySelectorAll('.indicators__item'))),
    }
    const { id } = this.state;
    this.init(id);
  }

  _toConsumableArray = (arr) => {
    if (Array.isArray(arr)) {
      const arr2 = Array(arr.length)
      for (let i = 0; i < arr.length; i += 1) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    return Array.from(arr);
  }

  handleOpenNav = () => {
    const { openNav } = this.state;
    this.setState(() => ({ openNav: !openNav }));
  }

  addClass(numOfSlide) {
    this.reset('slides', 'current');
    this.getElement.slides[numOfSlide].classList.add('current');
  }

  reset(elems, className) {
    this.getElement[elems].forEach((elem) => {
      elem.classList.remove(className);
    });
  }

  changeSlide(num) {
    const { id } = this.state;
    const lastSlide = this.getElement.slides.length - 1;
    let currentSlide = id + num;
    if (currentSlide > lastSlide) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = lastSlide;
    }
    this.setState({ id: currentSlide });
    this.addClass(currentSlide);
    this.changeIndicator(currentSlide);
  }

  changeIndicator(id) {
    this.reset('indicators', 'active');
    this.getElement.indicators[id].classList.add('active');
  }

  autoPlay() {
    const { autoSlide, slideTime } = this.props;
    if (autoSlide) {
      setInterval(() => {
        this.changeSlide(1);
      }, slideTime)
    }
  }

  clickIndicator() {
    this.getElement.indicators.forEach((indicator) => {
      indicator.addEventListener('click', (e) => {
        this.reset('indicators', 'active');
        e.target.classList.add('active');
        const currIndicator = e.target.dataset.slideTo * 1;
        this.setState({ id: currIndicator });
        this.addClass(currIndicator);
      });
    });
  }

  init(id) {
    this.addClass(id);
    this.changeIndicator(id);
    this.clickIndicator();
    this.autoPlay();
  }

  render() {
    const { openNav } = this.state;
    const {
      gallery,
      dispatch,
      hosts,
    } = this.props
    return (
      <Fragment>
        <section id="slider" className="slider">
          <div id="wrapper" className="slides-wrapper">
            {
              gallery.map((g, i) => (
                <div id="slide" key={i} className="slide" data-slide-id={i}>
                  <Nav
                    key={i}
                    color={g.color}
                    nav={openNav}
                    openNav={this.handleOpenNav}
                    dispatch={dispatch}
                    hosts={hosts}
                  />
                  <img className="slide__img" src={g.image} alt={g.alt} />
                  <div className={`slide__caption ${g.color} ${g.align}`}>
                    <span className="slide__caption--program">
                      {g.programName}
                    </span>
                    <span className="slide__caption--program-time">
                      {g.programTime}
                    </span>
                    <hr className={`slide__caption--line ${g.color}`} />
                    <span className="slide__caption--title">
                      {g.title}
                    </span>
                    <span className="slide__caption--text">
                      <a href={`${g.link}`} className={`slide__caption--btn ${g.color}`}>Programa Git</a>
                    </span>
                  </div>
                  {/* <img src="images/ScrollIcon.png" className="slide__footer--scroll" /> */}
                </div>
              ))
            }
          </div>

          <div className="indicators">
            <ul className="indicators__list">
              {
                gallery.map((g, i) => {
                  const isFirst = i === 0;
                  return <li key={i} className={`indicators__item ${isFirst ? 'active' : ''}`} data-slide-to={i} />
                })
              }
            </ul>
          </div>
        </section>
      </Fragment>
    )
  }
}

FullPageSlider.propTypes = {
  gallery: PropTypes.array,
  slideTime: PropTypes.number,
  autoSlide: PropTypes.bool,
  dispatch: PropTypes.any,
  hosts: PropTypes.any,
}
