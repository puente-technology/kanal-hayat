import React from 'react'
import './HomePageSlider.css'
import Nav from '../../components/Nav';

const HomePageSlider = gallery => (
  <div>
    {
        gallery.data.map((g, i) => (
          <div
            key={i}
            className="HomePageSlider"
            style={{
              background: `url(${g.image})`,
              backgroundSize: 'cover',
              height: '450px',
              marginBottom: '50px',
              position: 'relative',
            }}
          >
            <Nav color={g.color} />
            {g.title}
          </div>
        ))
      }
  </div>
)

export default HomePageSlider;
