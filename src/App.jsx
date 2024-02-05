import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import Register from "./routes/Register";
import Layout404 from "./routes/Layout404";
import { UserContext } from "./context/UserProvider";
import { useContext } from "react";
import LayoutContainerForm from "./layouts/LayoutContainerForm";
import Navbar from "./components/Navbar";
import LayoutRedirect from "./layouts/LayoutRedirect";
import AddProduct from "./routes/AddProduct";
import Tienda from "./routes/Tienda";
import Scompra from "./components/Scompra";

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return (
      <div className="d-flex align-items-center mt-2">
        <strong role="status">Loading...</strong>
        <div className="spinner-border ms-auto" aria-hidden="true"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<RequireAuth />}>
          <Route index element={<Home />} />
          <Route path="/Perfil" element={<Profile />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/Tienda" element={<Tienda />} />
          <Route path="/Scompra" element={<Scompra />} />
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
