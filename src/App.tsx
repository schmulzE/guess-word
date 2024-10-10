import "./App.css";
import Menu from "./components/menu";
import Button from "./components/button";
import Modal from "./components/modal/modal";
import Input from "./components/input/input";
import Pomodoro from "./components/pomodoro";
import { FaArrowRight } from "react-icons/fa";
import { GiAlarmClock } from "react-icons/gi";
import { AiOutlineGift } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect, useMemo } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import AnimatedWord from "./components/animatedWord/animatedWord";
import ScoreAnimation from "./components/scoreAnimation/scoreAnimation";

function App() {
  // this is the word entered by the user
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  const [score, setScore] = useState(0);
  const [minutes, setMinutes] = useState(2); // Initial work time in minutes
  const [seconds, setSeconds] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hintPopUp, setHintPopUp] = useState(false);
  const [inputFlag, setInputFlag] = useState(false);
  const [menuPopUp, setMenuPopUp] = useState(false);
  const [enteredWord, setEnteredWord] = useState("");
  const [gameOverPopUp, setGameOverPopUp] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem('highScore');
    return savedHighScore ? parseInt(savedHighScore) : 0;
  });

  async function fetchUrbanDictionaryWords() {
    try {
      setLoading(true);
      const response = await fetch('https://api.urbandictionary.com/v0/random');
      const data = await response.json();
      const entries = data.list.filter((item: { word: { trim: () => { (): any; new(): any; length: number; }; }; }) => item.word.trim().length < 6);
  
      // Filter words with repeated characters or containing digits
      const filteredWords = entries.filter((entry: { word: string; }) => !hasSpecialCharacter(entry.word) && !hasDigits(entry.word));
  
      if (filteredWords.length > 0) {
        const selectedWord = filteredWords[0];
        setWord(selectedWord.word.toLowerCase());
        const hintWithoutWord = selectedWord.definition.replace(selectedWord.word, '');
        setHint(hintWithoutWord.toLowerCase());
        setLoading(false)
      } else {
        await fetchUrbanDictionaryWords(); // Recursive call
      }
    } catch (error) {
      console.error("Error fetching words from Urban Dictionary API:", error);
    }
  }
  
  useEffect(() => {
    localStorage.setItem('highScore', highScore.toString());
  }, [highScore]);

  const increaseScore = () => {
    const newScore = score + 1;
    setScore(newScore);

    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  //checks if fetched word cotains special characters
  const hasSpecialCharacter = (word: string) => /[^\w\s]/.test(word);

  //checks if fetched word cotains digits
  const hasDigits = (word: string) => /\d/.test(word);

  // shuffled words using Fisher-Yates shuffle algorithm
  const shuffleLetters = useMemo(() => {
    const shuffledArray = word.toUpperCase().split('');
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }, [word]);

  const checkAndReshuffleWord = () => {
    // Get the original word
    const originalWord = word.toUpperCase();
  
    // Get the shuffled word
    const shuffledWord = shuffleLetters;
  
    // Convert the shuffled word back to a string
    const shuffledWordString = shuffledWord.join('');
  
    // Check if the shuffled word is the same as the original word
    if (shuffledWordString === originalWord) {
      // Reshuffle the word
      const reshuffledArray = [...shuffledWord];
      for (let i = reshuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [reshuffledArray[i], reshuffledArray[j]] = [reshuffledArray[j], reshuffledArray[i]];
      }
      return reshuffledArray.join().replace(/[*,]/g, '');
    } else {
      // If the word is not the same, return the shuffled word
      return shuffledWord.join().replace(/[*,]/g, '');
    }
  };
  
  const newShuffledWord = useMemo(() => checkAndReshuffleWord(), [shuffleLetters]);

  const triggerAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000); // Reset after animation
  };

  const setScoreHandler = (compareWord: string) => {
    const trimmedExtWord = compareWord.trim();
    if (trimmedExtWord.length === 0 || word.trim().length === 0) {
      return;
    }
  
    if (trimmedExtWord === word) {
      setInputFlag(false);
      increaseScore();
      triggerAnimation();
      // Delay clearing the user's input by 500 milliseconds for visual effect
      setTimeout(() => {
        setEnteredWord("");
        fetchUrbanDictionaryWords();
      }, 500);
      console.log("Correct!");
    } else {
      // If the entered word is incorrect
      setTimeout(() => {
        setInputFlag(true);
        setEnteredWord("");
        fetchUrbanDictionaryWords();
      }, 500);
      console.log('Wrong');
      setInputFlag(false);
    }
  };
  

  const toggleGame = () => {
    setIsActive(!isActive);
  };

  const resetGame = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(2);
    setSeconds(0);
    setWord("");
    setHint("")
    setScore(0);
    setMenuPopUp(false);
    setGameOverPopUp(false);
  };

  const gameOver = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(2);
    setSeconds(0);
    setWord("");
    setHint("");
    setGameOverPopUp(true);
    setHintPopUp(false);
  }

  const restartGame = () => {
    resetGame();
    fetchUrbanDictionaryWords();
    toggleGame();
  }

  const resumeGame = () => {
    toggleGame();
    setMenuPopUp(false);
  }

  const menuButtons = [
    {
      class: "shadow-2xl px-8 pb-2 rounded-full border-4 my-4 border-ochre bg-walnut text-center",
      icon: undefined,
      text: "Resume",
      onclick: () => resumeGame(),
      textClass: "text-md pt-1 inline-block lg:text-lg uppercase tracking-wider"
    },
    {
      class: "shadow-2xl px-8 pb-2 rounded-full border-4 border-ochre bg-walnut text-center",
      icon: undefined,
      text: "Quit",
      onclick: () => resetGame(),
      textClass: "text-md pt-1 inline-block lg:text-lg uppercase tracking-wider"
    },
  ]

  const menuButtons2 = [
    {
      class: "shadow-2xl px-8 pb-2 font-Peralta font-bold rounded-full border-4 my-4 border-ochre bg-walnut text-center",
      icon: undefined,
      text: "restart",
      onclick: () => restartGame(),
      textClass: "text-md pt-1 inline-block lg:text-lg uppercase tracking-wider"
    },
    {
      class: "shadow-2xl font-Peralta px-8 pb-2 rounded-full border-4 border-ochre bg-walnut text-center",
      icon: undefined,
      text: "quit",
      onclick: () => resetGame(),
      textClass: "text-md pt-1 inline-block lg:text-lg uppercase tracking-wider"
    },
  ]



  useEffect(() => {
    if (enteredWord.length !== word.length) return;
    setScoreHandler(enteredWord);
  }, [enteredWord, word]);

  return (
    <div data-testid="game-board" className="px-auto mx-auto pb-9 bg-ochre text-neutral-100 h-screen min-h-screen font-kumbh-sans rounded-none">
      <div className="flex justify-between pt-3">
        <div className="flex m-3">
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
            gameOver={gameOver}
          />
        </div>
        <div className="flex m-3">
          <div className="text-2xl uppercase font-Peralta">score</div>
          <ScoreAnimation showAnimation={showAnimation}/>
          <div  data-testid="score" className="text-2xl bg-walnut px-4 rounded-lg ml-1 shadow-inner font-Peralta">{score}</div>
        </div>
      </div>
      <div className="border-4 border-old-whiskey m-2 bg-walnut rounded-xl p-3 h-72 flex items-center justify-center rubik-gemstones-regular">
        { word.length == 0 ? (<div className="text-old-whiskey p-4 font-black text-7xl uppercase rounded-md tracking-widest text-center">start game!</div>) : 
        <AnimatedWord word={newShuffledWord}/>
        }
      </div>
      <div className="flex justify-center pt-9 bg-ochre">
        <Button 
        hint={hint} 
        className='shadow-2xl w-14 h-14 rounded-full border-2 border-old-whiskey bg-walnut text-center mx-6' 
        icon={<AiOutlineGift className="w-7 h-7 ml-3 pt-1" />} 
        text="hint" 
        onClick={() => setHintPopUp(true)}
        btnTextClass="text-xs"
        aria-label="hint"
        data_testid="hint-button" 
        >
        </Button>
         {!isActive
          ? <Button 
          className='shadow-2xl w-14 h-14 rounded-full border-2 border-old-whiskey bg-walnut text-center mx-6' 
          icon={<BsPlayFill className="w-11 h-11 ml-1.5" />} 
          text="" 
          onClick={() => { toggleGame(); fetchUrbanDictionaryWords()} }
          btnTextClass="" 
          data_testid="play-button"
          />
          : <Button 
          className='shadow-2xl w-14 h-14 rounded-full border-2 border-old-whiskey bg-walnut text-center mx-6' 
          icon={<BsPauseFill className="w-11 h-11 ml-1" />} 
          text=""
          onClick={() => { toggleGame(); setMenuPopUp(true)} } 
          btnTextClass=""
          data_testid="play-pause-button"
           />}
        <Button
          className='shadow-2xl w-14 h-14 rounded-full border-2 border-old-whiskey bg-walnut text-center mx-6'
          text=""
          icon={<FaArrowRight className="w-8 h-8 ml-2.5"/>}
          onClick={fetchUrbanDictionaryWords}
          btnTextClass=""
          />
      </div>
      <div className="flex justify-center pt-9 bg-ochre">
        <Input
        wordCount={word.length}
        enteredWord={enteredWord}
        setEnteredWord={setEnteredWord}
        inputFlag={inputFlag}
        />
      </div>

      <Modal data_testid="hint-modal" open={hintPopUp} modalClass="w-96">
        <div className="border-8 bg-old-whiskey text-center border-old-whiskey shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] h-80  overflow-y-auto w-96">
          <button onClick={() => setHintPopUp(false)} className="border-ochre border-4 p-2 bg-walnut m-4 rounded-full absolute -top-8 -right-6 md:-right-6">
            <IoCloseSharp className="text-white md:text-lg text-md"/>
          </button>
          <span className="text-center inline-block py-1 px-8 absolute -top-3 right-[55px] md:right-32 lg:right-32 font-bold text-white text-xl font-Peralta uppercase tracking-wider border-4 border-ochre bg-walnut rounded-full">
            hint
          </span>
          <div className="px-5 py-10 text-xl text-white font-Peralta">{hint}</div>
        </div>
      </Modal>

      <Modal data_testid="menu-pop-up" open={menuPopUp} modalClass="w-80 rounded-xl lg:w-80 lg:rounded-xl md:w-96 h-fit">
        <Menu 
        toggleGame={toggleGame} 
        resetGame={resetGame} 
        setMenuPopUp={setMenuPopUp} 
        title={"play"} 
        titleClass={"absolute -top-3 right-[98px] md:right-32 lg:right-24 tracking-widest"}
        buttons={menuButtons}
        buttonContainerClass=''
        score={null}
        />
      </Modal>
      <Modal data_testid="game-over-modal" open={gameOverPopUp} modalClass="w-80 rounded-xl lg:w-96 lg:rounded-xl md:w-96 h-fit">
        <Menu 
        toggleGame={toggleGame} 
        resetGame={resetGame} 
        setMenuPopUp={setMenuPopUp} 
        title={highScore > score ? "score" : "highScore"} 
        titleClass={score > highScore ? 
          "absolute -top-3 right-[98px] md:right-32 lg:right-24" : 
          " absolute -top-3 right-20 md:right-28 lg:right-33"
        }
        buttons={menuButtons2}
        score={score}
        buttonContainerClass="flex justify-between items-center"
        />
      </Modal>
    </div>
  );
}

export default App;
