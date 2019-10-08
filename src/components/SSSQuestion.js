/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './SSS.scss'


class SSSQuestion extends Component {
  state = {
    isClicked: false,
  }

  handleQuestionClick = (index) => {
    const { handleClick } = this.props
    const { isClicked } = this.state
    this.setState({ isClicked: !isClicked })
    handleClick(index)
  }

  render() {
    const { index, question } = this.props
    return (
      <React.Fragment>
        <button
          type="button"
          className="button"
          value={index}
          onClick={() => this.handleQuestionClick(index)}
        >
          <span className="question-text">
            {`${index + 1}. ${question}`}
          </span>
          <div><i aria-hidden="true" className="chevron down horizontally flipped icon" /></div>
        </button>
      </React.Fragment>
    )
  }
}

SSSQuestion.propTypes = {
  question: PropTypes.any,
  index: PropTypes.any,
  handleClick: PropTypes.any,
}


export default SSSQuestion;
