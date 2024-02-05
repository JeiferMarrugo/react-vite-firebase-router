import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import MenuSvg from "../assets/svgMenu";
import Equix from "../assets/Equix";
import Drow from "../assets/Drow";

const classNavLink =
  "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent border-b-2 text-gray-800";

const classLogout =
  "block py-2 px-3 text-red-500 rounded hover:bg-red-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-red-700 dark:hover:text-white md:dark:hover:bg-transparent";

const ulClass =
  "items-center justify-center space-y-2 font-bold md:flex md:space-x-6 md:space-y-0";

const buttonClass =
  "flex items-center justify-between w-full py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent";

const Navbar = () => {
  const { user, logOutUser } = useContext(UserContext);

  const [navbar, setNavBar] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const handleClickLogout = async () => {
    try {
      await logOutUser();
    } catch (error) {
      console.log(error.code);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="src\assets\logo_personal.png"
                className="h-12"
                alt="Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                JM STORE
              </span>
            </Link>

            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavBar(!navbar)}
              >
                {navbar ? <Equix /> : <MenuSvg />}
              </button>
            </div>
          </div>
        </div>

        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-3 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            {user ? (
              <>
                <ul className={ulClass}>
                  <NavLink to="/" className={classNavLink}>
                    Inicio
                  </NavLink>
                  <NavLink to="/perfil" className={classNavLink}>
                    Perfil
                  </NavLink>

                  <NavLink className={classNavLink}>
                    <div className="relative">
                      <button
                        id="dropdownNavbarLink"
                        onClick={toggleDropdown}
                        className={buttonClass}
                      >
                        Carrito de compras
                        <Drow />
                      </button>
                      <div
                        className={`dropdown-menu ${
                          isOpen ? "block" : "hidden"
                        } absolute right-0 mt-2 w-full md:w-auto`}
                      >
                        <ul
                          className="text-sm px-2 text-gray-700 dark:text-gray-400"
                          aria-labelledby="dropdownLargeButton"
                        >
                          <NavLink
                            to="/addProduct"
                            className="block px-2 py-2 border-b border-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Agregar Producto
                          </NavLink>

                          <NavLink
                            to="/Tienda"
                            className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Tienda
                          </NavLink>
                        </ul>
                      </div>
                    </div>
                  </NavLink>

                  <NavLink
                    onClick={handleClickLogout}
                    className={classLogout}
                    aria-current="page"
                  >
                    Cerrar Sesion
                  </NavLink>
                </ul>
              </>
            ) : (
              <h1 className="text-red-500 font-bold">Sesion Offline</h1>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
