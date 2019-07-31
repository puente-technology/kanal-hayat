import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Location } from '@reach/router'
import Logo from './Logo'

import './globalStyles.css'
import './Nav.scss'

export class Navigation extends Component {
  state = {
    active: false,
    currentPath: false
  }

  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  render() {
    const { active } = this.state,
      NavLink = ({ to, color, align, className, children, ...props }) => {
        return (
          <Link
            to={to}
            className={`NavLink ${
              to === this.state.currentPath ? 'active' : ''
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
    console.log({ color });
    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <Link to="/" onClick={this.handleLinkClick}>
            <Logo />
          </Link>
          <div className={`Nav--Links ${color.color}`}>
            <NavLink color={color} align={align} to="/">Yayın Akışı</NavLink>
            <NavLink color={color} align={align} to="/components/">Öğren</NavLink>
            <NavLink color={color} align={align} to="/default/">Kanal Hayat Hakkında</NavLink>
            <NavLink color={color} align={align} to="/contact/">İletişim</NavLink>
            <div style={{ display: 'none' }} className="styled-select">
              <select defaultValue="0">
                <option value="0">Türkçe</option>
              </select>
            </div>
            <button className="NavWatchNow">CANLI İZLE</button>
            <input className="Nav--Search" type="text"></input>
          </div>
        </div>
      </nav>
    )
  }
}

export default (color, align) => (
  <Location>{route => <Navigation color={color} align={align} {...route} />}</Location>
)
