import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

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
    index: 0
  }

  isOpen(isOpen, index) {
    if (typeof index === 'undefined') index = 0
    this.setState({ isOpen, index })
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

  componentDidMount() {
    // const { images } = this.props,
    //   maxCount = images.length
    // let loopCount = 1

    // for (let i in images) {
    //   if (this.getImageInfo(images[i], i)) {
    //     this.setState({ loaded: loopCount === maxCount })
    //     loopCount++
    //   }
    // }
  }

  render() {
    const { images } = this.props
    console.log({ images });
    return (
      <Fragment>
        <section id="slider" className="slider">
          <div id="wrapper" className="slides-wrapper">
            <div id="slide" className="slide" data-slide-id="0">
              <img className="slide__img" src="1.jpg" alt="slider-0" />
              <div className="slide__caption">
                <span className="slide__caption--title">Slide 1</span>
                <span className="slide__caption--text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam assumenda nostrum quisquam voluptatem consectetur dolore, necessitatibus doloribus temporibus, enim animi adipisci architecto ipsum, labore corporis! Quaerat doloribus consequatur ex blanditiis?</span>
              </div>
            </div>
            <div id="slide" className="slide" data-slide-id="1">
              <img className="slide__img" src="2.jpg" alt="slider-1" />
              <div className="slide__caption">
                <span className="slide__caption--title">Slide 2</span>
                <span className="slide__caption--text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam assumenda nostrum quisquam voluptatem consectetur dolore, necessitatibus doloribus temporibus, enim animi adipisci architecto ipsum, labore corporis! Quaerat doloribus consequatur ex blanditiis?</span>
              </div>
            </div>
            <div id="slide" className="slide" data-slide-id="2">
              <img className="slide__img" src="https://images.unsplash.com/photo-1511431426884-c1525fc26c8a?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="slider-2" />
              <div className="slide__caption">
                <span className="slide__caption--title">Slide 3</span>
                <span className="slide__caption--text">3.jpg</span>
              </div>
            </div>
            <div id="slide" className="slide" data-slide-id="3">
              <img className="slide__img" src="4.jpg" alt="slider-3" />
              <div className="slide__caption">
                <span className="slide__caption--title">Slide 4</span>
                <span className="slide__caption--text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam assumenda nostrum quisquam voluptatem consectetur dolore, necessitatibus doloribus temporibus, enim animi adipisci architecto ipsum, labore corporis! Quaerat doloribus consequatur ex blanditiis?</span>
              </div>
            </div>
          </div>

          <a href="#" className="slider__btn slider__btn--prev" data-slide="prev">
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </a>
          <a href="#" className="slider__btn slider__btn--next" data-slide="next">
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </a>

          <div className="indicators">
            <ul className="indicators__list">
              <li className="indicators__item active" data-slide-to="0"></li>
              <li className="indicators__item" data-slide-to="1"></li>
              <li className="indicators__item" data-slide-to="2"></li>
              <li className="indicators__item" data-slide-to="3"></li>
            </ul>
          </div>
        </section>
      </Fragment>
    )
  }
}

FullPageSlider.propTypes = {
  images: PropTypes.array.isRequired
}
