import React from 'react'
import { graphql } from 'gatsby'
// import PropTypes from 'prop-types'

// Export Template for use in CMS preview
// export const AboutUsPageTemplate = data => (
//   <AboutUs {...data} />
// )

// Export Default HomePage for front-end
const Host = (data) => {
  console.log({ adfsfsfsdf: data });
  return (
    <div>
      HEY
    </div>
  )
}

// Host.propTypes = {
//   allMarkdownRemark: PropTypes.any,
// }

export default Host;

export const pageQuery = graphql`
query Host($slug: String!) {
  allMarkdownRemark(filter: { fields: { slug: { eq: $slug } }}) {
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
