import { IoMdSkipForward, IoMdTrophy } from "react-icons/io"
import { BsInfoCircleFill } from "react-icons/bs"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { BiMedal } from "react-icons/bi"
import { useContext, useEffect, useState } from "react"
import info_sound from "../assets/info_sound_effect.mp3"
import hint_sound from "../assets/hint_sound_effect.mp3"
import skip_sound from "../assets/skip_sound_effect.mp3"
import success_sound from "../assets/success_sound_effect.mp3"
import AppContext from "../AppContext/Context"
import axios from "axios"
import { Oval } from "react-loader-spinner"
import PinInput from "react-pin-input"
import { inputStyles } from "../assets/inputStyles"
export default function Game() {
    const [showModal, setShowModal] = useState(false)
    const [showSkipModal, setShowSkipModal] = useState(false)
    const [showSkipModal2, setShowSkipModal2] = useState(false)
    const info_audio = new Audio(info_sound)
    const hint_audio = new Audio(hint_sound)
    const skip_audio = new Audio(skip_sound)
    const success_audio = new Audio(success_sound)
    const [numberOfHints, setNumberOfHints] = useState(3)
    const [numberOfInputs, setNumberOfInputs] = useState(5)
    const [rv, setRV] = useState(0)
    const [loading, setLoading] = useState(true)
    const [showNextLevel, setShowNextLevel] = useState(false)
    const [showNextLevel2, setShowNextLevel2] = useState(false)
    const { doneLevels, setDoneLevels, config } = useContext(AppContext)
    const [levelInfo, setLevelInfo] = useState({})
    const [rankInfo, setRankInfo] = useState({})
    const [soldOutLevels, setSoldOutLevels] = useState(false)

    useEffect(() => {
        const doneLevelsIds = doneLevels.map((i)=> i.character_id)
        const availableLevels = []

        for (let i = 1; i <= 43; i++) {
            if(!doneLevelsIds.includes(i)){
                availableLevels.push(i)
            }
        }
        if(availableLevels.length===0){
            setSoldOutLevels(true)
            setLoading(false)
        } else{
        const randomIndex = Math.floor(Math.random() * availableLevels.length);
        const randomLevel = availableLevels[randomIndex];

        axios.get(`${process.env.REACT_APP_API_URL}/game/${randomLevel}`, config).then((i) => {
            setLevelInfo(i.data.levelInfo)
            setRankInfo(i.data.rankInfo)
            setLoading(false)
            setNumberOfHints(3)
            setNumberOfInputs(i.data.levelInfo.name.length)
        }).catch((e) => { console.log(e) })
    }
    }, [rv])

    async function makeAGuess(win) {
        let score = 10;
        if (numberOfHints === 2) {
            score = 9;
        }
        if (numberOfHints === 1) {
            score = 7;
        }
        if (numberOfHints === 0) {
            score = 4;
        }
        if (!win) {
            score = 0;
        }
        const obj = {
            character_id: levelInfo.id,
            score
        }
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/game/guess`, obj, config);
            setDoneLevels([...doneLevels, {character_id: levelInfo.id}])
            console.log('ok');
        } catch (error) {
            console.log(error);
        }
    }
    function handleInput(guess) {
        if (guess === levelInfo.name) {
            handleSuccess()
        }
    }
    function handleSkipModal(conditional) {
        if (conditional) {

            setShowSkipModal(true)
            setTimeout(() => {
                setShowSkipModal2(true);
            }, 100);
        } else {
            setShowSkipModal2(false)
            setTimeout(() => {
                setShowSkipModal(false);
            }, 400);
        }
    }
    function handleHandleNextLevel(conditional) {
        if (conditional) {
            setShowNextLevel(true)
            setTimeout(() => {
                setShowNextLevel2(true);
            }, 600);
        } else {
            setShowNextLevel2(false)
            setTimeout(() => {
                setLoading(true)
                setRV(rv + 1)
                setShowNextLevel(false);
            }, 600);
        }
    }
    function handleHint() {
        setNumberOfHints(numberOfHints - 1)
        hint_audio.play();
    }
    function handleInfo() {
        setShowModal(true);
        info_audio.play();
    }
    function handleSkip() {
        handleSkipModal(false)
        skip_audio.play();
        handleHandleNextLevel(true)
        makeAGuess(false);
    }
    function handleSuccess() {
        success_audio.play();
        handleHandleNextLevel(true)
        makeAGuess(true)
    }

    if (loading) {
        return (<div className="flex w-full justify-center pt-40">
            <Oval
                height={100}
                width={100}
                color="#65A30D"
                secondaryColor="transparent"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>)
    }
    if(soldOutLevels){
        return(<div id="popup-modal" className={`flex justify-center pt-32 top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-[#14141D] rounded-lg shadow dark:bg-gray-700">
            
                <div className="p-6 text-center">
                    <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-100 dark:text-gray-400">Você já jogou todos os níveis! Mais personagens estarão disponíveis em breve.</h3>

                   </div>
            </div>
        </div>
    </div>)
    }

    return (<div className="w-full relative">
        <div className={`flex ${showNextLevel ? 'opacity-0' : 'opacity-100'} transition-all duration-300 ease-in-out mt-6 justify-center`}>
            <div className="flex flex-col items-center w-1/3 p-8">
                <div style={{ transform: numberOfHints < 3 ? 'translateX(0)' : 'translateX(-300%)' }} className={`bg-lime-600 transition-all duration-700 ease-in-out inline-block cursor-default p-3 mb-6 rounded-full`}><p className="text-white">{levelInfo.hint_one}</p></div>
                <div style={{ transform: numberOfHints < 2 ? 'translateX(0)' : 'translateX(-300%)' }} className={`bg-lime-600 transition-all duration-700 ease-in-out inline-block cursor-default p-3 mb-6 rounded-full`}><p className="text-white">{levelInfo.hint_two}</p></div>
                <div style={{ transform: numberOfHints < 1 ? 'translateX(0)' : 'translateX(-300%)' }} className={`bg-lime-600 transition-all duration-700 ease-in-out inline-block cursor-default p-3 mb-6 rounded-full`}><p className="text-white">{levelInfo.hint_three}</p></div>
            </div>
            <div className="bg-[#14141D] rounded-md px-6 py-4 w-1/3 flex-col justify-center items-center">
                <div className="flex justify-between">
                    <button disabled={numberOfHints === 0} onClick={handleHint} className={`${numberOfHints ? 'active:bg-lime-500' : ''} bg-lime-600 text-white py-2 px-2 rounded-full shadow-md`}><span className="bg-lime-700 rounded-full px-2 ">{numberOfHints}</span> dicas</button>
                    <button onClick={handleInfo} className="bg-amber-500 active:bg-amber-400 items-center flex text-white py-2 px-2 rounded-full shadow-md"><BsInfoCircleFill size={22} style={{ paddingRight: '6px' }} />Regras</button>
                    <button type="button" onClick={() => handleSkipModal(true)} className="bg-red-700 active:bg-red-600 shadow-md flex items-center text-white py-2 px-2 rounded-full">Pular<IoMdSkipForward style={{ paddingLeft: '4px' }} /></button></div>
                <div className="overflow-hidden rounded-xl shadow-2xl mt-5 mb-3 mx-auto aspect-square w-11/12"><img src={levelInfo.image} alt="character" style={{}} className="w-full blur-lg h-full object-cover" /></div>
                <div className="flex w-full justify-center">
                    <PinInput
                        length={numberOfInputs}
                        initialValue=""
                        type="custom"
                        focus={true}
                        style={{width: '100%', textAlign: 'center'}}
                        inputStyle={inputStyles[numberOfInputs]}
                        inputFocusStyle={{ border: '1px solid #65A30D' }}
                        onComplete={handleInput}
                        autoSelect={true}
                    />
                </div>
            </div>
            <div className="w-1/3">
                <div className="bg-[#14141D] w-2/3 mx-auto p-4 mt-6 rounded-md">
                    <h1 className="text-white text-lg mb-2 font-medium">Top 5 maiores pontuações</h1>
                    <hr className="border-[#393A3B] mb-3" />
                    {rankInfo[0] && (<div className="flex my-2 items-center"><IoMdTrophy color="gold" size={24} /><p className="text-white ml-1 text-base">{rankInfo[0].name}</p><p className="ml-auto text-white text-sm pr-1 italic">{rankInfo[0].score} pontos</p></div>)}
                    {rankInfo[1] && (<div className="flex my-2 items-center"><IoMdTrophy color="silver" size={24} /><p className="text-white ml-1 text-base">{rankInfo[1].name}</p><p className="ml-auto text-white text-sm pr-1 italic">{rankInfo[1].score} pontos</p></div>)}
                    {rankInfo[2] && (<div className="flex my-2 items-center"><IoMdTrophy color="chocolate" size={24} /><p className="text-white ml-1 text-base">{rankInfo[2].name}</p><p className="ml-auto text-white text-sm pr-1 italic">{rankInfo[2].score} pontos</p></div>)}
                    {rankInfo[3] && (<div className="flex my-2 items-center"><BiMedal color="white" size={24} /><p className="text-white ml-1 text-base">{rankInfo[3].name}</p><p className="ml-auto text-white text-sm pr-1 italic">{rankInfo[3].score} pontos</p></div>)}
                    {rankInfo[4] && (<div className="flex my-2 items-center"><BiMedal color="white" size={24} /><p className="text-white ml-1 text-base">{rankInfo[4].name}</p><p className="ml-auto text-white text-sm pr-1 italic">{rankInfo[4].score} pontos</p></div>)}

                </div>
            </div>
            {/* info modal */}
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

            {/* skip modal */}
            <div id="popup-modal" tabindex="-1" className={`${showSkipModal2 ? 'opacity-100' : 'opacity-0'} ${showSkipModal ? '' : 'hidden'} transition-all duration-700 ease-in-out flex justify-center pt-32 fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-[#242526] rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => handleSkipModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
                            <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-100 dark:text-gray-400">Tem certezar que quer pular?</h3>
                            <button onClick={() => handleSkip()} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Sim
                            </button>
                            <button onClick={() => handleSkipModal(false)} data-modal-hide="popup-modal" type="button" className="text-gray-100 bg-gray-500 hover:bg-gray-600 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Não</button>
                        </div>
                    </div>
                </div>
            </div>



        </div>

        {/* results */}
        <div className={`${showNextLevel ? 'flex' : 'hidden'} ${showNextLevel2 ? 'opacity-100' : 'opacity-0'} transition-all duration-700 ease-in-out flex-col top-0 w-full h-full absolute z-50 items-center`}>
            <img className="rounded-lg h-2/3" src={levelInfo.image} alt="" />
            <h1 className="text-gray-100 text-3xl font-semibold mt-8">{levelInfo.fullname}</h1>
            <h1 className="text-gray-400 text-2xl font-medium mt-2">{levelInfo.game}</h1>
            <h1 onClick={() => handleHandleNextLevel(false)} className="font-[Exo] text-white hover:text-gray-300 cursor-pointer text-lg mt-8">Continuar jogando ↵</h1>
        </div>
    </div>
    )
}