import React from 'react';

interface Props{
  isDanger: boolean,
  type: string,
  value: number
}
const DateTimeDisplay: React.FC<Props> = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
