import React, {Fragment, useState, useRef, useEffect} from 'react'

interface Props {
  presentWord: string,
  setScoreHandler: (event: any) => void
}

let currentInputIndex: number = 0
const Input: React.FC<Props> = ({ presentWord, setScoreHandler}) => {

  const [words, setWords] = useState<string>('')
  const [activeInputIndex, setActiveInputIndex] = useState<number>(0) 
  const inputBox = presentWord.split('')

  const inputRef = useRef<HTMLInputElement>(null)


  const appendWord = (e:  React.ChangeEvent<HTMLInputElement>) => {
    let newWords = words.split('');
    const { value }  = e.target
    newWords[currentInputIndex] = value;
    setWords(newWords.join(''));
    if(!value) setActiveInputIndex(currentInputIndex - 1)
    else setActiveInputIndex(currentInputIndex + 1)
    console.log(value)
  }

    const handleKeyDown = ({key}: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    currentInputIndex = index
    if(key === 'Backspace') setActiveInputIndex(currentInputIndex - 1)
  }
  
  useEffect(() => {
    // console.log(words)
    const identifier = setTimeout(() => {
      setScoreHandler(words)
    }, 700);
    inputRef.current?.focus()
    return () =>{ 
      console.log('cleared!!!')
      clearTimeout(identifier)
    }
  }, [words, activeInputIndex])
  


  const style: React.CSSProperties = {
    MozBoxShadow :  "inset 0 0 10px #000000",
    WebkitBoxShadow : "inset 0 0 10px #000000",
    boxShadow :  "inset 0 0 10px #000000",
    textTransform: "capitalize",
    caretColor: "transparent",
  }
  return (
    <Fragment>
      {inputBox.map((text, index) => (
        <input style={style} ref={index === activeInputIndex ? inputRef : null} value={words[index]} key={index} maxLength={1} onChange={appendWord} onKeyDown={e => handleKeyDown(e, index)} className='w-11 h-20 bg-walnut text-center text-3xl rounded-lg ml-3 shadow-inner-lg'/>
      ))}
    </Fragment>
  )
}

export default Input