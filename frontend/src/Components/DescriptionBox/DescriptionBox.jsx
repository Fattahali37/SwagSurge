import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
            Swagsurge is an online platform of buying and selling hoodies,swearshirt and t-shirts of men,women and childern
        </p>
        <p>
            swagsurge typically display products and their prices description sizes etc
        </p>
      </div>

    </div>
  )
}

export default DescriptionBox
