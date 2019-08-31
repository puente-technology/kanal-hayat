import React from 'react'
// import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { nFormatter } from '../utils/utils';
// import LayoutComp from '../components/LayoutComp'
// import SeriesList from '../components/SeriesList';

// Export Template for use in CMS preview
// export const AboutUsPageTemplate = data => (
//   <AboutUs {...data} />
// )

// Export Default HomePage for front-end
const SeriesPage = (props) => {
  const { episodes } = props;
  return (
    <div className="SeriesPage">
      {
        episodes.map(episode => (
          <div className="Episode">
            <div
              style={{
                background: `url(${episode.youtubeURL.imageURL})`,
                backgroundSize: 'cover',
                position: 'relative',
              }}
              className="EpisodeVideo"
            >
              <div className="playParavan" />
            </div>
            <div className="minicontainer">
              <span className="subminititle">
                {`${episode.youtubeURL.title.slice(0, 25)}: ${episode.youtubeURL.description.slice(0, 25)}`}
              </span>
              <span className="details">
                <span>
                  KanalHayat
                </span>
                <span style={{ paddingLeft: '15px' }}>
                  {`• ${nFormatter(episode.youtubeURL.viewCount)}`}
                </span>
                {/* {frontmatter.channelTitle} */}
              </span>
            </div>
          </div>
        ))
      }
    </div>
  )
}

SeriesPage.propTypes = {
  episodes: PropTypes.any,
}

export default SeriesPage;

// export const pageQuery = graphql`
// query SeriesList($id: String!, $locale: String) {
//   page: markdownRemark(id: { eq: $id }, frontmatter: { locale: { eq: $locale }}) {
//     html
//   }
// }
// `
