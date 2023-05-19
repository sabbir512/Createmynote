import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [credentials, setCredentials] =useState({name:"", email:"", password:"", cpassword:""});
  let navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
       method: "POST",
 
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({name, email, password})
     });
     const json = await response.json();
     console.log(json);

     if(json.success === true){
      //Redirected to page and also save the token in logal stroages
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Successfully signup compeleted", "success")
    }
    else{
      //Alert for User;
        props.showAlert("invalid details", "danger")
    }
     
   }

   const onChange = (e) => {
       setCredentials({ ...credentials, [e.target.name]: e.target.value })
     }

  return (
    <div className="container mt-2">
      <h3 className='my-2'>Create a account to use MyNoteBook</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 ">
          <label htmlFor="name" className="form-label">Enter Your Name</label>
          <input type="text" className="form-control" onChange={onChange} id="name" name='name' aria-describedby="emailHelp" />
        </div> 
        
        <div className="mb-3">
          <label htmlFor="eamil" className="form-label">Enter Your Email</label>
          <input type="email" className="form-control" onChange={onChange} id="eamil" name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' onChange={onChange} minLength={5} required id="password" />
        </div> 
        
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='cpassword' onChange={onChange} minLength={5} required id="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
