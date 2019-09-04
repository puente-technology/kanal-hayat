import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

// Export Template for use in CMS preview
// export const AboutUsPageTemplate = data => (
//   <AboutUs {...data} />
// )

// Export Default HomePage for front-end
const HostPage = ({ data: { page } }) => {
  console.log({ adfsfsfsdf: page });
  return (
    <div>
      HEY
    </div>
  )
}

HostPage.propTypes = {
  data: PropTypes.any,
}

export default HostPage;

export const pageQuery = graphql`
query Host($slug: String!) {
  allMarkdownRemark(filter: { fields: { slug: { regex: $slug } }}) {
    nodes {
      frontmatter {
        host
        coverImage
        html
        episodes {
          youtubeURL {
            imageURL
            title
          }
          guests
        }
      }
    }
  }
}
`
