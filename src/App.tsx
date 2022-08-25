import { useState, useEffect } from 'react'
import { GiAlarmClock } from "react-icons/gi";
import { GiSpeaker } from "react-icons/gi";
import { BsPlayFill } from "react-icons/bs";
import { IoMdRepeat } from "react-icons/io";
import Button from "./components/button"
import Input from "./components/Input"
import { KeyBoards } from "./KeyBoard";
import CountdownTimer from './components/CountdownTimer';
import './App.css'


function App() {
  const [word, setWord] = useState<string>('PLEASE')
  const [letters, setLetters] = useState(KeyBoards)
  const [score, setScore] = useState<number | null>(0)
  const [runTimer, setRunTimer] = useState<boolean>(false);

  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getMinutes();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
  
  useEffect(() => {
   window.addEventListener("load",blinkWords, false)
  }, [word])


  // logic for blinking letters
  // wants each letters to blink individually not at once
  const blinkWords = () => {
    let wordArray = word.split('')
    letters.forEach((letter) => {
      setInterval(() => {
        wordArray.includes(letter.text) ? letter.isBlink = true : false
      }, letter.id * 800);
    })
  }

  const togglerTimer = () => setRunTimer((t) => !t);
  
  const setScoreHandler = ( compareWord: string) => {
    let extWord  = compareWord.toUpperCase()
    console.log(extWord)
    if(word === extWord){
      setScore(() => score! + 1)
      console.log('done!')
    }
  }

  return (
    <div className='sm:container px-auto mx-auto pb-9 bg-ochre text-neutral-100 h-screen font-kumbh-sans rounded-lg'>
      <div className='flex justify-between pt-3'>
        <div className='flex m-3'>
          <GiAlarmClock className='w-8 h-8'/>
        <CountdownTimer runTimer={runTimer}/>
        {/* <span className='text-2xl'>01:00</span> */}
        </div>
        <div className='flex m-3'>
          <div className='text-2xl uppercase'>score</div>
          <div className='text-2xl bg-walnut px-4 rounded-lg ml-1 shadow-inner'>{score}</div>
        </div>
      </div>
      <div className='border-4 border-old-whiskey m-2 bg-walnut rounded-xl p-3 h-72 pt-16'>
        <div className='cell-1'>
          {letters.slice(0, 10).map(letter => (
            <div key={letter.id} className={`col ${letter.isBlink ? "blink" : null}`}>{letter.text}</div>
          ))}
        </div>
        <div className='cell-2'>
         {letters.slice(10, 19).map(letter => (
            <div key={letter.id} className={`col ${letter.isBlink ? "blink" : null}`}>{letter.text}</div>
          ))}
        </div>
        <div className='cell-3'>
          {letters.slice(19).map(letter => (
            <div key={letter.id} className={`col ${letter.isBlink ? "blink" : null}`}>{letter.text}</div>
          ))}
        </div>
      </div>
      <div className='flex justify-center mt-9'>
        <Button icon={<GiSpeaker className='w-12 h-12'/>} onClick={e => console.log('hey')}/>
        <Button icon={<BsPlayFill className='w-11 h-11 ml-1.5'/>} onClick={togglerTimer}/>
        <Button icon={<IoMdRepeat className='w-11 h-11 ml-1'/>} onClick={e => console.log('hey')}/>
      </div>
      <div className='flex justify-center mt-9'>
        <Input presentWord={word} setScoreHandler={setScoreHandler}/>
      </div>
    </div>
  )
}

export default App
