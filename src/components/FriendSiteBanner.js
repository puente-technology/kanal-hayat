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
      <FriendSiteBanner edge={data.allFriendSiteBannerYaml.edges[0]} />
    )}
  />
)


const FriendSiteBanner = (edge) => {
  const { node } = edge.edge;
  return (
    <div className="friendSiteBannerContainer">
      <div className="background">
        <img className="imageStyle" alt={node.imageObj[0].alt} src={node.imageObj[0].image} />
      </div>
      <div className="logoDiv">
        <img className="logoStyle" alt={node.logo[0].alt} src={node.logo[0].image} />
        <p className="header">
          {node.header}
        </p>
        <p className="content">
          {node.content}
        </p>
        <button type="button" className="button">
          {node.buttonText}
        </button>
      </div>
    </div>
  )
}
