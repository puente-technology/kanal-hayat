import React, { Fragment, PureComponent } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types';
import PageFooterQ from './PageFooter';
import MobileAppLink from './MobileAppLink'

class SeriesPageLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      children,
    } = this.props
    return (
      <Fragment>
        <Helmet>
          <link href="https://ucarecdn.com" rel="preconnect" crossOrigin />
          <link rel="dns-prefetch" href="https://ucarecdn.com" />
          <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" />
        </Helmet>
        {/* <Nav color={color} align={align} /> */}
        <div className="MainDiv">
          {children}
          <MobileAppLink />
          <PageFooterQ />
        </div>
      </Fragment>
    )
  }
}

export default SeriesPageLayout
