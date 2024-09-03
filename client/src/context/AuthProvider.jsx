import React from 'react';
import { useState, useEffect, createContext } from 'react';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    
    const [auth, setAuth] = useState({});

    const authUser = async() => {

        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if(!token || !user){
            return false;
        }
    }

    useEffect(() => {
        authUser()
    }, []);


    
    return (

        <AuthContext.Provider value={{compartido}}>
            {children}
        </AuthContext.Provider>
    
    )
}

export default AuthContext;
