
import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import SeriesPage from '../components/SeriesPage';
import Nav from '../components/Nav';
import '../components/SeriesPage.scss'
import SeriesPageLayout from '../components/SeriesPageLayout';
import Dropdown from '../components/Dropdown'
// Export Template for use in CMS preview
// export const AboutUsPageTemplate = data => (
//   <AboutUs {...data} />
// )

// Export Default HomePage for front-end
class SeriesPageTemplate extends Component {
  state = {
    list: [],
    divHeight: 0,
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
    const newTemp = tmp.map(x => ({ ...x, a: '' }))

    this.setState({ list: newTemp })
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
    const newTemp = tmp.map(x => ({ ...x, a: '' }))
    this.setState({ list: newTemp })
  }

  handleSeasonChange = (value) => {
    const { data: { page } } = this.props
    const list = page.frontmatter.episodes
    const seasonVal = value.split('.')[0]
    let res = list;
    if (value !== 'Tüm Bölümer') {
      res = list
        .filter(d => d.season === seasonVal)
    }
    this.setState({ list: res })
  }

  setDivHeight = () => {
    // this.setState({ divHeight: h - 200 })
  }

  render() {
    const {
      data: { page },
    } = this.props

    const { list, divHeight } = this.state
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
          handleSeasonChange={this.handleSeasonChange}
          episodes={page.frontmatter.episodes}
          setDivHeight={this.setDivHeight}
        />
        <SeriesPage divHeight={divHeight} episodes={list} frontmatter={page.frontmatter} />

      </SeriesPageLayout>
    )
  }
}

SeriesPageTemplate.propTypes = {
  episodes: PropTypes.any,
  frontmatter: PropTypes.any,
  data: PropTypes.any,
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
        season
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
          duration
        }
      }
    }
  }
}
`
class CustomHeaderBanner extends Component {
  static propTypes = {
    image: PropTypes.any,
    title: PropTypes.any,
    host: PropTypes.any,
    description: PropTypes.any,
    handleNameClick: PropTypes.any,
    handleDateClick: PropTypes.any,
    handleTextChange: PropTypes.any,
    handleSeasonChange: PropTypes.any,
    episodes: PropTypes.any,
    setDivHeight: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.headerRef = React.createRef();
    console.log('asma ')
    this.state = {
      seasonsInfo: [],
    };
  }

  componentDidMount() {
    const { episodes } = this.props
    const serisSeasonInfo = ['Tüm Bölümer']
    console.log('componentDidMount', this.headerRef)
    if (this.headerRef.current) {
      console.log('has been changed  ')
    }
    const list = episodes.sort(
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
    list.forEach((episode) => {
      if (!serisSeasonInfo.includes(`${episode.season}.Sezon`)) {
        serisSeasonInfo.push(`${episode.season}.Sezon`)
      }
    })
    this.setState({ seasonsInfo: serisSeasonInfo })
  }

  getDivHeight = () => {
    const value = this.headerRef;
    console.log('this.headerRef ', value.current)
  }

  render() {
    const {
      image,
      title,
      host,
      description,
      handleDateClick,
      handleNameClick,
      handleTextChange,
      handleSeasonChange,
    } = this.props;

    const { seasonsInfo } = this.state

    const seasonBtn = {
      borderRadius: '20px',
      color: 'white',
      backgroundColor: 'rgba(241, 241, 241, 0.2)',
      fontSize: '18px',
      fontFamily: 'Nunito',
      fontStyle: 'normal',
    }

    return (
      <div>
        {
        seasonsInfo.length && (
          <div
            style={{ background: `url(${image})` }}
            className="customHeaderBanner"
          >
            <Nav color="light" />
            <div className="TextInfo" ref={this.headerRef}>
              {this.getDivHeight()}
              <div className="TextInfoTitle">
                {title}
              </div>
              <div className="TextInfoHost">
                {host}
              </div>
              <div className="TextInfoDescription" style={{ width: '35%' }}>
                {description}
              </div>
              <div className="TextInfoEpisode">
                <div style={{ display: 'flex', alignItems: 'center' }} className="TextInfoAndSeason">
                  <div className="TextInfoEpisodeTitle">
                  Bölümler
                  </div>
                  <div className="seasonButton">
                    <Dropdown
                      handleSeasonChange={handleSeasonChange}
                      style={seasonBtn}
                      list={seasonsInfo}
                    />
                  </div>
                </div>
                <div className="TextInfoEpisodeBtns">
                  <button value="title" onClick={handleNameClick} type="button" className="TextInfoButton">İsim</button>
                  <button value="date" onClick={handleDateClick} type="button" className="TextInfoButton">Tarih</button>
                  <input onChange={handleTextChange} className="Nav--Search" type="text" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
