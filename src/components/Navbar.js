import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { auth } from "./config/firebase";

import './Navbar.css'
import { signOut } from "firebase/auth";

const Navbar = (props) => {
  
    // const { isActive } = useParams(); // get isActive variable from URL
    // const isActiveBool = isActive === 'true'; // convert string to boolean  
  
    // console.log("asasdx",isActiveBool)


    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const navigate = useNavigate()

    const logout = () => {
      signOut(auth).then(()=>{
        setIsLoggedIn(false)
        alert("Logged out Successfully")
        navigate("/")
      }).catch((e) => {
        console.error(e);
      })
    }
    
    useEffect(()=>{
      if (auth.currentUser){
        setIsLoggedIn(true)
      }
      
      else{
        setIsLoggedIn(false)
      }
    },[auth.currentUser])

    return (
    <nav className="navbar">
        <h1>SRET Blogs</h1>
        <div className="nav-items">
            <p><Link style={{textDecoration:'none'}} to='/'>Home</Link></p>
            { isLoggedIn && <p><Link style={{textDecoration:'none'}} to='/create'>New Blog</Link></p>}
            { isLoggedIn ?
             <p style={{backgroundColor: '#f1356d',color:' white',borderRadius:10}} onClick={logout}>Logout</p> :
             <p style={{backgroundColor: '#f1356d',color:' white',borderRadius:10}}><Link style={{textDecoration:'none',color:'white'}} to="/Auth">Login</Link></p> }
        </div>
    </nav>
  )
}

export default Navbar