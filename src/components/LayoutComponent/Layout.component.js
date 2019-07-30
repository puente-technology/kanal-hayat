import React, { Component } from 'react'
import PropTypes from 'prop-types';
import PageFooter from '../PageFooter';
import Helmet from 'react-helmet'

export class Layout extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
        <PageFooter />
      </div>
    )
  }
}

export default Layout;

