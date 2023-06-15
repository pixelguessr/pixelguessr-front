import Game from "../components/Game";
import Header from "../components/Header";
import { cha } from "../assets/characters";
export default function Home(){
    console.log(cha.length)
    return (<>
    <Header/>
    <Game/>
    </>)
}