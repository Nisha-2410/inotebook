import React from 'react'
import { useNavigate, useLocation } from 'react-router'
import { Link } from "react-router-dom";

export const Navbar = () => {
  let location = useLocation();
  let navigate =useNavigate();
  const handlelogout=()=>{
      localStorage.removeItem("token")
      navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/Home" ? "active" : ""}`} to="/Home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} to="/About">About</Link>
            </li>
          </ul>
    { !localStorage.getItem("token")? <form className="d-flex" role="search">
          <Link className="btn btn-primary mx-1" to="/login" role="button ">Login</Link>
          <Link className="btn btn-primary mx-1" to="/Signup" role="button ">Signup</Link>
          </form>:<button onClick={handlelogout} className='btn btn-primary'> logout</button>}
        </div>
      </div>
    </nav>
  );
}
