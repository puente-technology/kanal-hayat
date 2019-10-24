/* eslint-disable react/jsx-no-bind */
import React, { PureComponent } from 'react';
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


class HeaderBanner extends PureComponent {
  static propTypes = {
    edges: PropTypes.any.isRequired,
    title: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      openNav: false,
    }
  }

  handleOpenNav = () => {
    const { openNav } = this.state;
    this.setState(() => ({ openNav: !openNav }));
  }

  render() {
    const { openNav } = this.state;
    const { edges, title } = this.props;
    return (
      <div className="headerBanner">
        <Nav color="light" nav={openNav} openNav={this.handleOpenNav} />
        <div style={{ position: 'relative' }}>
          {
            edges[0].node.list.map((items, index) => {
              if (items.title === title.data) {
                return (
                  <img key={index} className="imageBackground" src={items.image} alt={title} />
                )
              }
              return <React.Fragment key={index}></React.Fragment>
            })
          }
          <div className="headerText">
            <p className="headerTitle">
              {title.data}
            </p>
          </div>
        </div>
      </div>
    )
  }
}
