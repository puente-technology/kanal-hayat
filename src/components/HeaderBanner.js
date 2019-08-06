/* eslint-disable react/jsx-no-bind */
import React from 'react';
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


const HeaderBanner = (props) => {
  const { edges, title } = props;
  console.log('object');
  return (
    <div className="headerBanner">
      <Nav color="light" />
      <div style={{ position: 'relative' }}>
        {
          edges[0].node.list.map((items, index) => {
            if (items.title === title.data) {
              return (
                <img key={index} className="imageBackground" src={items.image} alt={title} />
              )
            }
            return <React.Fragment></React.Fragment>
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

HeaderBanner.propTypes = {
  edges: PropTypes.any.isRequired,
  title: PropTypes.any.isRequired,
};
