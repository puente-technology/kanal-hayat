import React, { Fragment } from 'react'
import './HomePageSlider.css'
import Nav from '../../components/Nav';

export const HomePageSlider = (gallery) => {
  return (
    <div>
      {
        gallery.data.map((g, i) => (
          <Fragment>
            <Nav key={i} color={g.color} />
            <div
              className="HomePageSlider"
              style={{
                background: `url(${g.image})`,
                backgroundSize: 'cover',
                height: '450px',
                marginBottom: '50px'
              }}>
              {g.title}
            </div>
          </Fragment>
        ))
      }
    </div>
  )
}

