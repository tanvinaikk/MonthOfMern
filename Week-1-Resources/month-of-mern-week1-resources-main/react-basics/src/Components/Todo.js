import { useState } from "react";
import Modal from "./Modal";
import Backdrop from "./Backdrop";

let Todo = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [backdropIsOpen, setBackdropIsOpen] = useState(false);
  function deleteHandler() {
    // console.log(props.text)
    setModalIsOpen(true);
    setBackdropIsOpen(true);
  }
  function closeModalHandler(){
    setModalIsOpen(false);
    setBackdropIsOpen(false);
  }

  return (
    <div className="card">
      <h2>{props.text}</h2>
      <div className="actions">
        <button className="btn" onClick={deleteHandler}>
          delete
        </button>
      </div>
      {modalIsOpen ? <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler}/> : null}
      {backdropIsOpen ? <Backdrop onClick={closeModalHandler}/> : null}
    </div>
  );
};
export default Todo;
