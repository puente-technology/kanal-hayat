/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { StaticQuery, graphql } from 'gatsby'
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
    render={data => (
      <FriendSiteBanner edges={data.allFriendSiteBannerYaml.edges} />
    )}
  />
)


export const FriendSiteBanner = edges => (
  <div className="friendSiteBannerContainer">
    <div className="background">
      <img className="imageStyle" alt={edges.edges[0].node.imageObj[0].alt} src={edges.edges[0].node.imageObj[0].image} />
    </div>
    <div className="logoDiv">
      <img className="logoStyle" alt={edges.edges[0].node.logo[0].alt} src={edges.edges[0].node.logo[0].image} />
      <p className="header">
        {edges.edges[0].node.header}
      </p>
      <p className="content">
        {edges.edges[0].node.content}
      </p>
      <button type="button" className="button">
        {edges.edges[0].node.buttonText}
      </button>
    </div>
  </div>
)
