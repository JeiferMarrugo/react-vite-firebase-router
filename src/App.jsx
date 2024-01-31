import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./routes/Login";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";
import Register from "./routes/Register";
import AccessContainer from "./components/AccessContainer";

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return (
      <div className="d-flex align-items-center mt-3">
        <strong role="status">Cargando Contenido...</strong>
        <div className="spinner-border ms-auto" aria-hidden="true"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AccessContainer />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
