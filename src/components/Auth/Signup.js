import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth,googleProvider } from '../config/firebase'

import './Auth.css'
import {FcGoogle} from 'react-icons/fc'
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from 'firebase/auth'

const Signup = () => {
  
  const navigate = useNavigate()

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  
  const signup = async() => {
    try{
      await createUserWithEmailAndPassword(auth,email,password)
      // .then((userCredential) => {
      //   // User signed up successfully, send email verification
      //   console.log(userCredential)
      //   userCredential.user.sendEmailVerification();
      //   alert('Sign-up successful, verification email sent!');
      // })
      // .catch(error => {
      //   alert('Error signing up:', error);
      //   console.error(error)
      // });
      alert(`Verification sent to your account!!`)
      navigate('/Auth')
    } catch(e){
      console.error(e);
    }
  }

  const googleSignIn = async () => {
    try{
      await signInWithPopup(auth,googleProvider)
      alert(`Successfully Signed in with Google Account`)
      navigate('/')
    } catch(e){
      console.error(e);
    }
  }

  return (
    <div className='create'>
      <h2>SignUp Account</h2>
      <form>
        <label>Email :</label>
        <input 
          type="text" 
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password :</label>
        <input 
          type='password' 
          placeholder='Password'
          onChange={(e)=> setPassword(e.target.value)}
          required
        /> <br />
        <button onClick={signup}>Signup</button> <br/><br/><br/>
        -------- OR -------- <br /><br />
        <div className="signin">
          <a onClick={googleSignIn}>
          <FcGoogle style={{fontSize:'2rem',float:'left',display:'flex'}}/>
          <p style={{float:'right'}}>Signin with google</p>
          </a>
        </div>
      </form> 

      <div className="login"><p>Already have an account??</p> <Link to={'/Auth'} state={{val:true}}> Login</Link></div>

    </div>
  )
}

export default Signup