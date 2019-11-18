import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Tooltip.scss'

class Tooltip extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayTooltip: false,
    }
    this.hideTooltip = this.hideTooltip.bind(this)
    this.showTooltip = this.showTooltip.bind(this)
  }

  onFocusEve = () => 0

  hideTooltip() {
    this.setState({ displayTooltip: false })
  }

  showTooltip() {
    this.setState({ displayTooltip: true })
  }

  render() {
    const {
      message,
      position,
      children,
    } = this.props
    const { displayTooltip } = this.state
    return (
      <span
        className="tooltip"
        onMouseLeave={this.hideTooltip}
        onFocus={this.onFocusEve}
      >
        {displayTooltip
        && (
        <div className={`tooltip-bubble tooltip-${position}`}>
          <div className="tooltip-message">{message}</div>
        </div>
        )
        }
        <span
          className="tooltip-trigger"
          onMouseOver={this.showTooltip}
          onFocus={this.onFocusEve}
        >
          {children}
        </span>
      </span>
    )
  }
}

Tooltip.propTypes = {
  message: PropTypes.any,
  position: PropTypes.any,
  children: PropTypes.any,
}


export default Tooltip
