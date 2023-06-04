import AppContext from "./Context";
import React from "react";
import { useState } from "react";
export default function AppProvider({children}){
    const [tok, setTok] = useState('')
    const [name, setName] = useState('')
    const [doneLevels, setDoneLevels] = useState([])
    const config = {
        headers: {
            "Authorization": `Bearer ${tok}`
        }
    }

    
    return (
        <AppContext.Provider value={{config, setTok, tok, name, setName, doneLevels, setDoneLevels}}>
            {children}
        </AppContext.Provider>
    )
}