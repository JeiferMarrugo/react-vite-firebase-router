import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Title from "../components/Title";
import useFirestoreProduct from "../hooks/useFirestoreProduct";
import { useEffect, useState } from "react";
import numeral from "numeral";
import CarShop from "../assets/CarShop";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Tienda = () => {
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const navegate = useNavigate();

  const {
    productDataCar,
    setProductDataCar,
    productData,
    error,
    loading,
    getProductData,
  } = useFirestoreProduct();

  useEffect(() => {
    getProductData();
  }, []);

  const [active, setActive] = useState(false);

  const onAddProduct = (itemProductCar) => {
    if (productDataCar.find((item) => item.id === itemProductCar.id)) {
      const products = productDataCar.map((item) =>
        item.id === itemProductCar.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setTotal(total + itemProductCar.price * itemProductCar.quantity);
      setCountProducts(countProducts + itemProductCar.quantity);
      return setProductDataCar([...products]);
    }

    setTotal(total + itemProductCar.price * itemProductCar.quantity);
    setCountProducts(countProducts + itemProductCar.quantity);
    setProductDataCar([...productDataCar, itemProductCar]);
  };

  const onDeleteProduct = (itemProductCar) => {
    const results = productDataCar.filter(
      (item) => item.id !== itemProductCar.id
    );

    setTotal(total - itemProductCar.price * itemProductCar.quantity);
    setCountProducts(countProducts - itemProductCar.quantity);
    setProductDataCar(results);
  };

  const onCleanCart = () => {
    setProductDataCar([]);
    setTotal(0);
    setCountProducts(0);
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    const header = "FACTURA DE COMPRA";
    const logo = new Image();
    logo.src = "src/assets/logo_personal.png";
    doc.addImage(logo, "PNG", 10, 10, 50, 20);
    const columns = ["Nombre del Producto", "Cantidad", "Precio Unitario"];
    const data = productDataCar.map((item) => [
      item.productName,
      item.quantity,
      item.price,
    ]);

    const totalRow = ["Total", "", "", "", "", "", "", "", "", "", total];

    doc.text(header, 75, 20);

    doc.autoTable({ startY: 30, head: [columns], body: data });

    doc.autoTable({
      startY: doc.autoTable.previous.finalY,
      head: [["", "", "", "", "", "", "", "", "", "", "Total"]],
      body: [totalRow],
    });

    doc.save("Factura.pdf");
    navegate("/Scompra");
  };

  if (loading.getData) return <p>Loading....</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Title title="Todos Los Productos" />
      <div className="flex justify-end mb-3">
        <button
          type="button"
          className="relative justify-end items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3"
          onClick={() => setActive(!active)}
        >
          <CarShop />
          <span className="sr-only">Notifications</span>
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            {countProducts}
          </div>
        </button>

        <div
          className={`absolute mt-56 md:mt-56 md:mr-36 top-8 right-3 bg-white w-96 z-10 shadow-lg rounded-lg ${
            active ? "" : "hidden"
          }`}
        >
          <div className="flex items-center justify-between mb-4 mt-4 px-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Tus Productos - {countProducts}
            </h5>
            <Link
              to=""
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              onClick={onCleanCart}
            >
              Vaciar Carrito
            </Link>
          </div>

          {productDataCar.length ? (
            <>
              {productDataCar.map((itemProductCar) => (
                <div
                  className="w-full max-w-md py-2 bg-white border-b border-gray-500 sm:p-8 dark:bg-gray-800 dark:border-gray-700"
                  key={itemProductCar.id}
                >
                  <div className="flow-root">
                    <ul
                      role="list"
                      className="divide-y divide-gray-200 dark:divide-gray-700"
                    >
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <span className="font-normal text-base">
                              {itemProductCar.quantity}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              {itemProductCar.productName}
                            </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            $
                            {numeral(
                              itemProductCar.price.toLocaleString()
                            ).format(0.0)}{" "}
                          </div>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer ml-4 hover:text-red-500"
                            onClick={() => onDeleteProduct(itemProductCar)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="px-20 items-center text-center">
              El carrito está vacío
            </p>
          )}

          <div className="flex justify-center items-center py-4 gap-5">
            <h3>Total:</h3>
            <span className="text-2xl font-extrabold">${total}</span>
          </div>

          <div className="flex justify-center pb-4">
            <Button type="button" text="Generar Compra" onClick={generarPDF} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productData.map((itemProduct) => (
          <div
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            key={itemProduct.id}
          >
            <Link to={itemProduct.ImagenUrl}>
              <img
                className="p-8 rounded-t-lg w-full h-64 object-contain"
                src={itemProduct.ImagenUrl}
                alt="product image"
              />
            </Link>
            <div className="px-4 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
                {itemProduct.productName}
              </h5>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${numeral(itemProduct.price.toLocaleString()).format(0.0)}{" "}
                  <br />
                  <p className="text-sm font-normal text-gray-900 dark:text-white">
                    Inventario: {itemProduct.cantidad}
                  </p>
                </span>
              </div>
              <br />
              <div className="flex justify-end">
                <Button
                  type="button"
                  text="Add Carrito"
                  color="indigo"
                  onClick={() => onAddProduct(itemProduct)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tienda;
