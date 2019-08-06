import React from 'react'
import './HeaderBanner.css'
import Nav from '../../components/Nav';

const HeaderBanner = (data) => {
  return (
    <div>
       {
        data.list.map((items, index) => (
          <div className="headerBanner">
            <Nav color='light' />
            <div style={{ position: 'relative' }}>      
              <img key={index} className="imageBackground" src={items.image} alt={items.title}/>
              <div className="headerText">
                <p style={{paddingTop: '40px'}}>
                  {items.title}
                </p>
              </div>
            </div>
          </div>
        ))
       }
    </div>
  )
}

export default HeaderBanner
