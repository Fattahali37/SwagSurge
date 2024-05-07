import React from 'react'
import './Footer.css'
import instagram_icon from '../Assets/instagram_icon.png'
import pinterest_icon from '../Assets/pinterest_icon.png'
// import whatsapp_icon from '../Assets/whatsapp_icon.png'
const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <p>SwagSurge</p>
      </div>
      <ul className="footer-links">
        {/* <li>Offices</li> */}
        <li>Blogs</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icons">
        <div className="footer-icons-container">
            <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={pinterest_icon} alt="" />
        </div>
        {/* <div className="footer-icons-container">
            <img src={whatsapp_icon} alt="" />
        </div> */}
      </div>
      <div className="footer-cpyright">
        <hr />
        <p>Copyright @2024 - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
