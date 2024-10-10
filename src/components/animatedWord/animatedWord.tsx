import React, { useState, useEffect } from 'react';
import './animatedWord.css';

type AnimationType = 'stagger' | 'fadeIn' | 'popUp' | 'rotateIn' | 'slideIn';

interface AnimatedWordProps {
  word: string;
}

const AnimatedWord: React.FC<AnimatedWordProps> = ({ word }) => {
  const [animation, setAnimation] = useState<AnimationType>('stagger');

  useEffect(() => {
    const animations: AnimationType[] = ['stagger', 'fadeIn', 'popUp', 'rotateIn', 'slideIn'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    setAnimation(randomAnimation);
  }, [word]);

  if (!word) return null; // Return null for empty string

  return (
    <div className={`animated-word ${animation} flex space-x-4 rubik-gemstones-regular`}>
      {word.split('').map((char, index) => (
        <span 
        className="text-old-whiskey font-black text-3xl lg:text-7xl uppercase rounded-md " 
        key={index} 
        style={{ animationDelay: `${index * 0.1}s` }}
        data-testid="animated-char"
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default AnimatedWord;