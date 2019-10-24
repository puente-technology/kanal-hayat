import React, { Component } from 'react'
import { Link } from 'gatsby';
import PropTypes from 'prop-types'

import './SeriesList.scss'


class HostCard extends Component {
  state = {
    isClicked: '',
  }

  handleCardClick = (e) => {
    const { handleClick } = this.props
    this.setState({ isClicked: '' })
    handleClick(e.target.value)
  }

  render() {
    const {
      frontmatter,
      value,
      slug,
    } = this.props
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
          <Link
            to={slug}
          >
            <button
              type="button"
              value={value}
              onClick={this.handleCardClick}
              className={`paravan ${isClicked}`}
            />
            <div className="SpanContainer">

              <span className="SerieCardTitle">
                {frontmatter.host}
              </span>

            </div>
          </Link>
        </button>
      </React.Fragment>
    )
  }
}

HostCard.propTypes = {
  frontmatter: PropTypes.any,
  handleClick: PropTypes.func,
  value: PropTypes.any,
  slug: PropTypes.any,
}


export default HostCard;
