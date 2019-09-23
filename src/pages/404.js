import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

const pageBackground = require('../../static/images/404.jpg')

const backgroundStyle = {
  background: {
    backgroundImage: `url(${pageBackground})`,
    backgroundSize: 'cover',
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
  },
  title: {
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '33px',
    color: '#3D3D3D',
  },
  line: {
    border: '1px solid #3D3D3D',
    width: '254px',
    height: '0px',
  },
  messagge: {
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '48px',
    lineHeight: '65px',
    color: '#3D3D3D',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    alignItems: 'start',
    marginLeft: '20%',
    marginTop: '15%',
  },
  button: {
    background: 'linear-gradient(89.64deg, #E0E1E2 0.26%, #E0E1E2 77.49%, rgba(224, 225, 226, 0) 99.77%)',
    width: '250px',
    height: '50px',
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '33px',
    color: '#3D3D3D',
    border: '1px solid #3D3D3D',
    boxSizing: 'border-box',
  },
  divBtn: {
    marginTop: '10%',
  },
}

const handleClick = () => {
  window.location = '/'
}

export default () => (
  <Fragment>
    <Helmet>
      <title>404 – Page Not Found</title>
    </Helmet>
    <div style={backgroundStyle.background}>
      <div style={backgroundStyle.container}>
        <div style={backgroundStyle.title}>
          Hay aksi!
        </div>
        <div>
          <hr style={backgroundStyle.line} />
        </div>
        <div style={backgroundStyle.messagge}>
          Sayfa bulunamıyor.
        </div>
        <div style={backgroundStyle.divBtn}>
          <button onClick={handleClick} style={backgroundStyle.button} type="button">
            Anasayfaya Git
          </button>
        </div>
      </div>
    </div>
  </Fragment>
)
