import React, { createContext } from 'react';
import { useState, useEffect, createContext } from 'react';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    
    const [compartido, setCompartido] = useState("compartido en todos los componentes")
    
    return (

        <AuthContext.Provider value={{compartido}}>
            {children}
        </AuthContext.Provider>
    
    )
}
