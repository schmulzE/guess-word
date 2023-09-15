import React, { useEffect } from 'react';


type IProps = {
  isActive: boolean,
  isBreak: boolean,
  minutes: number,
  seconds: number,
  setMinutes: React.Dispatch<React.SetStateAction<number>>
  setSeconds: React.Dispatch<React.SetStateAction<number>>
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  setIsBreak: React.Dispatch<React.SetStateAction<boolean>>
}

const PomodoroTimer: React.FC<IProps>  = ({isActive, setIsActive, minutes, setMinutes, seconds, setSeconds, isBreak, setIsBreak}) => {

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer is complete, switch between work and break
            setIsBreak(!isBreak);
            setMinutes(isBreak ? 25 : 5); // Set work or break time
          } else {
            // Decrease minutes and reset seconds
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          // Decrease seconds
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup the interval

  }, [isActive, minutes, seconds, isBreak]);

  return (
    <div className="pomodoro-timer">
      <div className="timer text-2xl">
        {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
      </div>
      <div className="controls">
      </div>
    </div>
  );
};

export default PomodoroTimer;
