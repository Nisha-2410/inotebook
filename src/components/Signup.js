import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setcredentials] = useState({name:"",email:"" , password:""});
  const navigate = useNavigate();
  const {name,email,password} = credentials;
  const handleSubmit=async(e)=>{
    
      e.preventDefault();
      const response = await fetch("https://your-backend.vercel.app/api/auth/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify({name,email,password})
         
        });

        const json = await response.json();
        console.log(json);
        if(json.success){
          //redirect
          localStorage.setItem('token',json.authtoken)
          navigate("/")
          props.showAlert("account created successfully","success")
        }
        else{
          props.showAlert("invalid credentials","danger")
        }
  }
  const onChange=(e)=>{
      setcredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <>
      <div className="container my-3">
        <h2>Please Signup to use iNotebook</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="nameHelp"
              onChange={onChange}
              name="name"
              
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              onChange={onChange}
              name="email"
            
            />

          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={onChange}
              name="password"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              onChange={onChange}
              name="cpassword"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
