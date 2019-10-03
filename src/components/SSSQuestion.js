import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'
import './SSS.scss'


class SSSQuestion extends Component {
  state = {
  }

  handleQuestionClick = (index) => {
    const { handleClick } = this.props
    // this.setState({ isClicked: '' })
    handleClick(index)
  }
  render() {
    const { index, question } = this.props
    console.log('asma here')
    return (
      <React.Fragment>
        <button
          className="button"
          value={index}
          onClick={() => this.handleQuestionClick(index)}
        >
          <span className="question-text">
            {`${index + 1}. ${question}`}
          </span>
          <Icon flipped='horizontally' name='chevron down' />
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
