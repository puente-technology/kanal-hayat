
import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import SeriesPage from '../components/SeriesPage';
import Nav from '../components/Nav';
import '../components/SeriesPage.scss'
import SeriesPageLayout from '../components/SeriesPageLayout';
// Export Template for use in CMS preview
// export const AboutUsPageTemplate = data => (
//   <AboutUs {...data} />
// )

// Export Default HomePage for front-end
class SeriesPageTemplate extends Component {
  state = {
    list: [],
  }

  componentDidMount() {
    const { data: { page } } = this.props
    const list = page.frontmatter.episodes.sort(
      (a, b) => {
        const adate = a.youtubeURL.publishedAt
        const bdate = b.youtubeURL.publishedAt
        if (adate < bdate) {
          return -1;
        }
        if (adate > bdate) {
          return 1;
        }
        return 0;
      },
    )
    this.setState({ list })
  }

  handleTextChange = (e) => {
    // let { list } = this.state;
    // if (e.target.value === '') {
    // }
    const { data: { page } } = this.props
    const list = page.frontmatter.episodes
    const res = list
      .filter(d => d.youtubeURL.title.toLowerCase().includes(e.target.value.toLowerCase()))

    this.setState({ list: res })
  }

  handleNameClick = () => {
    const { list } = this.state
    const tmp = list.sort((a, b) => {
      const atitle = a.youtubeURL.title
      const btitle = b.youtubeURL.title
      if (atitle < btitle) {
        return -1;
      }
      if (atitle > btitle) {
        return 1;
      }
      return 0;
    })
    this.setState({ list: tmp })
  }

  handleDateClick = () => {
    const { list } = this.state
    const tmp = list.sort((a, b) => {
      const adate = a.youtubeURL.publishedAt
      const bdate = b.youtubeURL.publishedAt
      if (adate < bdate) {
        return -1;
      }
      if (adate > bdate) {
        return 1;
      }
      return 0;
    })
    this.setState({ list: tmp })
  }

  render() {
    const {
      data: { page },
    } = this.props

    const { list } = this.state
    const {
      title,
      coverImage,
      host,
      description,
    } = page.frontmatter
    return (
      <SeriesPageLayout>
        <CustomHeaderBanner
          image={coverImage}
          title={title}
          host={host}
          description={description}
          handleNameClick={this.handleNameClick}
          handleDateClick={this.handleDateClick}
          handleTextChange={this.handleTextChange}
        />
        <SeriesPage episodes={list} frontmatter={page.frontmatter} />

      </SeriesPageLayout>
    )
  }
}

SeriesPageTemplate.propTypes = {
  data: PropTypes.any,
  episodes: PropTypes.any,
  frontmatter: PropTypes.any,
}


export default connect(state => ({
  episode: state.app.episode || null,
  episodes: state.app.episodes || null,
  playing: state.app.playing || null,
  frontmatter: state.app.frontmatter || null,
  index: state.app.index || null,
  handleCloseClick: state.app.handleCloseClick || null,
}), null)(SeriesPageTemplate)

export const pageQuery = graphql`
query SeriesPageTemplate($id: String!, $locale: String) {
  page: markdownRemark(id: { eq: $id }, frontmatter: { locale: { eq: $locale }}) {
    html
    frontmatter {
      title
      coverImage
      description
      host
      language
      targetGroup
      episodes {
        guests
        youtubeURL {
          viewCount
          url
          title
          tags
          mediaType
          imageURL
          id
          description
          publishedAt
        }
      }
    }
  }
}
`
const CustomHeaderBanner = (props) => {
  const {
    image,
    title,
    host,
    description,
    handleNameClick,
    handleDateClick,
    handleTextChange,
  } = props
  return (
    <div
      style={{ background: `url(${image})` }}
      className="customHeaderBanner"
    >
      <Nav color="light" />
      <div className="TextInfo">
        <div className="TextInfoTitle">
          {title}
        </div>
        <div className="TextInfoHost">
          {host}
        </div>
        <div className="TextInfoDescription">
          {description.slice(0, 250)}
        </div>
        <div className="TextInfoEpisode">
          <div className="TextInfoEpisodeTitle">
            Bölümler
          </div>
          <div className="TextInfoEpisodeBtns">
            <button value="title" onClick={handleNameClick} type="button" className="TextInfoButton">İsim</button>
            <button value="date" onClick={handleDateClick} type="button" className="TextInfoButton">Tarih</button>
            <input onChange={handleTextChange} className="Nav--Search" type="text" />
          </div>
        </div>
      </div>
    </div>
  )
}

CustomHeaderBanner.propTypes = {
  image: PropTypes.any,
  title: PropTypes.any,
  host: PropTypes.any,
  description: PropTypes.any,
  handleNameClick: PropTypes.any,
  handleDateClick: PropTypes.any,
  handleTextChange: PropTypes.any,
}
