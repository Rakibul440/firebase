import React, { useState } from 'react'
import { auth , googleProvider} from '../config/firebase'
import { createUserWithEmailAndPassword , signInWithPopup, signOut} from 'firebase/auth'  //Sign out for log out
//bcz we create authentication with email and password
//Sign in with pop up will show a pop up without go to another page 


export default function Auth() {
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');

    /* Authentication through Email and Password */
    const signIn = async()=>{
        console.log(email);
        console.log(pass);
        try{
            await createUserWithEmailAndPassword(auth,email,pass);  // It'll create an user on firebas
        }catch(err){
            console.error(err)
        }
        
    }
    console.log(auth?.currentUser?.email);

    /* Authentication through Google*/
    const signInWithGoogle = async()=>{
       try{
        await signInWithPopup (auth,googleProvider)
       }catch(err){
        console.error(err);
       }
    }
    /* Sign Out */
    const logout = async()=>{
        try {
            await signOut (auth)
        }catch(err){
            console.error(err)
        }
    }
  return (
    <div className='form'>
      <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Enter email' required/>
      <input type="password" onChange={(e)=>setPass(e.target.value)} placeholder='Password' required />
      <button onClick={signIn}>Sign in</button>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={logout}>Log out</button>
    </div>
  )
}
