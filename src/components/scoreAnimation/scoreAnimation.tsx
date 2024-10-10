import React from 'react';
import './scoreAnimation.css'; // Make sure to create this CSS file

interface Props{
  showAnimation: boolean,
}

const ScoreAnimation: React.FC<Props> = ({ showAnimation }) => {

  return (
    <div className="container">
      {showAnimation && (
        <div className="score-animation text-green-300 text-xl md:text-2xl lg:text-4xl">+1</div>
      )}
    </div>
  );
};

export default ScoreAnimation;