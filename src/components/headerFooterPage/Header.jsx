//! SiteTitle
// Branding, logo, identity, etc
// ? Our own design?
// Images stored in assets/images and exported with assets/imageMap.js

//!Nav Bar
// includes log in/out

//style is in App.css

import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <div>
        <div id="header">
            <h1 id="smallCap">The Pantry Door</h1>
            <h2 id="italic">"No locks. No judgement. Just help."</h2>
          </div>
        <div id="nav">
             <ul className="nav-ul">
                   <li><Link to="/" className="nav-link">Find a Pantry</Link></li>
                   <li><Link to="/getinvolved" className="nav-link">Get Involved</Link></li>
                   <li><Link to="/about" className="nav-link">About</Link></li>
                   <li><Link to="/resources"className="nav-link">Resources</Link></li>
            </ul>
         </div>
         </div>
  )
}

export default Header