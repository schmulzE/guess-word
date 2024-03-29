import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { GiAlarmClock } from "react-icons/gi";
import { AiOutlineClose, AiOutlineGift } from "react-icons/ai";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import Button from "./components/button";
import { KeyBoards } from "./KeyBoard";
import NewInput from "./components/NewInput";
import Modal from "./components/Modal/Modal"
import "./App.css";
// import Congratulation from "./components/Congratulation/Congratulation";
// import Fireworks from "./components/Fireworks/Fireworks";
// import useLocalStorage from "../src/useLocalStorage";
import Pomodoro from "./components/Pomodoro";

function App() {
  // this is the word entered by the user
  const [enteredWord, setEnteredWord] = useState("");
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  const [keyboard, setKeyboard] = useState(KeyBoards);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [popUp, setPopUp] = useState(false);
  const [secondPopUp, setSecondPopUp] = useState(false);
  // const [thirdPopUp, setThirdPopUp] = useState(false);
  const [minutes, setMinutes] = useState(5); // Initial work time in minutes
  const [seconds, setSeconds] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const onConfirm = () => setPopUp(false)

  async function fetchUrbanDictionaryWords() {
    try {
      const response = await fetch('https://api.urbandictionary.com/v0/random');
      let data = await response.json()
      const entries = data.list.filter((item: { word: { trim: () => { (): any; new(): any; length: number; }; }; }) => item.word.trim().length < 6).map((entry: { word: string }) => entry);
      // Filter words with repeated characters or containing digits
      const filteredWords = entries.filter((entry: any) => {
        return !hasRepeatedCharacters(entry.word) && !hasDigits(entry.word);
      });
  
      if(filteredWords.length){
        setWord(filteredWords[0].word.toLowerCase())
        setHint(filteredWords[0].definition.toLowerCase())
      }else {
        fetchUrbanDictionaryWords()
      }
    } catch (error) {
      console.error("Error fetching words from Urban Dictionary API:", error);
    }
  }

  useEffect(() => {
    // Load the high score from localStorage when the component mounts
    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  const increaseScore = () => {
    const newScore = score + 1;
    setScore(newScore);

    // Update the high score in localStorage if the current score is higher
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('highScore', newScore.toString());
    }
  }
  
  function hasRepeatedCharacters(word: string) {
    var text = word.split("");
    return text.some(function(v,i,a){
      return a.lastIndexOf(v)!=i;
    });
  }
  
  function hasDigits(word: string) {
    const regex = /\d/;
    return regex.test(word);
  }

  let letter = useMemo(() => word.toUpperCase().split(''), [word])

  const setScoreHandler = (compareWord: string) => {
    let extWord = compareWord;
    if(extWord.trim().length !== 0 && word.trim().length !== 0){  
      if (extWord == word) {
        // setScore(() => score + 1);
        increaseScore()
        // this delays clearing the users' input by 1second - just for visual effect.
        setTimeout(() => {
          setEnteredWord("");
          fetchUrbanDictionaryWords()
        }, 500);
        console.log("done!");
      }else{
        setTimeout(() => {
          setEnteredWord("");
          fetchUrbanDictionaryWords()
        }, 500);
        console.log('wrong')
      }
    }
  };

  const toggleGame = () => {
    setIsActive(!isActive);
  };

  const resetGame = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(5);
    setSeconds(0);
    setWord("");
    setHint("")
    setScore(0);
    setSecondPopUp(false);
  };


  useEffect(() => {
    if (enteredWord.length !== word.length) return;
    setScoreHandler(enteredWord);
  }, [enteredWord, word]);

  return (
    <div className="container px-auto mx-auto pb-9 bg-ochre text-neutral-100 h-screen font-kumbh-sans rounded-none md:rounded-md lg:rounded-lg">
      <div className="flex justify-between pt-3">
        <div className="flex m-3">
          {/* <Fireworks/> */}
          <GiAlarmClock className="w-8 h-8" />
          <Pomodoro 
          minutes={minutes}
          setMinutes={setMinutes} 
          seconds={seconds} 
          setSeconds={setSeconds} 
          isActive={isActive} 
          setIsActive={setIsActive} 
          isBreak={isBreak} 
          setIsBreak={setIsBreak}
          resetGame={resetGame}
          />
        </div>
        <div className="flex m-3">
          <div className="text-2xl uppercase">score</div>
          <div className="text-2xl bg-walnut px-4 rounded-lg ml-1 shadow-inner">{score}</div>
        </div>
      </div>
      <div className="border-4 border-old-whiskey m-2 bg-walnut rounded-xl p-3 h-72 pt-16">
        <div className="cell-1">
          {keyboard.slice(0, 10).map((key) => (
            <div key={key.id} className={`col ${letter.includes(key.text) ? "bg-text" : null}`}>
              <span className={`${letter.includes(key.text) ? "blink" : null}`}>{key.text}</span>
            </div>
          ))}
        </div>
        <div className="cell-2">
          {keyboard.slice(10, 19).map((key) => (
            <div key={key.id} className={`col ${letter.includes(key.text) ? "bg-text" : null}`}>
              <span className={`${letter.includes(key.text) ? "blink" : null}`}>{key.text}</span>
            </div>
          ))}
        </div>
        <div className="cell-3">
          {keyboard.slice(19).map((key) => (
            <div key={key.id} className={`col ${letter.includes(key.text) ? "bg-text" : null}`}>
              <span className={`${letter.includes(key.text) ? "blink" : null}`}>{key.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-9">
        <Button hint={hint} className='shadow-2xl w-14 h-14 rounded-full border-2 border-old-whiskey bg-walnut text-center mx-6' icon={<AiOutlineGift className="w-7 h-7 ml-3 pt-1" />} text="hint" onClick={() => setPopUp(true)}></Button>
         {!isActive
          ? <Button className='shadow-2xl w-14 h-14 rounded-full border-2 border-old-whiskey bg-walnut text-center mx-6' icon={<BsPlayFill className="w-11 h-11 ml-1.5" />} text="" onClick={() => { toggleGame(); fetchUrbanDictionaryWords()} } />
          : <Button className='shadow-2xl w-14 h-14 rounded-full border-2 border-old-whiskey bg-walnut text-center mx-6' icon={<BsPauseFill className="w-11 h-11 ml-1" />} text="" onClick={() => {  toggleGame(); setSecondPopUp(true)
        } } />}
        <Button
          className='shadow-2xl w-14 h-14 rounded-full border-2 border-old-whiskey bg-walnut text-center mx-6'
          text=""
          icon={<FaArrowRight className="w-8 h-8 ml-2.5"/>}
          onClick={fetchUrbanDictionaryWords}
          />
      </div>
      <div className="flex justify-center mt-9">
        <NewInput
        wordCount={word.length}
        enteredWord={enteredWord}
        setEnteredWord={setEnteredWord}
        />
      </div>

      <Modal open={popUp} >
        <div className="border-8 bg-old-whiskey border-old-whiskey shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] h-fit">
          <button onClick={() => setPopUp(false)} className="border-ochre border-4 p-2 bg-walnut m-4 rounded-full absolute -top-8 -right-4 md:-right-6">
            <AiOutlineClose className="text-white md:text-lg text-md"/>
          </button>
          <span className="text-center inline-block py-1 px-8 absolute -top-3 right-36 sm:right-28 md:right-64 lg:left-72 font-bold text-white text-xl font-kumbh-sans capitalize border-4 border-ochre bg-walnut rounded-full">
            hint
          </span>
          <div className="px-5 py-10 text-xl font-kumbh-sans text-white">{hint}</div>
        </div>
      </Modal>

      <Modal open={secondPopUp} >
        <div className="border-8 bg-old-whiskey border-old-whiskey shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] h-fit">
          <button onClick={() => setSecondPopUp(false)} className="border-ochre border-4 p-2 bg-walnut m-4 rounded-full absolute -top-8 -right-4 md:-right-6">
            <AiOutlineClose className="text-white md:text-lg text-md"/>
          </button>
          <span className="text-center inline-block py-1 px-8 absolute -top-3 right-28 sm:right-28 md:right-64 lg:left-72 font-bold text-white text-xl font-kumbh-sans capitalize border-4 border-ochre bg-walnut rounded-full">
            play
          </span>
          <div className="px-5 text-center py-10 text-xl text-white">
            <Button 
            className='shadow-2xl px-8 py-2 rounded-full border-4 my-4 border-ochre bg-walnut text-center mx-6' 
            icon={undefined} 
            text="Resume" 
            onClick={() => { toggleGame(); setSecondPopUp(false)} } 
            />
            <Button 
            className='shadow-2xl px-8 py-2 rounded-full border-4 border-ochre bg-walnut text-center mx-6' 
            icon={undefined} 
            text="Quit" 
            onClick={resetGame} 
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
