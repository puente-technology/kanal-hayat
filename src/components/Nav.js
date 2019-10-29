import React, { Component } from 'react'
import { Link } from 'gatsby'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Location } from '@reach/router'
import Logo from './Logo'
import { toggleDarkMode } from '../state/app';


import './globalStyles.css'
import './Nav.scss'

const menuIcon = require('../../static/images/menu-icon.svg');
const closeIcon = require('../../static/images/close.png');

export class LocationComp extends Component {
  static propTypes = {
    color: PropTypes.any,
    align: PropTypes.any,
    dispatch: PropTypes.any,
  }

  state = {

  }

  render() {
    const { color, align, dispatch } = this.props
    return (
      <Location>
        {
        route => <Navigation dispatch={dispatch} color={color} align={align} {...route} />
        }
      </Location>
    )
  }
}

export class Navigation extends Component {
  static propTypes = {
    location: PropTypes.any,
    color: PropTypes.any,
    align: PropTypes.any,
    dispatch: PropTypes.any,
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

  handleOpenNav = () => {
    const { active } = this.state;
    this.setState(() => ({ active: !active }));
  }

  handleLiveNowClick = () => {
    const {
      dispatch,
    } = this.props
    dispatch(toggleDarkMode(
      null,
      null,
      true,
      null,
      null,
      null,
      false,
      null,
      false,
      true,
      true,
    ))
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
          <Link to="/" onClick={this.handleLinkClick}>
            <Logo />
          </Link>
          <div className={`Nav--Links ${color} ${color.nav ? 'side-menu-open' : ''}`}>
            <button type="button" className="Nav--XIcon" onClick={this.handleOpenNav}><img className="Nav--XIcon--Img" src={closeIcon} alt="CloseIcon" /></button>
            <NavLink color={color} align={align} to="/">Ana Sayfa</NavLink>
            <NavLink color={color} align={align} to="/events">Yayın Akışı</NavLink>
            <NavLink color={color} align={align} to="/series">Programlar</NavLink>
            <NavLink color={color} align={align} to="/hosts">Sunucular</NavLink>
            <NavLink color={color} align={align} to="/about-us">Kanal Hayat Hakkında</NavLink>
            <NavLink color={color} align={align} to="/s-s-s">S. S. S.</NavLink>
            <NavLink color={color} align={align} to="/contact-us">İletişim</NavLink>
            <div style={{ display: 'none' }} className="styled-select">
              <select defaultValue="0">
                <option value="0">Türkçe</option>
              </select>
            </div>
            <button onClick={this.handleLiveNowClick} type="button" className="NavWatchNow">CANLI İZLE</button>
            <input style={{ display: 'none' }} className="Nav--Search" type="text" />
          </div>
          <button type="button" className="Nav--MenuButton" onClick={this.handleOpenNav}><img src={menuIcon} alt="MenuIcon" /></button>
        </div>
      </nav>
    )
  }
}

// export default (color, align) => (
// <Location>{route => <Navigation color={color} align={align} {...route} />}</Location>
// )
export default connect(state => ({
  episode: state.app.episode,
  episodes: state.app.episodes,
  handleCloseClick: state.app.handleCloseClick,
  frontmatter: state.app.frontmatter,
}), null)(LocationComp)
