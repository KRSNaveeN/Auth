import { useState, useRef,useContext } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/AuthContext';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setIsLoading] = useState(false);
  const ctx = useContext(AuthContext);
const emailref = useRef();
const passwordref = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    
  };

  

  function submitHandler(e){
    e.preventDefault();
    setIsLoading(true);
   let enteredemail = emailref.current.value;
  let  enteredpassword = passwordref.current.value;


    // if required u can add your validation for password and email
    let url ="";
    if(!isLogin)
    {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9LuFmZhMIPUovdM8bJy2Yie2vBx5_3d0"
    }
    else{
      url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9LuFmZhMIPUovdM8bJy2Yie2vBx5_3d0"
    }
    
      fetch(url, {
        method : 'POST',
        body : JSON.stringify( {
          email: enteredemail,
          password : enteredpassword,
          returnSecureToken: true
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }).then((res)=> 
          
      {
        setIsLoading(false);
        if(res.ok){
          // res.json().then((data)=>{
          //   console.log(data);
          return res.json()
          // }
          // )
          
        //  
        }
        else{
          // let ans  = "authentication failed"
          // res.json().then((data)=>{
          //  ans = data.error.message;
          // alert(ans);
          let errormsg= "Authentication failed"
          
          throw new Error(errormsg);
          
         
        }}).then((data)=>{
          // localStorage.setItem(data.LocalId, data.idToken)
          ctx.login(data.idToken);
          console.log(data)}).catch((err)=>{alert(err);console.log(err)})
        
        emailref.current.value = "";
        passwordref.current.value = "";
    
  }



  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailref} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
          ref={passwordref}
            type='password'
            id='password'
            required
          />
        </div>
        <div className={classes.actions}>
         {/* {isLogin && <button onClick={clickHandler}>Login</button>}  */}
         { !loading ?  <button>{isLogin ? "Login" : "Create Account"}</button> : "Sending request"}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
