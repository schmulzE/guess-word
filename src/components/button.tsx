import React, {Fragment} from 'react'

interface Props{
  icon?: JSX.Element,
  text: string,
  onClick: (event: any) => void,
  className: string,
  hint?: string,
}

const button: React.FC<Props> = (props) => {
  return (
    <Fragment>
    <button disabled={props.hint == ''} className={props.className} onClick={props.onClick}>
      {props.icon} 
    <span className='text-xs lg:text-md uppercase tracking-wider'>{props.text}</span>
    </button>
    </Fragment>
  )
}

export default button