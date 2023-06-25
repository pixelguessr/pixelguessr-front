import { IoMdSkipForward, IoMdTrophy } from "react-icons/io"
import { BsInfoCircleFill } from "react-icons/bs"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { BiMedal } from "react-icons/bi"
import ReactCodeInput from "react-code-input"
import { useState } from "react"
import info_sound from "../assets/info_sound_effect.mp3"
import hint_sound from "../assets/hint_sound_effect.mp3"
export default function Game() {
    const [guess, setGuess] = useState('')
    const [showModal, setShowModal] = useState(false)
    const info_audio = new Audio(info_sound)
    const hint_audio = new Audio(hint_sound)
    const [numberOfHints, setNumberOfHints] = useState(3)
    const [showResult, setShowResult] = useState(false)

    if (guess === 'MARIO') {
        alert('acertou')
    }

    function handleHint(){
        setNumberOfHints(numberOfHints-1)
        hint_audio.play();
    }
    function handleInfo(){
        setShowModal(true);
        info_audio.play();
    }

    return (<div className="w-full relative">
        <div className="flex opacity-100 mt-6 justify-center">
            <div className="flex flex-col items-center w-1/3 p-8">
                <div style={{transform: numberOfHints<3? 'translateX(0)' : 'translateX(-300%)'}} className={`bg-lime-600 transition-all duration-700 ease-in-out inline-block cursor-default p-3 mb-6 rounded-full`}><p className="text-white">Tem um irmão chamado Luigi</p></div>
                <div style={{transform: numberOfHints<2? 'translateX(0)' : 'translateX(-300%)'}} className={`bg-lime-600 transition-all duration-700 ease-in-out inline-block cursor-default p-3 mb-6 rounded-full`}><p className="text-white">É um encanador</p></div>
                <div style={{transform: numberOfHints<1? 'translateX(0)' : 'translateX(-300%)'}} className={`bg-lime-600 transition-all duration-700 ease-in-out inline-block cursor-default p-3 mb-6 rounded-full`}><p className="text-white">Maior símbolo da Nintendo</p></div>
            </div>
            <div className="bg-[#14141D] rounded-md px-6 py-4 w-1/3 flex-col justify-center items-center">
                <div className="flex justify-between">
                    <button disabled={numberOfHints===0} onClick={handleHint} className={`${numberOfHints? 'active:bg-lime-500' : ''} bg-lime-600 text-white py-2 px-2 rounded-full shadow-md`}><span className="bg-lime-700 rounded-full px-2 ">{numberOfHints}</span> dicas</button>
                    <button onClick={handleInfo} className="bg-amber-500 active:bg-amber-400 items-center flex text-white py-2 px-2 rounded-full shadow-md"><BsInfoCircleFill size={22} style={{ paddingRight: '6px' }} />Regras</button>
                    <button className="bg-red-700 active:bg-red-600 shadow-md flex items-center text-white py-2 px-2 rounded-full">Pular<IoMdSkipForward style={{ paddingLeft: '4px' }} /></button></div>
                <div className="overflow-hidden rounded-xl shadow-2xl my-4 mx-auto aspect-square w-11/12"><img src="https://i.pinimg.com/originals/88/2d/88/882d883fcf289d704c064da27ed4fa60.png" alt="character" style={{}} className="w-full blur-lg h-full object-cover" /></div>
                <div className="flex justify-center items-center w-full"><ReactCodeInput value={guess} onChange={setGuess} forceUppercase type='text' fields={5} inputStyle={{ borderRadius: '15px', background: '#0C0D11', border: 'none', color: 'white', width: '15%', aspectRatio: '1 / 1', fontFamily: 'Outfit', fontSize: '30px', fontWeight: 700, marginInline: '10px', textAlign: 'center', padding: 0 }} />
                </div>
            </div>
            <div className="w-1/3">
                <div className="bg-[#14141D] w-2/3 mx-auto p-4 mt-6 rounded-md">
                    <h1 className="text-white text-lg mb-2 font-medium">Top 5 maiores pontuações</h1>
                    <hr className="border-[#393A3B] mb-3"/>
                    <div className="flex my-2 items-center"><IoMdTrophy color="gold" size={24}/><p className="text-white ml-1 text-base">Roland</p><p className="ml-auto text-white text-sm pr-1 italic">60 pontos</p></div>
                    <div className="flex my-2 items-center"><IoMdTrophy color="silver" size={24}/><p className="text-white ml-1 text-base">Malady</p><p className="ml-auto text-white text-sm pr-1 italic">50 pontos</p></div>
                    <div className="flex my-2 items-center"><IoMdTrophy color="chocolate" size={24}/><p className="text-white ml-1 text-base">DOA</p><p className="ml-auto text-white text-sm pr-1 italic">40 pontos</p></div>
                    <div className="flex my-2 items-center"><BiMedal color="white" size={24}/><p className="text-white ml-1 text-base">King K. Rool</p><p className="ml-auto text-white text-sm pr-1 italic">30 pontos</p></div>
                    <div className="flex my-2 items-center"><BiMedal color="white" size={24}/><p className="text-white ml-1 text-base">menorque</p><p className="ml-auto text-white text-sm pr-1 italic">20 pontos</p></div>
                    
                </div>
            </div>

            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >

                        <div className={`relative w-auto my-6 mx-auto max-w-3xl transition-all duration-700 ease-in-out`}>
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#242526] outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center justify-between p-5 border-b border-solid border-[#393A3B] rounded-t">
                                    <h3 className="text-2xl text-white font-semibold">
                                        Regras do jogo
                                    </h3>
                                    <button
                                        className="items-center justify-center"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <AiOutlineCloseCircle size={30} color="white" />
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-white text-lg leading-relaxed">
                                        - Se acertar sem usar dicas, ganhará 10 pontos.<br />
                                        - Caso use 1 dica, ganhará 9 pontos ao acertar. <br />
                                        - Caso use 2 dicas, ganhará 7 pontos ao acertar. <br />
                                        - Case use todas as dicas, ganhará somente 4 pontos.<br />
                                        - Se escolher pular o personagem, não ganhará pontos.<br />
                                        - Caso escolha pular, não poderá advinhar o mesmo personagem novamente.<br />
                                        - Chutes ilimitados.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>  
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}



        </div>

        
        <div className={`opacity-0 ${showResult? 'flex' : 'hidden'} flex-col top-0 w-full h-full absolute z-50 items-center`}>
            <img className="rounded-lg h-2/3" src="https://i.pinimg.com/originals/88/2d/88/882d883fcf289d704c064da27ed4fa60.png" alt=""/>
            <h1 className="text-gray-100 text-3xl font-semibold mt-8">Mario</h1>
            <h1 className="text-gray-400 text-2xl font-medium mt-2">Super Mario World</h1>
            <h1 className="font-[Exo] text-white hover:text-gray-300 cursor-pointer text-lg mt-8">Continuar jogando ↵</h1>
        </div>
        </div>
    )
}