import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logoPhoto from '../../assets/Images/logo.gif'

function Footer() {
  return (
        <div id="footer">
            <div id="footer1">
                         <p className="pLove">
                         Made with ❤️ by the Canned Do Crew<br/>
This project was built with care to support the people of Atlanta, GA and a community near you.
Our mission is to make it easier for neighbors to find, share, and support local food resources.</p>
            </div>
            <div id="footer2">
                           <ol className="footer-ol">
                   <li><Link to="/" className="footer-link">Find a Pantry</Link></li>
                   <li><Link to="/getinvolved" className="footer-link">Get Involved</Link></li>
                   <li><Link to="/about" className="footer-link">About Us</Link></li>
                   <li><Link to="/resources" className="footer-link">Resources</Link></li>
                   <li><Link to="/getinvolved" className="footer-link">Login</Link></li>
            </ol>
            </div>
            <div id="footer3">
                         <ol className="footer-sponsor-ol">
                  <li><a href="/getinvolved"  className="footer-link">Reach out for help</a></li>
                   <li><a href="/getinvolveds" className="footer-link">Volunteer with us</a></li>
                   <li><a href="/getinvolved" className="footer-link">Add or update a pantry</a></li>
                   <li><a href="/resources" className="footer-link">Other helpful links</a></li>
                   <li><a href="mailto:canneddocrew@gmail.com"  className="footer-link">Email us directly </a></li>
            </ol>
            </div>
            <div id="footer4">
              <img src={logoPhoto} id="logoPhoto"/>
              
            </div>
         </div>
  )
}

export default Footer