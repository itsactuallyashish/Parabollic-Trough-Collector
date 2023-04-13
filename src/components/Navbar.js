import React from 'react'
import image from '../images.png'
export default function Navbar() {
  return (
    <nav className="mb-3 navbar  navbar-light  " style={{backgroundColor:'#FAF9F6'}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img src={image} alt="Logo" width="70" height="40" className="d-inline-block align-text-top"/>
      <span className="navbar-brand mb-0 h1 text-muted">Parabollic Trough Collector</span>
    </a>
  </div>
</nav>
  )
}
