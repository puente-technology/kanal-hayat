/* eslint-disable consistent-return */
/* eslint-disable implicit-arrow-linebreak */
const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
// const { fmImagesToRelative } = require('gatsby-remark-relative-images')

const locales = require('./src/constants/locales')

/* eslint-disable func-names */
// eslint-disable-next-line no-extend-native
String.prototype.turkishtoEnglish = function () {
  return this.replace('Ğ', 'g')
    .replace('Ü', 'u')
    .replace('Ş', 's')
    .replace('I', 'i')
    .replace('İ', 'i')
    .replace('Ö', 'o')
    .replace('Ç', 'c')
    .replace('ğ', 'g')
    .replace('ü', 'u')
    .replace('ş', 's')
    .replace('ı', 'i')
    .replace('ö', 'o')
    .replace('ç', 'c');
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            frontmatter {
              template
              title
              locale
            }
            fields {
              slug
              contentType
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const mdFiles = result.data.allMarkdownRemark.edges

    const contentTypes = _.groupBy(mdFiles, 'node.fields.contentType')

    _.each(contentTypes, (pages, contentType) => {
      const pagesToCreate = pages.filter(page =>
        // get pages with template field
        _.get(page, 'node.frontmatter.template'))
      if (!pagesToCreate.length) return console.log(`Skipping ${contentType}`)

      console.log(`Creating ${pagesToCreate.length} ${contentType}`)

      pagesToCreate.forEach((page) => {
        const { id } = page.node
        const { locale } = page.node.frontmatter;
        const slug = page.node.fields.slug.toLowerCase().turkishtoEnglish()
        console.log({ xxxxxxxxx: slug });
        createPage({
          // page slug set in md frontmatter
          path: page.node.fields.slug,
          component: path.resolve(
            `src/templates/${String(page.node.frontmatter.template)}.js`,
          ),
          // additional data can be passed via context
          context: {
            id,
            locale,
            slug,
          },
        })
      })
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  return new Promise((resolve) => {
    deletePage(page)

    Object.keys(locales).map((lang) => {
      const localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path
      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang,
        },
      })
    })
    resolve()
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // convert frontmatter images
  // fmImagesToRelative(node)

  let slug
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (_.get(node, 'frontmatter.slug')) {
      slug = `/${node.frontmatter.slug.toLowerCase().turkishtoEnglish()}/`
    } else if (
      // home page gets root slug
      parsedFilePath.name === 'home'
      && parsedFilePath.dir === 'pages'
    ) {
      slug = '/'
    } else if (_.get(node, 'frontmatter.title')) {
      slug = `/${_.kebabCase(parsedFilePath.dir)}/${_.kebabCase(
        node.frontmatter.title.turkishtoEnglish(),
      )}/`
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }
    const value = createFilePath({ node, getNode })
    console.log({ slug });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
    // Add contentType to node.fields
    createNodeField({
      node,
      name: 'contentType',
      value,
    })
  }
}

// Random fix for https://github.com/gatsbyjs/gatsby/issues/5700
module.exports.resolvableExtensions = () => ['.json']
