
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Layout404 from "./routes/Layout404";
import { UserContext } from "./context/UserProvider";
import { useContext } from "react";
import LayoutContainerForm from "./context/LayoutContainerForm";
import Navbar from "./components/Navbar";

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<RequireAuth />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<Layout404 />} />
      </Routes>
    </>
  );
};

export default App;
