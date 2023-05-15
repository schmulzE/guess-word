import { useEffect} from "react";

type IProps = {
    isPaused: boolean,
    secondsLeft: number,
    setSecondsLeft: React.Dispatch<React.SetStateAction<number>>
    secondsLeftRef:  React.MutableRefObject<number>
    isPausedRef: React.MutableRefObject<boolean>
}


const Timer:React.FC<IProps> = ({isPaused, secondsLeft, setSecondsLeft, secondsLeftRef, isPausedRef}) => {

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {

    secondsLeftRef.current = 2 * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return;
      }

      tick();
    },1000);

    return () => clearInterval(interval);
  }, []);


  const minutes = Math.floor(secondsLeft / 60);
  let seconds: any = secondsLeft % 60;
  if(seconds < 10) seconds = '0'+ seconds;

  return (
    <div>
      <div className={`text-2xl ${seconds < 10 ? 'text-red' : "" }`}> {minutes + ':' + seconds}</div>
    </div>
  );
}

export default Timer;