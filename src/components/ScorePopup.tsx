const ScorePopup = ({ score, isHighScore }: {score: number, isHighScore: boolean}) => {
  return (
    <div className="score-popup">
      <h2>{isHighScore ? 'New High Score!' : 'New Score'}</h2>
      <p>{`Score: ${score}`}</p>
    </div>
  );
};

export default ScorePopup