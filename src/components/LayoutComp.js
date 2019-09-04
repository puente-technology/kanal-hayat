import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import Helmet from 'react-helmet'
import PropTypes from 'prop-types';
import PageFooterQ from './PageFooter';
import MobileAppLink from './MobileAppLink'
// import FriendSiteBanner from './FriendSiteBanner'
import Player from './Player';

import HeaderBanner from './HeaderBanner';

import './globalStyles.css'

const LayoutComp = ({
  children,
  episode,
  episodes,
  playing,
  frontmatter,
  index,
  handleCloseClick,
}) => (
  <Fragment>
    <Helmet>
      <link href="https://ucarecdn.com" rel="preconnect" crossOrigin />
      <link rel="dns-prefetch" href="https://ucarecdn.com" />
      <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" />
    </Helmet>
    {/* <Nav color={color} align={align} /> */}
    <div className="MainDiv">
      <HeaderBanner data={children.props.title || children.props.data.title} />
      {children}
      <MobileAppLink />
      <PageFooterQ />
      {
        episode && (
          <Player
            episodeInfo={episode}
            episodes={episodes}
            playing={playing}
            playerIndex={index}
            handleCloseClick={handleCloseClick}
            frontmatter={frontmatter}
          />
        )
      }
    </div>
  </Fragment>
)

LayoutComp.propTypes = {
  children: PropTypes.any,
  episode: PropTypes.any,
  episodes: PropTypes.any,
  playing: PropTypes.any,
  frontmatter: PropTypes.any,
  index: PropTypes.any,
  handleCloseClick: PropTypes.any,
}
export default connect(state => ({
  episode: state.app.episode || null,
  episodes: state.app.episodes || null,
  playing: state.app.playing || null,
  frontmatter: state.app.frontmatter || null,
  index: state.app.index || null,
  handleCloseClick: state.app.handleCloseClick || null,
}), null)(LayoutComp)
