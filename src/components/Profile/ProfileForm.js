import { useContext,useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/AuthContext';



const ProfileForm = () => {
  const ctx = useContext(AuthContext);
const passwordref = useRef();

const submitHandler = (e)=>{
  e.preventDefault();
  fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA9LuFmZhMIPUovdM8bJy2Yie2vBx5_3d0",{
    method: "POST",
    body: JSON.stringify({
      idToken : ctx.token,
       password : passwordref.current.value,

      returnSecureToken : true
   }),
    headers:{
      "Content-Type": 'application/json'
    }
  }).then((res)=>console.log(res.json()))
}

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={passwordref} type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
