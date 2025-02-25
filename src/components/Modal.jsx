import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
export default function Modal() {
    const [modalOpen, setModalOpen] = useState(false);
    const modalRef=useRef(null);
  return (
    <>
    <CSSTransition nodeRef={modalRef} in={modalOpen} timeout={500} classNames="modal">
    <div ref={modalRef}>
      Modal
    </div>
    </CSSTransition>
    <style>
        {`
        .modal-enter {
            opacity: 0;
        }
        .modal-enter-active {
            opacity: 1;
            transition: opacity 500ms;
        }
        .modal-exit {
            opacity: 1;
        }
        .modal-exit-active {
            opacity: 0;
            transition: opacity 500ms;
        }
        `}
    </style>
    </>
  )
}