import { useState, useEffect } from "react";
import { GiAlarmClock } from "react-icons/gi";
import { AiOutlineGift } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import Button from "./components/button";
import { KeyBoards } from "./KeyBoard";
import CountdownTimer from "./components/CountdownTimer";
import NewInput from "./components/NewInput";
import Modal from "./components/Modal"
import "./App.css";

function App() {
  // this is the word entered by the user
  const [enteredWord, setEnteredWord] = useState("");
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  const [keyboard, setKeyboard] = useState(KeyBoards);
  const [score, setScore] = useState(0);
  const [runTimer, setRunTimer] = useState(false);
  const [popUp, setPopUp] = useState(false);
  // const [index, setIndex] = useState(0)

  const onConfirm = () => setPopUp(false)

  useEffect(() => {
    fetchData()
  }, [])
  
  const fetchData = () => {
  fetch('https://api.urbandictionary.com/v0/random')
  .then(data => data.json())
  .then(response => {
    const fetchWord  = response.list[0].word.toLowerCase()
    const fetchHint  = response.list[0].definition.toLowerCase()
    // const regex = /[.^&!@#$%_-]/g;
    if (fetchWord.trim().length < 6) {
      if (!/(.).*\1/.test(fetchWord)) {
        console.log(fetchWord)
        setWord(fetchWord)
        setHint(fetchHint)
      }      
    }else {
      fetchData()
    }
  })
  }
  // useEffect(() => {
  //   blinkWords();
  // }, [word]);

  const blinkWords = () => {
    let letter = word.toUpperCase().split('')
    console.log(letter)
    keyboard.map(key => {
      if(letter.includes(key.text)){
        key.isBlink = true;
      }else{
        key.isBlink = false;
      }
    })
  }
  
  const togglerTimer = () => setRunTimer((t) => !t);

  const setScoreHandler = (compareWord: string) => {
    let extWord = compareWord;
    if(extWord.trim().length !== 0 && word.trim().length !== 0){  
      if (extWord == word) {
        setScore(() => score! + 1);
        // this delays clearing the users' input by 1second - just for visual effect.
        setTimeout(() => {
          setEnteredWord("");
          fetchData()
        }, 1000);
        console.log("done!");
      }else{
        setTimeout(() => {
          setEnteredWord("");
          fetchData()
        }, 500);
        console.log('wrong')
      }
  }
  };

  useEffect(() => {
    if (enteredWord.length !== word.length) return;
    setScoreHandler(enteredWord);
  }, [enteredWord]);

  return (
    <div className="container px-auto mx-auto pb-9 bg-ochre text-neutral-100 h-screen font-kumbh-sans rounded-lg">
      <div className="flex justify-between pt-3">
        <div className="flex m-3">
          <GiAlarmClock className="w-8 h-8" />
          <CountdownTimer runTimer={runTimer} />
        </div>
        <div className="flex m-3">
          <div className="text-2xl uppercase">score</div>
          <div className="text-2xl bg-walnut px-4 rounded-lg ml-1 shadow-inner">{score}</div>
        </div>
      </div>
      <div className="border-4 border-old-whiskey m-2 bg-walnut rounded-xl p-3 h-72 pt-16">
        <div className="cell-1">
          {keyboard.slice(0, 10).map((letter) => (
            <div key={letter.id} className={`col ${letter.isBlink ? "bg-text" : null}`}>
              <span className={`${letter.isBlink ? "blink" : null}`}>{letter.text}</span>
            </div>
          ))}
        </div>
        <div className="cell-2">
          {keyboard.slice(10, 19).map((letter) => (
              <div key={letter.id} className={`col ${letter.isBlink ? "bg-text" : null}`}>
              <span className={`${letter.isBlink ? "blink" : null}`}>{letter.text}</span>
            </div>
          ))}
        </div>
        <div className="cell-3">
          {keyboard.slice(19).map((letter) => (
              <div key={letter.id} className={`col ${letter.isBlink ? "bg-text" : null}`}>
              <span className={`${letter.isBlink ? "blink" : null}`}>{letter.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-9">
        <Button icon={<AiOutlineGift className="w-7 h-7 ml-3 pt-1" />} text="hint" onClick={() => setPopUp(true)}></Button>
        <Button icon={<BsPlayFill className="w-11 h-11 ml-1.5" />} text="" onClick={togglerTimer} />
        <Button
        text=""
          icon={<FaArrowRight className="w-8 h-8 ml-2.5"/>}
          onClick={fetchData}
        />
      </div>
      <div className="flex justify-center mt-9">
        <NewInput
          wordCount={word.length}
          enteredWord={enteredWord}
          setEnteredWord={setEnteredWord}
        />
      </div>
      {popUp && <Modal title={'hint!!!'} hint={hint} onConfirm={onConfirm}/>}
    </div>
  );
}

export default App;
