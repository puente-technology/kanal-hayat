import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './SeriesList.scss'


class SerieCard extends Component {
  state = {
    isClicked: '',
  }

  handleCardClick = (e) => {
    const { handleClick } = this.props
    this.setState({ isClicked: '' })
    handleClick(e.target.value)
  }


  render() {
    const { frontmatter, value } = this.props
    const { isClicked } = this.state
    return (
      <React.Fragment>
        <button
          type="button"
          style={{
            background: `url(${frontmatter.coverImage})`,
          }}
          className="SerieCard"

        >
          <button
            type="button"
            value={value}
            onClick={this.handleCardClick}
            className={`paravan ${isClicked}`}
          />
          <div className="SpanContainer">
            <span className="SerieCardTitle">
              {frontmatter.title}
            </span>
            <span className="SerieCardHost">
              {frontmatter.host}
            </span>
          </div>
        </button>
      </React.Fragment>
    )
  }
}

SerieCard.propTypes = {
  frontmatter: PropTypes.any,
  handleClick: PropTypes.func,
  value: PropTypes.any,
}


export default SerieCard;
