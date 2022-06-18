import "./App.css";
import Modal1 from "./components/Modal1";
import Modal2 from "./components/Modal2";
import Modal3 from "./components/Modal3";
import modalManager from "./utils/modal-manager";
function App() {
  const modalManagerIns = modalManager();
  return (
    <div className="App">
      <Modal1 modalManager={modalManagerIns} defaultValue={true} />
      <Modal2 modalManager={modalManagerIns} defaultValue={true} />
      <Modal3 modalManager={modalManagerIns} defaultValue={true} />
    </div>
  );
}

export default App;
