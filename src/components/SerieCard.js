import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './SeriesList.scss'
import { Link } from 'gatsby';


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
    const { frontmatter, slug } = this.props
    const { isClicked } = this.state
    return (
      <React.Fragment>
        <Link
          to={slug}
          style={{
            background: `url(${frontmatter.coverImage})`,
          }}
          className="SerieCard"

        >
          <button
            type="button"
            value={frontmatter.title}
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
        </Link>
      </React.Fragment>
    )
  }
}

SerieCard.propTypes = {
  frontmatter: PropTypes.any,
  handleClick: PropTypes.func,
  slug: PropTypes.any,
}


export default SerieCard;
