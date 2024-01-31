import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Layout404 from "./routes/Layout404";
import { UserContext } from "./context/UserProvider";
import { useContext } from "react";
import LayoutContainerForm from "./layouts/LayoutContainerForm";
import Navbar from "./components/Navbar";
import LayoutRedirect from "./layouts/LayoutRedirect";

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
          <Route path="Perfil">{}</Route>
        </Route>

        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/:nanoid" element={<LayoutRedirect />}>
          <Route index element={<Layout404 />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
