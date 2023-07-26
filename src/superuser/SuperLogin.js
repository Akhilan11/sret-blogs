import React, { useEffect, useState } from 'react'
import '../components/Create.css'
import { useNavigate } from 'react-router-dom'
import { auth } from '../components/config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const SuperLogin = () => {
  
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
  
    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user.email;
            if(user === "abcd@gmail.com"){
                navigate("/superHome")
            }
            else{
                auth.signOut()
                navigate("/super")
                alert("You are not allowed");
            }
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            alert(errorMessage)
        });
      
    }


    
  
    return (
    <div>
        <div className='create'>
        <h2>Login Account</h2>
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
            <button onClick={login}>Login</button> <br/><br/><br/>
        </form> 
    </div>
    </div>
  )
}

export default SuperLogin