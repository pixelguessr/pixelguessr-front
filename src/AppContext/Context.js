import { createContext } from "react";

const AppContext = createContext({
    token: '',
    userName: '',
    doneLevels: []
})

export default AppContext;