import logo from "../assets/logo_without_name.png"
import { Link } from "react-router-dom"
import {ImExit} from "react-icons/im"
import AppContext from "../AppContext/Context"
import { useContext } from "react"
export default function Header(){
    const { userName } = useContext(AppContext)
    return(<>
    <header className="w-full flex py-1 px-10 items-center justify-between bg-[#14141D]">
        <img style={{width:'6%'}} src={logo} alt="logo"/>
        <h1 style={{fontWeight: 500, left: '50%', transform: 'translateX(-50%)'}} className="text-gray-500 absolute cursor-default font-[Orbitron] text-3xl "><span className="text-gray-200">PIXEL</span> GUESSR</h1>
      {
        userName ? <div className="flex items-center text-lg font-semibold leading-6 text-white">{userName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to='/login'><ImExit/></Link></div> : <Link to="/login" className="text-lg font-semibold leading-6 text-white">Login <span aria-hidden="true">&rarr;</span></Link>
      }
    
    </header>
    </>)
}