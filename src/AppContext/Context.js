import { createContext } from "react";

const AppContext = createContext({
    token: '',
    name: '',
    doneLevels: []
})

export default AppContext;