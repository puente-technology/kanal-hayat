import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FullPageSlider from '../components/FullPageSlider';
import HomePageSlider from '../cms/preview-templates/HomePageSlider';
import ProgrammeHomePage from '../components/ProgrammeHomePage';
import FriendSiteBanner from '../components/FriendSiteBanner';
import LiveNow from '../components/LiveNow';
import HomePageLayout from '../components/HomePageLayout';

// Export Template for use in CMS preview
export const HomePageTemplate = (data) => {
  let program = data.program1;
  let { program2 } = data;
  if (Array.isArray(data.program1)) {
    [program] = data.program1;
  }
  if (Array.isArray(data.program2)) {
    [program2] = data.program2;
  }

  return (
    <div>
      {
        data.frontmatter
          ? <FullPageSlider autoSlide gallery={data.gallery} slideTime={7000} />
          : <HomePageSlider data={data.gallery} />
      }
      <LiveNow dispatch={data.dispatch} isLiveStream={false} />
      {
        program
        && <ProgrammeHomePage data={program} hosts={data.hosts} dispatch={data.dispatch} />
      }
      <FriendSiteBanner />
      {
        program2
        && <ProgrammeHomePage data={program2} hosts={data.hosts} dispatch={data.dispatch} />
      }
    </div>
  )
}

class HomePage extends Component {
  static propTypes = {
    data: PropTypes.any,
    dispatch: PropTypes.any,
    shouldInit: PropTypes.any,
    hosts: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      data,
      dispatch,
      hosts,
    } = this.props
    const { page } = data
    return (
      <HomePageLayout>
        <HomePageTemplate
          {...page}
          {...page.frontmatter}
          body={page.html}
          host={hosts}
          dispatch={dispatch}
        />
      </HomePageLayout>
    )
  }
}

export default connect(state => ({
  test: state,
  shouldInit: state.app.shouldInit,
  hosts: state.app.hosts,
}), null)(HomePage)

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!, $locale: String) {
    page: markdownRemark(id: { eq: $id }, frontmatter: { locale: { eq: $locale }}) {
      # ...Meta
      html
      frontmatter {
        title
        featuredImage
        gallery {
          alt
          image
          title
          link
          align
          color
        }
        program1 {
          title
          content
          bgImage
          color
          align
          thumbnailTitle
          thumbnails {
            image
            youtubeURL {
              description
              id
              imageURL
              publishedAt
              tags
              title
              url
              viewCount
              duration
            }
          }
        }
        program2 {
          title
          content
          bgImage
          color
          align
          thumbnailTitle
          thumbnails {
            image
            youtubeURL {
              description
              id
              imageURL
              publishedAt
              tags
              title
              url
              viewCount
              duration
            }
          }
        }
      }
    }
    hosts: allMarkdownRemark(filter: {fields: {contentType: {regex: "/hosts/"}}}) {
      edges {
        node {
          fields {
            slug
            contentType
          }
          frontmatter {
            host
          }
        }
      }
    }
  }
`
