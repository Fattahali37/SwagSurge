import React, { useState } from 'react'
import './LoginSignUp.css'

const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }


  const login = async()=>{
    console.log("Login Function executed",formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/")
    }else{
      alert("no user found");
    }

  }

  const signup = async()=>{
    console.log("signup Function executed",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    // const response = await axios.fetch('http:localhost:4000/signup',formData);
    // if(response.success){
    //   localStorage.setItem('auth-token',responseData.token);
    //   window.location.replace("/")
    // }
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/")
    }else{
      alert("email already exist");
    }
  }


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' required/>:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' required />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' required />
          </div>
          <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
          {state==="Sign Up"?<p className="loginsignup-login">Already Have an account?<span onClick={()=>{setState("Login")}}>login here</span></p>:<p className="loginsignup-login">Create an account?<span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
          <div className="loginsignup-agree">
            <input type="checkbox" name=' ' id='' required/>
           <p>By continuing I agree to the terms of use and policy </p> 
          </div>
      </div>
      
    </div>
  )
}

export default LoginSignup
