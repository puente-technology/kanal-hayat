import React from 'react'

import './ProgrammeHomePage.scss'

export default ({ title, content, bgImage, thumbnailTitle, thumbnails }) => {
  console.log({
    title,
    content,
    bgImage,
    thumbnailTitle,
    thumbnails
  });
  return (
    <div
      style={{ background: `url(${bgImage}) no-repeat center center` }}
      className="program-container">
      <div className="Programme">
        <div className="ProgrammeTitle">
          {title}
        </div>
        <div className="ProgrammeContent">
          {content}
        </div>
        <div className="ProgrammeThumbnailTitle">
          {thumbnailTitle}
        </div>
        <div className="ProgrammeThumbnails">
          {
            thumbnails.map((thumb, i) => (
              <div className="ProgrammeThumbnail">
                <img src={thumb.image} width={280} height={150} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
