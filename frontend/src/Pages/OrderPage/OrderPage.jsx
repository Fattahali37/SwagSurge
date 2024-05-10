import React, { useContext, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import './OrderPage.css'

const OrderPage = () => {
    const{getTotalCartAmount, all_product, cartItems, getTotalCartItems} = useContext(ShopContext)
    const [data,setData]= useState({
        firstname:"",
        lastname:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    })

    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const placeorder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        all_product.map((item) => {
            if (cartItems[item._id] > 0) {
                let iteminfo = item;
                iteminfo["quantity"] = cartItems[item._id];
                orderItems.push(iteminfo);
            }
        })
        let orderData ={
            address:data,
            items:orderItems,
            amaount:getTotalCartAmount(),
        }
        const response = await fetch('http://localhost:4000/place', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify(orderData)
        });
        if (!response.ok) {
            throw new Error('Failed to place order');
        }

        const responseData = await response.json();

        if (responseData.success) {
            const { session_url } = responseData;
            window.location.replace(session_url);
        } else {
            alert('Error');
        }
    } 
    
    
  
  return (
    <form onSubmit={placeorder} className='order-page'>
        <div className="order-page-left">
            <p className='title'>Delivery Information</p>
            <div className="multifield">
                <input required name='firstname' onChange={onChangeHandler} value={data.firstname} type="text" placeholder='First name' />
                <input required name='lastname' onChange={onChangeHandler} value={data.lastname}type="text" placeholder='Last name' />
            </div>
            <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
            <input required name='street' onChange={onChangeHandler} value={data.street}type="text" placeholder='Street'/>
            <div className="multifield">
                <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
            </div>
            <div className="multifield">
                <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
                <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
            </div>
            <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'/>
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
            <button type='submit'>Proceed to  payment</button>
        </div>
        </div>
    </form>
  )
}


export default OrderPage