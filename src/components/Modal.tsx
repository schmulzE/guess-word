import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const ModalContent: React.FC<Props> = ({ title, onConfirm, hint }) => {
  return (
    <Fragment>
      <div
        id="bottom-modal"
        data-modal-placement="bottom"
        tabIndex={-1}
        className="overflow-y-auto m-0 overflow-x-hidden fixed bottom-auto z-50 w-screen lg:w-screen justify-center items-center flex"
        aria-modal="true"
        role="dialog"
      >
        <div className="relative w-full max-w-md h-full md:h-auto">
          <div className="relative bg-ochre shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={onConfirm}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
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

            <div
              className={`py-3 px-6 rounded-t border-white ${
                title ? "border-b" : ""
              }`}
            >
              <h3 className="text-center font-bold text-white text-2xl dark:text-white font-kumbh-sans capitalize">
                {title}
              </h3>
            </div>

            <div className="p-6 text-center font-kumbh-sans text-lg text-white italic">
                "{hint}"
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
  hint: string
  onConfirm: any
}

const Modal: React.FC<Props> = (props) => {
  // console.log(props);
  const modalOption = (
    <ModalContent
      onConfirm={props.onConfirm}
      title={props.title}
      hint={props.hint}
    />
  );
  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} title={""} hint={""} />,
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
