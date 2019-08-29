import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './SeriesList.scss'


class SerieCard extends Component {
  handleCardClick = (e) => {
    const { handleClick } = this.props;
    handleClick(e.target.value)
  }


  render() {
    const { frontmatter } = this.props;
    return (
      <React.Fragment>
        <button
          type="button"
          style={{
            background: `url(${frontmatter.coverImage})`,
          }}
          className="SerieCard"
          value={frontmatter.title}
          onClick={this.handleCardClick}
        >
          {/* <div className="paravan" /> */}
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
}


export default SerieCard;
