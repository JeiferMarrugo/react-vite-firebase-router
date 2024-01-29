import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, signIn, signOut } = useContext(UserContext);

  const Navigate = useNavigate()

  const handleClickLogin = () => {
    signIn()
    Navigate("/")
  }

  return (
    <>
      <h1>Login</h1>
      <h2>{user ? "Conectado" : "Desconectado"}</h2>
      {user ? (
        <button className="btn btn-danger" onClick={signOut}>
          Cerrar Sesion
        </button>
      ) : (
        <button className="btn btn-primary" onClick={handleClickLogin}>
          Iniciar Sesion
        </button>
      )}
    </>
  );
};

export default Login;
