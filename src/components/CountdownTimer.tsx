import React, {useState, useEffect} from 'react'

interface Props {
  runTimer: boolean
}
const CountdownTimer: React.FC<Props> = ({runTimer}) => {
  const [countDown, setCountDown] = useState<number>(0);


  useEffect(() => {
    let timerId: number | undefined;

    if (runTimer) {
      setCountDown(60 * 2);
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      console.log("expired");
      setCountDown(0);
    }
  }, [countDown, runTimer]);

  

  const seconds = String(countDown % 60).padStart(2, "0");
  const minutes = String(Math.floor(countDown / 60)).padStart(2, "0");

  return (
    <div className="App">
      <span className='text-2xl'>
         {minutes}:{seconds}
      </span>
    </div>
  );
}

export default CountdownTimer