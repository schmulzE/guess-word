import React, {Fragment} from 'react'

interface Props{
  icon?: JSX.Element,
  text: string,
  onClick: (event: any) => void,
  className: string
}

const button: React.FC<Props> = (Props) => {
  return (
    <Fragment>
    <button className={Props.className} onClick={Props.onClick}>
      {Props.icon} 
    <span className='text-xs uppercase tracking-wider'>{Props.text}</span>
    </button>
    </Fragment>
  )
}

export default button