import Signup from './Signup'
import Login from './Login'

import './Auth.css'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react' 
import Navbar from '../Navbar'

const Authentication = () => {

  // const { isActive } = useParams(); // get isActive variable from URL
  // const isActiveBool = isActive === 'true'; // convert string to boolean  
  // console.log("asasdx",isActiveBool)
  const [signIn,setSignin] = useState(true)

  const signup = () => {
    setSignin(false)
    console.log(signIn)
  }
  
  const login = () => {
    setSignin(true)
    console.log(signIn)
  }  

  return (
    <div className='Auth'>
      {/* <h1>Sret Blogs!</h1> */}
      <Navbar val={false}/>
        <div className="content">
          { signIn ? <Login/> : <Signup/> }
          {/* <Login/>
          <Signup /> */}
        </div>
        <center>
        <div className="add">
        { signIn ? <div className="signup"><p>Dont have an account?? <span onClick={signup} style={{color:'blue'}}> Signup</span></p></div> :
        <div className="signup"><p>Already have an account?? <span onClick={login} style={{color:'blue'}}> Login</span></p></div>}
        </div>
        </center>
        

    </div>
  )
}

export default Authentication