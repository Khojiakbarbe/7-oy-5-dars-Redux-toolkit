import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { post } from './features/appSlice'

function Modal() {

    const dispatch = useDispatch()

    const [modal, setModal] = useState(false)

    const [english, setEnglish] = useState('')
    const [uzbek, setUzbek] = useState('')
    const [level, setLevel] = useState('beginner')
    const [completed, setCompleted] = useState(false)

    function closeModalF(e) {
        if (e.target.id == 'authentication-modal') {
            setModal(false)
        }
    }

    function submit(e) {
        e.preventDefault();
        dispatch(post({ id: Date.now(), eng: english, uz: uzbek, level,  completed }))
        setEnglish('')
        setUzbek('')
    }

    return (
        <div>

            <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" onClick={() => setModal(true)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Yangi so'z qoshish
            </button>

            <div id="authentication-modal" onClick={(e) => closeModalF(e)} tabIndex="-1" aria-hidden="true" className={`fixed top-0  left-0 right-0 bg-[rgba(143,142,142,0.553);] z-50 ${!modal && 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relativ m-[0_auto] items-center w-full max-w-md max-h-full">
                    <div onClick={() => setModal(true)} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => setModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fillRule="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Yopish</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Yangi so'z qoshish</h3>
                            <form className="space-y-6" action="#" onSubmit={submit}>
                                <div>
                                    <label htmlFor="english" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">English</label>
                                    <input type="text" onChange={(e) => setEnglish(e.target.value)} value={english} name="english" id="english" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="english" required />
                                </div>
                                <div>
                                    <label htmlFor="uzbek" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Uzbek</label>
                                    <input value={uzbek} onChange={(e) => setUzbek(e.target.value)} type="text" name="uzbek" id="uzbek" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="uzbek" required />
                                </div>
                                <select onChange={(e) => setLevel(e.target.value)}>
                                    <option value="beginner">Beginner</option>
                                    <option value="elementary">Elementary</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                                <div className="flex items-center mb-4" >
                                    <input id="default-checkbox" onClick={() => setCompleted(!completed)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yodlangan</label>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Qoshish</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Modal