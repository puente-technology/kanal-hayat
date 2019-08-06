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
    sliderImages: [],
    id: 0,
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

  getImageInfo = (img, index) => fetch(`${img.image}-/json/`)
    .then(res => res.json())
    .then(
      (result) => {
        const { sliderImages } = this.state;
        const newImagesArr = [...sliderImages]
        newImagesArr[index] = {
          src: img.image,
          title: img.title,
          w: result.width,
          h: result.height,
        }
        this.setState({
          sliderImages: newImagesArr,
        })
        return true
      },
      (error) => {
        console.log(error)
        return false
      },
    )

  _toConsumableArray = (arr) => {
    if (Array.isArray(arr)) {
      for (let i = 0, arr2 = Array(arr.length); i < arr.length; i += 1) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    return Array.from(arr);
  }

  reset = (elems, className) => {
    this.getElement[elems].forEach((elem) => {
      elem.classList.remove(className);
    });
  }

  changeSlide = (num) => {
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

  changeIndicator = (id) => {
    this.reset('indicators', 'active');
    this.getElement.indicators[id].classList.add('active');
  }

  addClass = (numOfSlide) => {
    this.reset('slides', 'current');
    this.getElement.slides[numOfSlide].classList.add('current');
  }

  init(id) {
    this.addClass(id);
    this.changeIndicator(id);
    this.clickIndicator();
    // this.autoPlay();
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


  render() {
    const { gallery } = this.props
    return (
      <Fragment>
        <section id="slider" className="slider">
          <div id="wrapper" className="slides-wrapper">
            {
              gallery.map((g, i) => (
                <div id="slide" key={i} className="slide" data-slide-id={i}>
                  <Nav key={i} color={g.color} />
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
                      <button className={`slide__caption--btn ${g.color}`} type="button">Programa Git</button>
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
}
