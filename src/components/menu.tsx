import React, { Dispatch } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import Button from './button';

  interface IButton {
    onclick: () => void;
    class: string;
    icon: JSX.Element | undefined;
    text: string;
    textClass: string;
  }

interface Props{
  toggleGame: (event: any) => void,
  resetGame: (event: any) => void,
  setMenuPopUp: Dispatch<React.SetStateAction<boolean>>,
  title: string
  score: number | null,
  titleClass: string
  buttons: IButton[]
  buttonContainerClass: string
}

const Menu : React.FC<Props> = ({ setMenuPopUp, title, titleClass, score, buttons, buttonContainerClass }) => {

  return (
    <div className="border-8 bounce bg-old-whiskey font-Peralta rounded-xl border-old-whiskey shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] h-fit">
      <button
        onClick={() => setMenuPopUp(false)}
        className="border-ochre border-4 p-2 bg-walnut m-4 rounded-full absolute -top-8 -right-6 md:-right-6"
      >
        <IoCloseSharp className="text-white md:text-lg text-md" />
      </button>
      <span className={titleClass + " font-bold text-white text-xl text-center inline-block py-1 px-8 uppercase border-4 border-ochre bg-walnut rounded-full"}>{title}</span>
       {score! >= 0 || score !== null ? <div className="px-5 text-center mt-8 text-7xl text-walnut font-semibold font-Peralta">{score}</div> : null}
      <div className={ buttonContainerClass + " px-5 text-center py-10 text-xl text-white"}>
        {buttons.map((button, index) => (
          <Button 
          key={index} 
          className={button.class} 
          text={button.text} 
          onClick={button.onclick} 
          btnTextClass={button.textClass}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;