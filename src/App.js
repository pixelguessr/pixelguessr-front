import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import AppProvider from "./AppContext/Provider";
import './index.css'

function App() {
  return (
    <>
    <BrowserRouter>
    <GlobalStyle/>
    <AppProvider>
    <Routes>
      <Route path='/' element={<Login/>}/>
    </Routes>
    </AppProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
