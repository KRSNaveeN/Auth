import React, { useEffect, useState } from 'react';
const AuthContext = React.createContext({
  token : '',
  isLoggedIn : false,
  login :(token)=>{},
  logout : ()=>{}
});
export default AuthContext;

export const AuthContextProvider = (props)=>{

    const localtoken = localStorage.getItem("token");

    const [token , setToken] = useState(localtoken);
    const userIsLoggedIn = !!token;

    const loginHandler = (token)=>{
        setToken(token);
        localStorage.setItem("token", token);
        
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
        logout : logoutHandler
    }
    return<AuthContext.Provider value ={contextValue}>
        {props.children}
    </AuthContext.Provider>
}