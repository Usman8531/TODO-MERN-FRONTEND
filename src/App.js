import "./App.scss";

import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Todos from "./pages/Todos";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <Todos />
      <ToastContainer />
    </>
  );
}

export default App;
