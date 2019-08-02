import React from 'react'

import './ProgrammeHomePage.scss'

export default (data) => {
  console.log(
    's',
    {
      data
    });
    const tempData = data.data;
  return (
    <div
      style={{ background: `url(${data.bgImage}) no-repeat center center` }}
      className="program-container">
      <div className="Programme">
        <div className="ProgrammeTitle">
          {tempData.title}
        </div>
        <div className="ProgrammeContent">
          {tempData.content}
        </div>
        <div className="ProgrammeThumbnailTitle">
          {tempData.thumbnailTitle}
        </div>
        <div className="ProgrammeThumbnails">
          {
            tempData.thumbnails.map((thumb, i) => (
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
