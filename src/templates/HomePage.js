import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types';
import Layout from '../components/Layout'
import FullPageSlider from '../components/FullPageSlider';
import HomePageSlider from '../cms/preview-templates/HomePageSlider';
import ProgrammeHomePage from '../components/ProgrammeHomePage';
import FriendSiteBanner from '../components/FriendSiteBanner';

// Export Template for use in CMS preview
export const HomePageTemplate = (data) => {
  let program = data.program1;
  let { program2 } = data;
  console.log(data);
  if (Array.isArray(data.program1)) {
    [program] = data.program1;
  }
  if (Array.isArray(data.program2)) {
    [program2] = data.program2;
  }
  console.log(program2);

  return (
    <div>
      {
        data.frontmatter
          ? <FullPageSlider autoSlide gallery={data.gallery} slideTime={5000} />
          : <HomePageSlider data={data.gallery} />
      }
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
  <Layout>
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
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
        subtitle
        featuredImage
        gallery {
          alt
          image
          title
          align
          color
          programName
          programTime
          programURL
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
          }
        }
      }
    }
  }
`
