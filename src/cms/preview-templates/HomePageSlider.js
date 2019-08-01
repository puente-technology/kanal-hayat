import React, { Fragment } from 'react'
import './HomePageSlider.css'
import Nav from '../../components/Nav';

export const HomePageSlider = (gallery) => {
  return (
    <div>
      {
        gallery.data.map((g, i) => (
            <div
              className="HomePageSlider"
              style={{
                background: `url(${g.image})`,
                backgroundSize: 'cover',
                height: '450px',
                marginBottom: '50px'
              }}>
              <Nav key={i} color={g.color} />
              {g.title}
            </div>
        ))
      }
    </div>
  )
}

