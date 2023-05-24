import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const ModalContent: React.FC<Props> = ({ title, onConfirm, children, className1, className2 }) => {
  return (
    <Fragment>
      <div
        id="bottom-modal"
        data-modal-placement="bottom"
        tabIndex={-1}
        className=" m-0 overflow-hidden fixed top-32 right-10 z-50 w-4/5 lg:w-screen justify-center items-center flex "
        aria-modal="true"
        role="dialog"
      >
        <div className="relative w-full h-full md:h-auto">
          <div className={`${className1}`}>

          <div className={`relative ${className2} `}>
            <button
              type="button"
              className="absolute -top-6 -right-6 text-white border-4 border-ochre bg-walnut rounded-full hover:bg-gray-200 hover:text-gray-900 text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={onConfirm}
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
           
            <span className="text-center inline-block py-1 px-8 absolute -top-6 right-16 font-bold text-white text-xl dark:text-white font-kumbh-sans capitalize border-4 border-ochre bg-walnut rounded-full">
              {title}
            </span>
          
            <div className="p-6 text-center font-kumbh-sans text-lg text-white">
                {children}
            </div>
          </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
const Backdrop: React.FC<Props> = (props) => {
  return <div className={styles.backdrop} onClick={props.onConfirm}></div>;
};

interface Props{
  title: string,
  hint?: string
  onConfirm: any,
  children: React.ReactNode
  className1?: string,
  className2?: string
}

const Modal: React.FC<Props> = (props) => {
  // console.log(props);
  const modalOption = (
    <ModalContent
      onConfirm={props.onConfirm}
      title={props.title}
      className1={props.className1}
      className2={props.className2}
      children={props.children}
    />
  );
  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} title={""} hint={""} children={undefined} />,
        document.getElementById("backdrop")!
      )}
      {ReactDOM.createPortal(
        modalOption,
        document.getElementById("modal")!
      )}
    </div>
  );
};

export default Modal;
