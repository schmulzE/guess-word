import React, { useEffect, useRef, useState } from "react";
import './input.css';

interface NewInputProps {
  inputFlag: boolean;
  wordCount: number;
  enteredWord: string;
  setEnteredWord: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<NewInputProps> = ({ wordCount, enteredWord, setEnteredWord, inputFlag }) => {
  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = e.target.value;
    if (!enteredValue) {
      setEnteredWord((state) => state.slice(0, -1));
    } else {
      setEnteredWord((state) => state + enteredValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    const activeInput = inputsRef.current[idx];
    if (!activeInput) return;

    if (activeInput.value.length === 1 && e.key !== "Backspace") {
      if (activeInputIndex < wordCount - 1) {
        setActiveInputIndex(activeInputIndex + 1);
      }
    }

    if (e.key === "Backspace" || e.key === "ArrowLeft") {
      if (activeInputIndex > 0) {
        setActiveInputIndex(activeInputIndex - 1);
      }
    }
  };


  useEffect(() => {
    inputsRef.current[activeInputIndex]?.focus();
  }, [activeInputIndex]);

  useEffect(() => {
    if (!enteredWord.length) {
      setActiveInputIndex(0);
    }
  }, [enteredWord]);

  const style: React.CSSProperties = {
    MozBoxShadow: "inset 0 0 10px #000000",
    WebkitBoxShadow: "inset 0 0 10px #000000",
    boxShadow: "inset 0 0 10px #000000",
    textTransform: "capitalize",
    caretColor: "transparent",
  };

  return (
    <>
      {[...Array(wordCount).keys()].map((i) => (
        <input
          ref={(el) => (inputsRef.current[i] = el)}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            handleKeyDown(e, i);
          }}
          value={enteredWord.charAt(i)}
          style={style}
          key={i}
          maxLength={1}
          autoFocus={i === 0}
          className={(inputFlag ? 'shake-animation ' : null) + " w-11 h-20 bg-walnut text-center text-3xl rounded-lg ml-3 shadow-inner-lg font-Peralta"}
        />
      ))}
    </>
  );
};

export default Input;
