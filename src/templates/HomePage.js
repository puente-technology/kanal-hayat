import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { connect } from 'react-redux';
import moment from 'moment'
import PropTypes from 'prop-types';
import FullPageSlider from '../components/FullPageSlider';
import HomePageSlider from '../cms/preview-templates/HomePageSlider';
import ProgrammeHomePage from '../components/ProgrammeHomePage';
import FriendSiteBanner from '../components/FriendSiteBanner';
import LiveNow from '../components/LiveNow';
import { toggleDarkMode } from '../state/app';
import HomePageLayout from '../components/HomePageLayout';

const APIKey = 'AIzaSyAln9Zizqc3_r8zozq4OcmqwwsUOXRJtuE'

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
          ? <FullPageSlider autoSlide gallery={data.gallery} slideTime={5000} />
          : <HomePageSlider data={data.gallery} />
      }
      <LiveNow />
      {
        program
        && <ProgrammeHomePage data={program} />
      }
      <FriendSiteBanner />
      {
        program2
        && <ProgrammeHomePage data={program2} />
      }
    </div>
  )
}

class HomePage extends Component {
  static propTypes = {
    data: PropTypes.any,
    dispatch: PropTypes.any,
    shouldInit: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      durationArr: [],
    };
  }

  componentDidMount() {
    const { data } = this.props
    const { edges } = data.episodes
    edges.forEach((el) => {
      const { frontmatter } = el.node
      const { program1, program2, episodes } = frontmatter
      if (program1) {
        Object.entries(program1.thumbnails).forEach(([key, val]) => {
          if (val.youtubeURL && key) {
            this.getDuration(val.youtubeURL)
          }
        })
      }
      if (program2) {
        Object.entries(program2.thumbnails).forEach(([key, val]) => {
          if (val.youtubeURL && key) {
            this.getDuration(val.youtubeURL)
          }
        })
      }
      if (episodes) {
        Object.entries(episodes).forEach(([key, val]) => {
          if (val.youtubeURL && key) {
            this.getDuration(val.youtubeURL)
          }
        })
      }
    })
  }

  getDuration = (episode) => {
    const { durationArr } = this.state
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${episode.id}&key=${APIKey}`,
    )
      .then(res => res.json())
      .then((json) => {
        if (json !== undefined) {
          let time = ''
          const timeObj = moment.duration(json.items[0].contentDetails.duration)._data
          let hours = timeObj.hours ? timeObj.hours.toString() : ''
          let minutes = timeObj.minutes ? timeObj.minutes.toString() : ''
          let seconds = timeObj.seconds ? timeObj.seconds.toString() : ''
          if (hours) {
            if (hours.length === 1) {
              hours = `0${hours}`
            }
            time = `${time + hours}:`
          }
          if (minutes) {
            if (minutes.length === 1) {
              minutes = `0${minutes}`
            }
            time = `${time + minutes}:`
          }
          if (seconds) {
            if (seconds.length === 1) {
              seconds = `0${seconds}`
            }
            time = `${time + seconds}`
          }
          durationArr.push({ [episode.id]: time })
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }

  render() {
    const { data, dispatch, shouldInit } = this.props
    const { page } = data
    const hosts = data.hosts.edges
    const { durationArr } = this.state
    if (shouldInit) {
      setTimeout(() => {
        dispatch(toggleDarkMode(
          '',
          '',
          true,
          '',
          '',
          this.handleCloseClick,
          false,
          durationArr,
          false,
          hosts,
        ))
      }, 800);
    }
    return (
      <HomePageLayout>
        <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
      </HomePageLayout>
    )
  }
}

export default connect(state => ({
  test: state,
  shouldInit: state.app.shouldInit,
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
            }
          }
        }
      }
    }
   episodes: allMarkdownRemark(filter: {fields: {contentType: {regex: "/home/|/series/"}}}) {
      edges {
        node {
          fields {
            slug
            contentType
          }
          frontmatter {
            program1 {
              thumbnails {
                youtubeURL {
                  url
                  id
                }
              }
            }
            program2 {
              thumbnails {
                youtubeURL {
                  url
                  id
                }
              }
            }
            episodes {
              youtubeURL {
                id
                url
              }
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
