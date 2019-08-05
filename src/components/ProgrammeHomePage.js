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
      style={{ background: `url(${tempData.bgImage}) no-repeat center` }}
      className="program-container">
      <div className={`Programme ${tempData.color} ${tempData.align}`}>
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
