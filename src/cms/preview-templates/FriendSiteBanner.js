import React from 'react'
import './FriendSiteBanner.css'

export const FriendSiteBanner = (data) => {
  console.log(data);
  if (data.imageObj.length) {
    return (
      <div className="friendSiteBannerContainer">
        <div className="background">
          <img className="imageStyle" alt={data.imageObj[0].alt || ''} src={data.imageObj[0].image || ''} />
        </div>
        <div className="logoDiv">
          <img className="logoStyle" alt={data.logo[0].alt || ''} src={data.logo[0].image || ''} />
          <p className="header">
            {data.header || ''}
          </p>
          <p className="content">
            {data.content || ''}
          </p>
          <button className="button">
            {data.buttonText || ''}
          </button>
        </div>
      </div>
    )
  }
}

