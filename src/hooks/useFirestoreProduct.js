import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { nanoid } from "nanoid";

const useFirestoreProduct = () => {
  const [productData, setProductData] = useState([]);
  const [productDataCar, setProductDataCar] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({});

  useEffect(() => {
    console.log("getDataUser");
    getProductData();
  }, []);

  const getProductData = async () => {
    console.log(auth.currentUser);
    try {
      setLoading((prev) => ({ ...prev, getProductData: true }));
      const dataRef = collection(db, "product");
      const q = query(dataRef);
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => doc.data());
      setProductData(dataDB);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, getProductData: false }));
    }
  };

  const addProduct = async (productName, price, cantidad, ImagenUrl) => {
    try {
      setLoading((prev) => ({ ...prev, addProduct: true }));

      console.log(productName, price, cantidad, ImagenUrl);

      const newProduct = {
        id: nanoid(6),
        productName: productName,
        price: price,
        cantidad: cantidad,
        ImagenUrl: ImagenUrl,
        quantity: 1
      };
      const productDocRef = doc(db, "product", newProduct.id);
      await setDoc(productDocRef, newProduct);

      setProductData([...productData, newProduct]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, addProduct: false }));
    }
  };


  const searchDataUser = async (id) => {
    try {
      const docRef = doc(db, "user", id);
      const docSnap = await getDoc(docRef);
      return docSnap;
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return {
    productDataCar,
    setProductDataCar,
    setProductData,
    productData,
    error,
    loading,
    getProductData,
    addProduct,
    searchDataUser,
  };
};

export default useFirestoreProduct;
