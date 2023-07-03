import Header from "../components/Header";
import { useContext } from "react";
import AppContext from "../AppContext/Context";
import Demo from "../components/Demo";
import Game from "../components/Game";
export default function Home(){
    const {token} = useContext(AppContext)
    return (<>
    <Header/>
    {token? <Game/> : <Demo/>}
    </>)
}