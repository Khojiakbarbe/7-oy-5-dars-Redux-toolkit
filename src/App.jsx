import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import EditModal from './EditModal';
import { changeStatus, deleteWord } from './features/appSlice';
import { updateLocal } from './Local';
import Modal from './Modal'

function App() {
  const words = useSelector(state => state.translates.words)
  const dispatch = useDispatch()
  
  const [filterWords, setFilterWords] = useState(words);

  useEffect(() => {
    setFilterWords(words)
    updateLocal(words)
  }, [words])

  const [type, setType] = useState('')
  const [level, setLevel] = useState('')

  function filter(e, level) {
    if (e == 'all') {
      setFilterWords(words)
    } else {
      setLevel(level)
      if (level) {
        const filter = words.filter(word => word.completed == Boolean(e) && word.level == level)
        setFilterWords(filter)
      } else {
        const filter = words.filter(word => word.completed == Boolean(e))
        setFilterWords(filter)
      }
    }
  }

  const [tooltip, setTooltip] = useState(false)

  return (
    <div className='px-5 py-7'>
      <Modal />
      <h1 className='text-3xl font-bold mb-5'>Englsh : Uzbek</h1>
      <select className='border rounded-lg px-5 py-3 mx-3' onChange={(e) => { filter(e.target.value, level), setType(e.target.value) }}>
        <option value="all">Barchasi</option>
        <option value="true">Yodlanganlar</option>
        <option value="">Yodlanmaganlar</option>
      </select>
      <select className='border rounded-lg px-5 py-3 ' onChange={(e) => filter(type, e.target.value)}>
        <option value="">All</option>
        <option value="beginner">Beginner</option>
        <option value="elementary">Elementary</option>
        <option value="advanced">Advanced</option>
      </select>
      <div className='mt-5 grid grid-cols-2 text-[auto]   md:grid-cols-4 gap-4 px-3'>
        {filterWords?.map(word => {
          return (
            <div className={`  p-3 text-1xl border ${word.completed && 'bg-green-500 text-white'} rounded-lg gap-2`} key={word.id}>
              <div className='md:flex justify-between'>
                <span className='break-words'>{word.eng}</span> : <span className='break-words'>{word.uz}</span>
              </div>
              <div className='sm:flex md:flex mt-2 gap-3 relative'>
                <button onMouseMove={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)} className=' border p-1 px-2 rounded-lg mx-2' onClick={() => dispatch(changeStatus(word.id))}>{word.completed ? '✔' : "×"}</button>
                {tooltip && <p className='absolute left-[50% top-full border text-blue-600 bg-slate-200 px-3 rounded-lg'>{word.completed ? 'Yodlangan' : 'Yodlanmagan'}</p> }
                <button className='border p-1 px-2 rounded-lg bg-red-600 text-white' onClick={() => dispatch(deleteWord(word.id))}>×</button>
                <EditModal current={word} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App