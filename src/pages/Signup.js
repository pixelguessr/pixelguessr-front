import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../AppContext/Context";
import logo from "../assets/logo_with_name.png"
export default function Cadastro() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {setToken, setUserName} = useContext(AppContext)
  const navigate = useNavigate();


  function fail(a) {
    setLoading(false)
    alert(a.message)
    console.log(a)
  }
  function success(e) {
    setUserName(name)
    setToken(e.data.token)
    navigate('/home')
  }

  function checkSignUp(e) {
    e.preventDefault()
    setLoading(true)
    let obj = {
      name,
      password,
      confirmPassword
    }
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, obj)
    promise.then((e) => success(e))
    promise.catch((e) => fail(e))
  }

    return (
      <>
        <div className="h-screen flex items-center">
    <div className="w-full max-w-lg mx-auto my-auto overflow-hidden bg-[#14141D] rounded-lg shadow-md dark:bg-gray-800">
      <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
        <img className="w-auto h-24" src={logo} alt="logo" />
          </div>

          <h3 className="mt-3 text-lg font-medium text-center text-gray-600 dark:text-gray-200">Faça o cadastro</h3>

        <form onSubmit={checkSignUp}>
          <div className="w-full mt-2">
            <input required disabled={loading} value={name} onChange={(e) => setName(e.target.value)} autoComplete="username" className="block w-full px-4 py-2 mt-2 text-gray-200 placeholder-gray-400 border rounded-lg bg-gray-800 border-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600" type="text" placeholder="Nome de usuário" aria-label="Nome de usuário"/>
          </div>

          <div className="w-full mt-4">
            <input required disabled={loading} value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-200 placeholder-gray-400 border rounded-lg bg-gray-800 border-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600" type="password" placeholder="Senha" aria-label="Senha"/>
          </div>

          <div className="w-full mt-4">
            <input required disabled={loading} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-200 placeholder-gray-400 border rounded-lg bg-gray-800 border-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600" type="password" placeholder="Confirmar senha" aria-label="Confirmar senha"/>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button disabled={loading} className="mx-auto px-6 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-lime-600 rounded-lg hover:bg-lime-500 focus:outline-none focus:ring focus:ring-opacity-50">
              Registrar-se
            </button>
          </div>
        </form>
      </div>

      <div class="flex items-center justify-center py-4 text-center bg-[#14141D] dark:bg-gray-700">
        <span class="text-sm text-gray-200 dark:text-gray-200">Já tem uma conta? </span>

        <a href="/login" class="mx-2 text-sm font-bold text-emerald-500 dark:text-emerald-400 hover:underline">Faça o login</a>
      </div>
    </div>
  </div>
      </>
    )
  }
  