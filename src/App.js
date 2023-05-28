import "./App.scss";

// bootstrap
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

// react toastify
import { ToastContainer } from "react-toastify";

// importing pages
import Routes from "./pages/Routes";
import { useEffect } from "react";
import axios from "axios";
import { Context, server } from "./index";
import { useContext } from "react";

function App() {
  const { setUser, setIsAuthenticated } = useContext(Context);

  useEffect(() => {
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        setUser({});
        setIsAuthenticated(false);
      });
  }, [setIsAuthenticated, setUser]);
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
}

export default App;
