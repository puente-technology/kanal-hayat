import React from 'react'
import Marked from 'react-markdown'
import PropTypes from 'prop-types'

import './Content.css'

const encodeMarkdownURIs = (source = '') => {
  const markdownLinkRegex = /\[(.+)\]\((.+)(".+)\)/g
  console.log(source)
  return source.replace(markdownLinkRegex, (match, linkURI) => {
    if (!linkURI) return match
    const replaced = match.replace(linkURI, encodeURI(linkURI))
    return replaced
  })
}

// eslint-disable-next-line react/prop-types
const HtmlBlock = ({ value }) => {
  // eslint-disable-next-line react/prop-types
  if (value.indexOf('<iframe') !== 0) return value
  return (
    <div
      className="Content--Iframe"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: value,
      }}
    />
  )
}

const Content = ({ source, src, className = '' }) => {
  // accepts either html or markdown
  const tempSource = source || src || ''
  if (tempSource.match(/^</)) {
    return (
      <div
        className={`Content ${className}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: tempSource }}
      />
    )
  }

  return (
    <Marked
      className={`Content ${className}`}
      source={encodeMarkdownURIs(tempSource)}
      renderers={{
        html: HtmlBlock,
      }}
    />
  )
}

Content.propTypes = {
  source: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string,
}

export default Content
