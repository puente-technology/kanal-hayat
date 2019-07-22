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
    console.log({images});
    return (
      <Fragment>
      </Fragment>
    )
  }
}

FullPageSlider.propTypes = {
  images: PropTypes.array.isRequired
}
