import React from 'react'
import { graphql } from 'gatsby'
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

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => (
  <HomePageLayout>
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </HomePageLayout>
)

HomePage.propTypes = {
  data: PropTypes.any,
}

export default HomePage

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
              id
              imageURL
              title
              url
            }
          }
        }
      }
    }
  }
`
