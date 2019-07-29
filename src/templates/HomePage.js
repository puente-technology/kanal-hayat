import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout';
import FullPageSlider from '../components/FullPageSlider';
import { HomePageSlider } from '../cms/preview-templates/HomePageSlider';

// import PageHeader from '../components/PageHeader'
// import Content from '../components/Content'
// import Layout from '../components/Layout'

// Export Template for use in CMS preview
export const HomePageTemplate = (data) => {
  console.log({ data });
  const meta = data.frontmatter ? data.frontmatter.meta : false;
    return (
      <div>
        <Layout meta={meta}>
            <FullPageSlider gallery={data.gallery} />
        </Layout>
      </div>
    )
}

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => {
  return (
      <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
  )
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
        }
      }
    }
  }
`
