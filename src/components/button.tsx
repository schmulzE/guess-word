import React, {Fragment} from 'react'

interface Props{
  icon?: JSX.Element,
  text: string,
  onClick: (event: any) => void,
  className: string,
  hint?: string,
  btnTextClass: string,
  pressed?: boolean,
  data_testid?: string,
  children?: React.ReactNode;
}

const button: React.FC<Props> = (props) => {
  return (
    <Fragment>
      <button data-testid={props.data_testid} aria-pressed={props.pressed} disabled={props.hint == ''} className={props.className} onClick={props.onClick}>
        {props.icon} 
        <span className={props.btnTextClass + ' font-Peralta'}>{props.text}</span>
      </button>
    </Fragment>
  )
}

export default button