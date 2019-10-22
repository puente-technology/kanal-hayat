import React, { Component } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types';
import { Location } from '@reach/router'
import Logo from './Logo'

import './globalStyles.css'
import './Nav.scss'

export class Navigation extends Component {
  static propTypes = {
    location: PropTypes.any,
    color: PropTypes.any,
    align: PropTypes.any,
  }

  state = {
    active: false,
    currentPath: false,
  }

  componentDidMount = () => {
    const { location } = this.props;
    this.setState({ currentPath: location.pathname })
  }

  handleMenuToggle = () => {
    const { active } = this.state;
    this.setState({ active: !active })
  }

  // Only close nav if it is open
  handleLinkClick = () => {
    const { active } = this.state;
    if (active) {
      this.handleMenuToggle()
    }
  }

  render() {
    const { active } = this.state;
    const NavLink = ({
      to, color, align, className, children, ...props
    }) => {
      const { currentPath } = this.state;
      return (
        <Link
          to={to}
          className={`NavLink ${
            to === currentPath ? 'active' : ''
          } ${className || ''}
              `}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )
    }
    const { color, align } = this.props;
    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <Link style={{ position: 'absolute', left: '10px' }} to="/" onClick={this.handleLinkClick}>
            <Logo />
          </Link>
          <div className={`Nav--Links ${color.color}`}>
            <NavLink color={color} align={align} to="/">Ana Sayfa</NavLink>
            <NavLink color={color} align={align} to="/events">Yayın Akışı</NavLink>
            <NavLink color={color} align={align} to="/series">Programlar</NavLink>
            <NavLink color={color} align={align} to="/about-us">Kanal Hayat Hakkında</NavLink>
            <NavLink color={color} align={align} to="/s-s-s">S. S. S.</NavLink>
            <NavLink color={color} align={align} to="/hosts">Sunucular</NavLink>
            <NavLink color={color} align={align} to="/contact-us">İletişim</NavLink>
            <div style={{ display: 'none' }} className="styled-select">
              <select defaultValue="0">
                <option value="0">Türkçe</option>
              </select>
            </div>
            <button type="button" className="NavWatchNow">CANLI İZLE</button>
            <input style={{ display: 'none' }} className="Nav--Search" type="text" />
          </div>
        </div>
      </nav>
    )
  }
}

export default (color, align) => (
  <Location>{route => <Navigation color={color} align={align} {...route} />}</Location>
)
