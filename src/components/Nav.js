import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Location } from '@reach/router'
import styled from 'styled-components'
import Logo from './Logo'

import './globalStyles.css'
import './Nav.css'

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
      NavLink = ({ to, menuColor, className, children, ...props }) => {
        const StyledLink = styled(props => <Link {...props} />)`
          color: ${menuColor} !important;`;
        return (
          <Link
            to={to}
            className={`NavLink ${
              to === this.state.currentPath ? 'active' : ''
              } ${className || ''}`}
            onClick={this.handleLinkClick}
            {...props}
          >
            {children}
          </Link>
        )
      }
    const { menuColor } = this.props;
    console.log({ xx: this.props.menuColor });
    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <Link to="/" onClick={this.handleLinkClick}>
            <Logo />
          </Link>
          <div className="Nav--Links">
            <NavLink menuColor={menuColor} to="/">Yayın Akışı</NavLink>
            <NavLink menuColor={menuColor} to="/components/">Öğren</NavLink>
            <NavLink menuColor={menuColor} to="/default/">Kanal Hayat Hakkında</NavLink>
            <NavLink menuColor={menuColor} to="/contact/">İletişim</NavLink>
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

export default (menuColor) => (
  <Location>{route => <Navigation menuColor={menuColor} {...route} />}</Location>
)
