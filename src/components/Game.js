import {IoMdSkipForward} from "react-icons/io"
import ReactCodeInput from "react-code-input"
import { useState } from "react"
export default function Game(){
    const [guess, setGuess] = useState('')
    if(guess==='MARIO'){
        alert('acertou')
    }
    return (<div className="flex mt-6 justify-between">
        <div></div>
        <div className="bg-[#14141D] rounded-md px-6 py-4 w-1/3 flex-col justify-center items-center">
        <div className="flex justify-between"><button className="bg-lime-600 text-white py-2 px-2 rounded-full shadow-md"><span className="bg-lime-700 rounded-full px-2 ">3</span> dicas</button><button className="bg-red-700 shadow-md flex items-center text-white py-2 px-2 rounded-full">Pular<IoMdSkipForward style={{paddingLeft: '4px'}}/></button></div>
        <div className="overflow-hidden shadow-2xl my-4 mx-auto w-11/12"><img src="https://i.pinimg.com/originals/88/2d/88/882d883fcf289d704c064da27ed4fa60.png" alt="character" style={{width: "100%",scale: '3'}}/></div>
        <div className="flex justify-center items-center w-full"><ReactCodeInput value={guess} onChange={setGuess} forceUppercase type='text' fields={5} inputStyle={{borderRadius: '15px', background: '#0C0D11', border: 'none', color: 'white', width: '15%', aspectRatio: '1 / 1', fontFamily: 'Outfit', fontSize: '30px', fontWeight: 700, marginInline: '10px', textAlign: 'center', padding: 0}} />
        </div>
        </div>
        <div></div>
        </div>)
}