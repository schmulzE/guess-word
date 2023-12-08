import { ReactNode } from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed' as 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed' as 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({ open, children }: {open: boolean, children: ReactNode}) {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES}  className='overflow-y-hidden'/>
      <div style={MODAL_STYLES} className='w-full md:w-3/4 h-fit'>
        {children}
      </div>
    </>,
    document.getElementById('portal')!
  )
}
