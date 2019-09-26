/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dropdown.scss';


class Dropdown extends Component {
  static propTypes = {
    list: PropTypes.array,
    handleLanguageChange: PropTypes.any,
    handleTargetChange: PropTypes.any,
    handleSeasonChange: PropTypes.any,
    style: PropTypes.any,
  };

  static defaultProps = {
    list: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      labelItem: null,
      typeDropdown: null,
    };
  }

  componentWillMount() {
    const { list } = this.props;
    const { label } = list[0];
    let firstItem = null;
    if (typeof label !== 'undefined') {
      this.checkType(false);
      firstItem = label;
    } else {
      this.checkType(true);
      firstItem = list[0];
    }
    this.setState({
      labelItem: firstItem,
    });
  }

  checkType = (value) => {
    this.setState({
      typeDropdown: value,
    });
  };

  showDropdown = () => {
    this.setState({ isOpen: true });
    document.addEventListener('click', this.hideDropdown);
  };

  hideDropdown = () => {
    this.setState({ isOpen: false });
    document.removeEventListener('click', this.hideDropdown);
  };

  chooseItem = (value) => {
    const { handleLanguageChange, handleTargetChange, handleSeasonChange } = this.props
    const { labelItem } = this.state
    if (labelItem !== value) {
      if (handleLanguageChange) {
        handleLanguageChange(value)
      } else if (handleTargetChange) {
        handleTargetChange(value)
      } else if (handleSeasonChange) {
        handleSeasonChange(value)
      }
      this.setState({
        labelItem: value,
      })
    }
  };

  renderDataDropDown = (item, index) => {
    const { typeDropdown } = this.state
    const { value, label } = typeDropdown ? { value: index, label: item } : item
    return (
      <li
        key={index}
        value={value}
        onClick={() => this.chooseItem(label)}
      >
        <a>
          {label}
        </a>
      </li>
    )
  };

  render() {
    const { list, style } = this.props;
    const { isOpen, labelItem } = this.state
    return (
      <div className={`dropdown ${isOpen ? 'open' : ''}`}>
        <button style={style} className="dropdown-toggle" type="button" onClick={this.showDropdown}>
          {labelItem}
        </button>
        <ul className="dropdown-menu">
          {list.map(this.renderDataDropDown)}
        </ul>
      </div>
    )
  }
}

export default Dropdown
