import React from 'react'
import './ProgrammeHomePage.scss';

export default (data) => {
  const tempData = data.data;
  console.log({ tempData });
  return (
    <div
      style={{ background: `url(${tempData.bgImage}) no-repeat center`, backgroundSize: 'cover' }}
      className="program-container"
    >
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
                {
                  thumb.image
                    ? (
                      <img
                        alt={`thumbnail${i}`}
                        src={thumb.image}
                        width={280}
                        height={150}
                      />
                    )
                    : (
                      <button
                        type="button"
                        style={{
                          background: `url(${thumb.youtubeURL.imageURL}) 50%`,
                          backgroundSize: 'cover',
                          position: 'relative',
                          width: '280px',
                          height: '150px',
                        }}
                        className="EpisodeVideo"
                      >
                        <div className="playParavan" />
                      </button>
                    )
                }

              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
