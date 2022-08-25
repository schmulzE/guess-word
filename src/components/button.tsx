import React, {Fragment} from 'react'

interface Props{
  icon: JSX.Element,
  onClick: (event: any) => void
}

const button: React.FC<Props> = (Props) => {
  return (
    <Fragment>
    <button className='shadow-2xl w-14 h-14 rounded-full border-2 border-old-whiskey bg-walnut text-center mx-6' onClick={Props.onClick}>{Props.icon}</button>
    </Fragment>
  )
}

export default button