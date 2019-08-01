import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types';
import './FriendSiteBanner.css';

export default () => (
  <StaticQuery
    query={graphql`
    query FriendSiteBanner {
      allFriendSiteBannerYaml {
        edges {
          node {
            buttonText
            color
            content
            header
            logo {
              alt
              image
              title
            }
            imageObj {
              alt
              image
              title
            }
          }
        }
      }
    }
    `}
    render={(data) => (
      <FriendSiteBanner edges={data.allFriendSiteBannerYaml.edges }/>
    )}
  />
)


export class FriendSiteBanner extends Component {

  static propTypes = {
    edges: PropTypes.any.isRequired,
  };

  render() {
    const { edges } = this.props;
    return (
      <div className="friendSiteBannerContainer">
        <div className="background">
          <img className="imageStyle" alt={edges[0].node.imageObj[0].alt} src={edges[0].node.imageObj[0].image} />
        </div>
        <div className="logoDiv">
          <img className="logoStyle" alt={edges[0].node.logo[0].alt} src={edges[0].node.logo[0].image} />
          <p className="header">
            {edges[0].node.header}
          </p>
          <p className="content">
            {edges[0].node.content}
          </p>
          <button className="button">
            {edges[0].node.buttonText}
          </button>
        </div>
        {/* <div className="sideDiv">
          <img className="logoStyle" alt={edges[0].node.logo[0].alt} src={edges[0].node.logo[0].image} />
          <p className="header">
            {edges[0].node.header}
          </p>
          <p className="content">
            {edges[0].node.content}
          </p>
          <button className="button">
            {edges[0].node.buttonText}
          </button>
        </div> */}
      </div>
    )
  }
}
