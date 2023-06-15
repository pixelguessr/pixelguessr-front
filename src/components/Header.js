import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import {ImExit} from "react-icons/im"
import AppContext from "../AppContext/Context"
import { useContext } from "react"
export default function Header(){
    const { userName } = useContext(AppContext)
    return(<>
    <header className="w-full flex py-1 px-10 items-center justify-between bg-[#14141D]">
        <img style={{width:'5%'}} src={logo} alt="logo"/>
      {
        userName ? <div className="flex items-center text-lg font-semibold leading-6 text-white">{userName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to='/login'><ImExit/></Link></div> : <Link to="/login" className="text-lg font-semibold leading-6 text-white">Login <span aria-hidden="true">&rarr;</span></Link>
      }
    
    </header>
    </>)
}