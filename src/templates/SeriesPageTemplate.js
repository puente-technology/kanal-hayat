
import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import MobileAppLink from '../components/MobileAppLink';
import PageFooterQ from '../components/PageFooter';
import SeriesPage from '../components/SeriesPage';
import Nav from '../components/Nav';
import '../components/SeriesPage.scss'
// Export Template for use in CMS preview
// export const AboutUsPageTemplate = data => (
//   <AboutUs {...data} />
// )

// Export Default HomePage for front-end
const SeriesPageTemplate = ({ data: { page } }) => {
  const {
    title,
    coverImage,
    host,
    description,
  } = page.frontmatter
  return (
    <React.Fragment>
      <Helmet>
        <link href="https://ucarecdn.com" rel="preconnect" crossOrigin />
        <link rel="dns-prefetch" href="https://ucarecdn.com" />
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" />
      </Helmet>
      {/* <Nav color={color} align={align} /> */}
      <div className="MainDiv">
        <CustomHeaderBanner
          image={coverImage}
          title={title}
          host={host}
          description={description}
        />
        <SeriesPage {...page} {...page.frontmatter} />
        <MobileAppLink />
        <PageFooterQ />
      </div>
    </React.Fragment>
  )
}

SeriesPageTemplate.propTypes = {
  data: PropTypes.any,
}

export default SeriesPageTemplate;

export const pageQuery = graphql`
query SeriesPageTemplate($id: String!, $locale: String) {
  page: markdownRemark(id: { eq: $id }, frontmatter: { locale: { eq: $locale }}) {
    html
    frontmatter {
      title
      coverImage
      description
      host
      episodes {
        host
        language
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
    handleSortByClick,
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
            <button value="title" onClick={handleSortByClick} type="button" className="TextInfoButton">İsim</button>
            <button value="date" type="button" className="TextInfoButton">Tarih</button>
            <input onChange={handleTextChange} className="Nav--Search filter" type="text" />
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
  handleSortByClick: PropTypes.any,
  handleTextChange: PropTypes.any,
}
