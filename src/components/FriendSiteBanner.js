/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { StaticQuery, graphql } from 'gatsby'
import './FriendSiteBanner.scss';

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
    <div className="banner-container">
      <div className="">
        <img className="imageStyle" alt={node.imageObj[0].alt} src={node.imageObj[0].image} />
      </div>
      <div className="logoDiv">
        <img className="logoStyle" alt={node.logo[0].alt} src={node.logo[0].image} />
        <p style={{ color: node.color === 'dark' ? 'black' : 'white' }} className="header">
          {node.header}
        </p>
        <p style={{ color: node.color === 'dark' ? 'black' : 'white' }} className="content">
          {node.content}
        </p>
        <span style={{ textAlign: 'center' }}>
          <a href={node.buttonText} target="_blank" rel="noreferrer noopener" className={`slide__caption--btn ${node.color}`}>Siteye Git</a>
        </span>
      </div>
    </div>
  )
}
