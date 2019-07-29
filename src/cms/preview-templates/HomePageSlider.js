import React from 'react'
import './HomePageSlider.css'
import Layout from '../../components/Layout';

export const HomePageSlider = (gallery) => {
  return (
    <div>
      {
        gallery.data.map((g, i) => (
          <Layout key={i}>
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
          </Layout>
        ))
      }
    </div>
  )
}

