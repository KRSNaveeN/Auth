import React, { useEffect, useState } from 'react';
const AuthContext = React.createContext({
  token : '',
  isLoggedIn : false,
  login :(token)=>{},
  logout : ()=>{},
  autodelete : ()=>{}
});
export default AuthContext;

export const AuthContextProvider = (props)=>{

    const localtoken = localStorage.getItem("token");

    const [token , setToken] = useState(localtoken);
    const userIsLoggedIn = !!token;

    const autodelete = ()=>{
                localStorage.removeItem("token");
                localStorage.removeItem("timer");
                setToken(null);     
    }

    const loginHandler = (token)=>{
        setToken(token);
        localStorage.setItem("timer", Date.now());
        localStorage.setItem("token", token);
        // setTimeout(()=>{console.log("inside settimeout");localStorage.removeItem("token"); setToken(null)},10000);
        
    };
    const logoutHandler = ()=>{
        setToken(null);
        localStorage.removeItem("token");
    };

    // useEffect(()=>{
        
    // },[])

    const contextValue = {
        token:token,
        isLoggedIn : userIsLoggedIn,
        login : loginHandler,
        logout : logoutHandler,
        autodelete : autodelete
    }
    return<AuthContext.Provider value ={contextValue}>
        {props.children}
    </AuthContext.Provider>
}