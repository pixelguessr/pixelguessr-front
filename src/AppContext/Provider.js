import AppContext from "./Context";
import React from "react";
import { useState } from "react";
export default function AppProvider({children}){
    const [token, setToken] = useState('')
    const [userName, setUserName] = useState('')
    const [doneLevels, setDoneLevels] = useState([])
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    
    return (
        <AppContext.Provider value={{config, setToken, token, userName, setUserName, doneLevels, setDoneLevels}}>
            {children}
        </AppContext.Provider>
    )
}