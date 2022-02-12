import "./styles.css";
import Todo from "./Components/Todo"
// import Modal from "./Components/Modal"
// import Backdrop from"./Components/Backdrop"

export default function App() {
  return (
    <div>
      <h1>Todo</h1>
      <Todo text="a"/>
      <Todo text="b"/>
      <Todo text="c"/>
      
    </div>
  );
}