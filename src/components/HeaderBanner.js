import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types';
import Nav from './Nav';


import './HaederBanner.css';

export default asd => (
  <StaticQuery
    query={graphql`
    query HeaderBanner {
      allHeaderBannerYaml {
        edges {
          node {
            list {
              title
              image
            }
          }
        }
      }
    }
    `}
    render={data => (
      <HeaderBanner edges={data.allHeaderBannerYaml.edges} title={asd} />
    )}
  />
)


export class HeaderBanner extends Component {
  static propTypes = {
    edges: PropTypes.any.isRequired,
    title: PropTypes.any.isRequired,
  };

  render() {
    const { edges, title } = this.props;
    return (
      <div className="headerBanner">
        <Nav color="light" />
        <div style={{ position: 'relative' }}>
          {
              edges[0].node.list.map((items, index) => {
              if(items.title === title.data) {
                return (
                  <img key={index} className="imageBackground" src={items.image} alt={title}/>
                  )
                }
              })
            }
          <div className="headerText">
            <p style={{ paddingTop: '40px' }}>
              {title.data}
            </p>
          </div>
        </div>
      </div>
    )
  }
}
