import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { GiAlarmClock } from "react-icons/gi";
import { AiOutlineGift } from "react-icons/ai";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import Button from "./components/button";
import { KeyBoards } from "./KeyBoard";
import NewInput from "./components/NewInput";
import Modal from "./components/Modal/Modal"
import "./App.css";
import Timer from "./components/Timer";
import Congratulation from "./components/Congratulation/Congratulation";
import Fireworks from "./components/Fireworks/Fireworks";
// import useLocalStorage from "../src/useLocalStorage";

function App() {
  // this is the word entered by the user
  const [enteredWord, setEnteredWord] = useState("");
  const [word, setWord] = useState("qwerty");
  const [hint, setHint] = useState("");
  const [keyboard, setKeyboard] = useState(KeyBoards);
  // const [score, setScore] = useLocalStorage("score", 0);
  const [score, setScore] = useState(0);

  const [popUp, setPopUp] = useState(false);
  const [secondPopUp, setSecondPopUp] = useState(false);
  const [thirdPopUp, setThirdPopUp] = useState(false);

  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  const onConfirm = () => setPopUp(false)
  // useEffect(() => {
  //   fetchData()
  // }, [word, hint])
  
  // const fetchData = useCallback(() => {
  //   fetch('https://api.urbandictionary.com/v0/random')
  //   .then(data => data.json())
  //   .then(response => {
  //     const fetchWord  = response.list.word.toLowerCase()
  //     const fetchHint  = response.list.definition.toLowerCase()
  //     if (fetchWord.trim().length < 6) {
  //       // if (/(.).*\1|\d/.test(fetchWord)) {
  //       if (/(.)\1|\d/.test(fetchWord)) {
  //         console.log(fetchWord)
  //         setWord(fetchWord)
  //         setHint(fetchHint)
  //       }      
  //     }else {
  //       fetchData()
  //     }
  //   })
  // }, [word, hint])


  async function fetchUrbanDictionaryWords() {
    try {
      const response = await fetch('https://api.urbandictionary.com/v0/random');
      let data = await response.json()
      const entries = data.list.filter((item: { word: { trim: () => { (): any; new(): any; length: number; }; }; }) => item.word.trim().length < 6).map((entry: { word: string }) => entry);
      // Filter words with repeated characters or containing digits
      const filteredWords = entries.filter((entry: any) => {
        return !hasRepeatedCharacters(entry.word) && !hasDigits(entry.word);
      });
  
      // console.log("Filtered words:", filteredWords);
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
  
  function hasRepeatedCharacters(word: string) {
    // const regex = /(.)\1+/;
    // const regex = /(.).*\1/;
    // return regex.test(word);
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
        setScore(() => score! + 1);
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

  const resetGame = useCallback(() => {
    setIsPaused(true);
    setWord("");
    setScore(0); 
    setSecondsLeft(0);
    setSecondPopUp(false);
  },[isPaused, word, score, thirdPopUp, secondsLeft, setWord])

  useEffect(() => {
    if (enteredWord.length !== word.length) return;
    setScoreHandler(enteredWord);
  }, [enteredWord, word]);

  return (
    <div className="container px-auto mx-auto pb-9 bg-ochre text-neutral-100 h-screen font-kumbh-sans rounded-lg">
      <div className="flex justify-between pt-3">
        <div className="flex m-3">
          {/* <Fireworks/> */}
          <GiAlarmClock className="w-8 h-8" />
          <Timer setThirdPopUp={setThirdPopUp} isPaused={isPaused} secondsLeft={secondsLeft} setSecondsLeft={setSecondsLeft} isPausedRef={isPausedRef} secondsLeftRef={secondsLeftRef}/>
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
        <Button className='shadow-2xl w-14 h-14 rounded-full border-2 border-old-whiskey bg-walnut text-center mx-6' icon={<AiOutlineGift className="w-7 h-7 ml-3 pt-1" />} text="hint" onClick={() => setPopUp(true)}></Button>
         {isPaused
          ?  <Button className='shadow-2xl w-14 h-14 rounded-full border-2 border-old-whiskey bg-walnut text-center mx-6' icon={<BsPlayFill className="w-11 h-11 ml-1.5" />} text="" onClick={() => { setIsPaused(false); isPausedRef.current = false; fetchUrbanDictionaryWords()} } />
          : <Button className='shadow-2xl w-14 h-14 rounded-full border-2 border-old-whiskey bg-walnut text-center mx-6' icon={<BsPauseFill className="w-11 h-11 ml-1" />} text="" onClick={() => {  setIsPaused(true); isPausedRef.current = true; setSecondPopUp(true)
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
      {popUp && <Modal title={'hint'}  onConfirm={onConfirm} children={hint} className2="border-8 bg-old-whiskey border-old-whiskey shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" className1="border-walnut border-8 m-4"/>}
      {secondPopUp && <Modal title={'play'} hint={""} onConfirm={() => setSecondPopUp(false)} className2="border-8 bg-old-whiskey border-old-whiskey shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" className1="border-walnut border-8 m-4">
        <Button className='shadow-2xl px-8 rounded-full border-4 my-4 border-ochre bg-walnut text-center mx-6' icon={undefined} text="Resume" onClick={() => { setIsPaused(false); isPausedRef.current = false; setSecondPopUp(false)} } />
        <Button className='shadow-2xl px-8 rounded-full border-4 border-ochre bg-walnut text-center mx-6' icon={undefined} text="Quit" onClick={resetGame} />
      </Modal>}
       {thirdPopUp && <Modal title="" onConfirm={() => {setThirdPopUp(false);} } className1="" className2="mt-8">
        <Congratulation title={"High Score"} score={score}/>
        <Fireworks/>
        <Button className='shadow-2xl pb-1 px-8 rounded-full border-4 my-8 border-ochre bg-walnut text-center mx-6 ' icon={undefined} text="Play Again" onClick={() => {setIsPaused(true); setSecondsLeft(0); setScore(0); setWord(""); setThirdPopUp(false)} } />
       </Modal>}
    </div>
  );
}

export default App;
