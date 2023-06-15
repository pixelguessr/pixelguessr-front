import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../AppContext/Context"
export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
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
    navigate('/')
  }

  function checkLogin(e) {
    e.preventDefault()
    setUserName(name)
    navigate('/')
    return
    // setLoading(true)
    // let obj = {
    //   name,
    //   password
    // }
    // const promise = axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, obj)
    // promise.then((e) => success(e))
    // promise.catch((e) => fail(e))
  }

  return (
    <div className="h-screen flex items-center">
      <div className="w-full max-w-lg mx-auto my-auto overflow-hidden bg-[#14141D] rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
          </div>

          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Pixel Guessr</h3>

          <p className="mt-1 text-center text-gray-200 dark:text-gray-400">Login</p>

          <form onSubmit={checkLogin}>
            <div className="w-full mt-4">
              <input autoComplete="off" disabled={loading} value={name} onChange={(e) => setName(e.target.value)} required className="autofill:bg-black block w-full px-4 py-2 mt-2 text-gray-200 placeholder-gray-400 border rounded-lg bg-gray-800 border-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600" type="text" placeholder="Nome de usuário" aria-label="Nome de usuário" />
            </div>

            <div className="w-full mt-4">
              <input autoComplete="off" disabled={loading} value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full px-4 py-2 mt-2 text-gray-200 placeholder-gray-400 border rounded-lg bg-gray-800 border-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600" type="password" placeholder="Senha" aria-label="Senha" />
            </div>

            <div className="flex items-center justify-between mt-4">

              <button disabled={loading} className="mx-auto px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-lime-600 rounded-lg hover:bg-lime-500 focus:outline-none focus:ring focus:ring-opacity-50">
                Entrar
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-[#14141D] dark:bg-gray-700">
          <span className="text-sm text-gray-200 dark:text-gray-200">Não tem uma conta? </span>

          <a href="/signup" className="mx-2 text-sm font-bold text-emerald-500 dark:text-emerald-400 hover:underline">Registre-se</a>
        </div>
      </div>
    </div>
  )
}
