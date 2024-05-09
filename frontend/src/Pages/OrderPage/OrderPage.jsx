import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import './OrderPage.css'
const OrderPage = () => {
    const{getTotalCartAmount} = useContext(ShopContext)
  return (
    <form className='order-page'>
        <div className="order-page-left">
            <p className='title'>Delivery Information</p>
            <div className="multifield">
                <input type="text" placeholder='First name' />
                <input type="text" placeholder='Last name' />
            </div>
            <input type="email" placeholder='Email address'/>
            <input type="text" placeholder='Street'/>
            <div className="multifield">
                <input type="text" placeholder='City' />
                <input type="text" placeholder='State' />
            </div>
            <div className="multifield">
                <input type="text" placeholder='Zip code' />
                <input type="text" placeholder='Country' />
            </div>
            <input type="text" placeholder='Phone'/>
        </div>
        <div className="order-page-right">
        <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>
                </div>
            </div> 
            <button>Proceed to  payment</button>
        </div>
        </div>
    </form>
  )
}

export default OrderPage