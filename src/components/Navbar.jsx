import React from 'react'
import { Link } from 'react-router-dom';
export default function Navbar(){
    return(
        <>
        <div className='navbar'>
        <ul>
            <div>
              <li>
              <Link to="/">Home</Link>
            </li>
            </div>
          
            <div>
              <li>
              <Link to="/signup">Sign up</Link>
            </li>
            </div>
          
          <div>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </div>
         
          
      </ul>


            
        </div>
        </>
    )
}