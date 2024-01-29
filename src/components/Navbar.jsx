import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const { user, signOut } = useContext(UserContext);

  return (
    <>
      <NavLink to="/">Inicio</NavLink>
      {user ? (
        <button onClick={signOut}>Cerrar Sesión</button>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </>
  );
};

export default Navbar;
