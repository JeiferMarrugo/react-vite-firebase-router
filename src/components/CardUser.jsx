import { Link } from "react-router-dom";

const CardUser = () => {
  return (
    <>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full flex-shrink-0 px-4 pt-4">
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="src\assets\logo_personal.png"
            alt="Imagen de usuario"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Jeifer Marrugo
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Administrador
          </span>
          <div className="flex mt-4 md:mt-6">
            <Link to="/" className={styleLink}>
              Act. Imagen
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
