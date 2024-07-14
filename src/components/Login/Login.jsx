import React, {useState} from 'react';
import './Login.scss';
import { Link, useNavigate} from 'react-router-dom';
import {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from '../../firebase';
import expenseAppLogo  from '../../assets/expenseAppLogo.png'; 
function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

   function signIn(e) {

        e.preventDefault();
        signInWithEmailAndPassword(auth,email,password)
        .then((auth) => {
            if(auth) {
                const notification = document.querySelector('.login__notification');
                const notificationText = document.querySelector('.login__notification__text');
                notificationText.innerText = "Successfully loged in"
                notification.style.top='0px';
                setTimeout(() => {
                    navigate('/');
                },3000);
    
            }
        })
        .catch((error) => alert(error.message));
   }
    
   function registerUser(e){
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((auth) => {

        if(auth) {

            const notification = document.querySelector('.login__notification');
            const notificationText = document.querySelector('.login__notification__text');
            notificationText.innerText = "Successfully registered.";
            notification.style.top='0px';
            setTimeout(() => {
                navigate('/');
            },3000);

        }
    })
    .catch((error) => alert(error.message));
   }
  
   function handleNotification(){
    const notification = document.querySelector('.login__notification');
    notification.style.display="none";

   }

  return (
    <div className='login'>
        <p className='login__notification'><span className='login__notification__text'></span> <span className="close" onClick={handleNotification}>X</span></p>
        <Link to='/'>
            <img src={expenseAppLogo} 
            alt="Expense logo" 
            className='login__logo'
            />
        </Link>
        <div className="login__wrapper">
            <h1 className='login__title'>Sign-in</h1>
            <form method='POST' className='login__form'>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' id='email' value={email} onChange={(e)=>{setEmail(e.target.value);}}/>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' id='password' value={password} onChange={(e)=>{setPassword(e.target.value);}}/>
                <button type="submit" className='login__signin' onClick={signIn} >Sign In</button>
            </form>
            <p className='login__notice'>By signing-in you agree to the Expense App Conditions of Use. Please
            see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>
            <button className='login__register' onClick={registerUser}>Create your Expense app Account</button>
        </div>
        
    </div>
  )
}

export default Login