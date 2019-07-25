import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import './FullPageSlider.css'

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
    loaded: false,
    isOpen: false,
    sliderImages: [],
    index: 0,
    id: 0,
    autoPlayInterval: void 0,
  }

  getElement = {};

  _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  isOpen(isOpen, index) {
    if (typeof index === 'undefined') index = 0
    this.setState({ isOpen, index })
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
    var lastSlide = this.getElement.slides.length - 1;
    var currentSlide = this.state.id + num;
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
      this.setState({
        autoPlayInterval: setInterval(() => {
          this.changeSlide(1);
        }, slideTime)
      })
    }
  }

  stopAutoPlay() {
    document.getElementById('slider').addEventListener('mouseenter', () => {
      clearInterval(this.state.autoPlayInterval);
    });
    document.getElementById('slider').addEventListener('mouseleave', () => {
      this.autoPlay();
    });
  }

  clickIndicator() {
    this.getElement.indicators.forEach((indicator) => {
      indicator.addEventListener('click', (e) => {
        this.reset('indicators', 'active');
        e.target.classList.add('active');
        var currIndicator = e.target.dataset.slideTo * 1;
        this.setState({ id: currIndicator });
        this.addClass(currIndicator);
      });
    });
  }

  getImageInfo = (img, index) =>
    fetch(img.image + '-/json/')
      .then(res => res.json())
      .then(
        result => {
          const newImagesArr = [...this.state.sliderImages]
          newImagesArr[index] = {
            src: img.image,
            title: img.title,
            w: result.width,
            h: result.height
          }
          this.setState({
            sliderImages: newImagesArr
          })
          return true
        },
        error => {
          console.log(error)
          return false
        }
      )

  init(id) {
    this.addClass(id);
    this.changeIndicator(id);
    this.clickIndicator();
    this.autoPlay();
    this.stopAutoPlay();
  }

  componentDidMount() {
    this.getElement = {
      wrapper: document.getElementById('wrapper'),
      slides: [].concat(this._toConsumableArray(document.querySelectorAll('#slide'))),
      currentSlide: document.querySelector('.slide.current'),
      nextBtn: document.querySelector('.slider__btn--next'),
      prevBtn: document.querySelector('.slider__btn--prev'),
      indicators: [].concat(this._toConsumableArray(document.querySelectorAll('.indicators__item')))
    }
    this.init(this.state.id);
    this.getElement.nextBtn.addEventListener('click', () => {
      this.changeSlide(1);
    });
    this.getElement.prevBtn.addEventListener('click', () => {
      this.changeSlide(-1);
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
                  <img className="slide__img" src={g.image} alt={g.alt} />
                  <div className="slide__caption">
                    <span className="slide__caption--title">
                      {g.title}
                    </span>
                    <span className="slide__caption--text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam assumenda nostrum quisquam voluptatem consectetur dolore, necessitatibus doloribus temporibus, enim animi adipisci architecto ipsum, labore corporis! Quaerat doloribus consequatur ex blanditiis?</span>
                  </div>
                </div>
              ))
            }
          </div>

          <a href="#0" className="slider__btn slider__btn--prev" data-slide="prev">
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </a>
          <a href="#1" className="slider__btn slider__btn--next" data-slide="next">
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </a>

          <div className="indicators">
            <ul className="indicators__list">
              {
                gallery.map((g, i) => {
                  const isFirst = i === 0;
                  return <li key={i} className={`indicators__item ${isFirst ? 'active' : ''}`} data-slide-to={i}></li>
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
}
