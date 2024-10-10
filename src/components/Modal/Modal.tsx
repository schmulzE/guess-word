import { ReactNode } from 'react';
import ReactDom from 'react-dom';
import './modal.css';

interface ModalProps {
  open: boolean;
  children: ReactNode;
  modalClass: string;
  data_testid?: string
}

export default function Modal({ open, children, modalClass, data_testid }: ModalProps) {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div className='overflow-y-hidden backdrop'/>
      <div data-testid={data_testid} className={modalClass + ' modal'}>
        {children}
      </div>
    </>,
    document.getElementById('portal')!
  )
}