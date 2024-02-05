import { Link } from "react-router-dom";
import Title from "./Title";

const Scompra = () => {
  return (
    <>
      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          GRACIAS POR TU COMPRA!
        </h5>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Gracias por adquirir nuestros productos. Esperamos que tu experiencia
          con nosotros sea extraordinaria
        </p>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Contactate Con nosotros para terminar tu solitud de compra
        </p>
        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
          <Link
            to="/tienda"
            className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          >
            <div className="text-left rtl:text-right">
              <div className="-mt-1 font-sans text-sm font-semibold">
                Volver a comprar
              </div>
            </div>
          </Link>
          <Link
            to="https://web.whatsapp.com/"
            className="w-full sm:w-auto bg-lime-600 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          >
            <div className="text-left rtl:text-right">
              <div className="-mt-1 font-sans text-sm font-semibold">
                Whatsaap
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Scompra;
