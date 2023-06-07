import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import AppProvider from "./AppContext/Provider";
import './index.css'
import Login from "./pages/Login";
import Cadastro from "./pages/Signup";

function App() {
  return (
    <>
    <BrowserRouter>
    <GlobalStyle/>
    <AppProvider>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Cadastro/>}/>
    </Routes>
    </AppProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
