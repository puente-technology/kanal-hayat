module.exports = {
  siteMetadata: {
      title: 'Full-Stack Bootcamp',
      author: 'Andrew Mead'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/images`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'pages'
      }
    },
      'gatsby-transformer-remark',
      {
          resolve: 'gatsby-plugin-netlify-cms',
          options: {
            modulePath: `${__dirname}/src/cms/cms.js`,
            stylesPath: `${__dirname}/src/cms/admin.css`,
            enableIdentityWidget: true
          }
      },
  ]
}