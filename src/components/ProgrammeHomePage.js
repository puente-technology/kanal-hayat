import React from 'react'

import './ProgrammeHomePage.scss'

export default (data) => {
  console.log(
    's',
    {
      data
    });
  return (
    <div
      style={{ background: `url(${data.bgImage}) no-repeat center center` }}
      className="program-container">
      <div className="Programme">
        <div className="ProgrammeTitle">
          {data.title}
        </div>
        <div className="ProgrammeContent">
          {data.content}
        </div>
        <div className="ProgrammeThumbnailTitle">
          {data.thumbnailTitle}
        </div>
        <div className="ProgrammeThumbnails">
          {
            data.thumbnails.map((thumb, i) => (
              <div key={i} className="ProgrammeThumbnail">
                <img src={thumb.image} width={280} height={150} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
