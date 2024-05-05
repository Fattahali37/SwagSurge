import React, { useState } from 'react'
import './CSS/LoginSignUp.css'

const LoginSignup = () => {

  const [state,setState] = useState("Login");

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Your Name'/>
          <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='Password' />
          </div>
          <button>Continue</button>
          <p className="loginsignup-login">Already Have an account?<span>login here</span>
          </p>
          <div className="loginsignup-agree">
            <input type="checkbox" name=' ' id='' />
           <p>By continuing I agree to the terms of use and policy </p> 
          </div>
      </div>
      
    </div>
  )
}

export default LoginSignup
