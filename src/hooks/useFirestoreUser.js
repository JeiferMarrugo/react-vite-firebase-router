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

const useFirestoreUser = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({});

  useEffect(() => {
    console.log("getDataUser");
    getUserData();
  }, []);

  const getUserData = async () => {
    console.log(auth.currentUser);
    try {
      setLoading((prev) => ({ ...prev, getUserData: true }));
      const dataRef = collection(db, "user");
      const q = query(dataRef, where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => doc.data());
      setUserData(dataDB);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, getUserData: false }));
    }
  };

  const addUser = async (nameUser, email, cargo, lastname, number) => {
    try {
      setLoading((prev) => ({ ...prev, addUser: true }));

      console.log(nameUser, email, cargo, lastname, number);

      const newUser = {
        id: nanoid(6),
        nameUser: nameUser,
        cargo: cargo,
        email: email,
        lastname: lastname,
        number: number,
        state: true,
        uid: auth.currentUser.uid,
      };
      const userDocRef = doc(db, "user", newUser.id);
      await setDoc(userDocRef, newUser);

      setUserData([...userData, newUser]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, addUser: false }));
    }
  };

  const updateUser = async (id, [nameUser, lastname, number, email, cargo]) => {
    try {
      setLoading((prev) => ({ ...prev, updateUser: true }));
      const docRef = doc(db, "user", id);
      await updateDoc(docRef, {
        nameUser: nameUser,
        lastname: lastname,
        number: number,
        email: email,
        cargo: cargo,
      });
      setUserData(
        userData.map((item) =>
          item.id === id
            ? {
                ...item,
                nameUser: nameUser,
                lastname: lastname,
                number: number,
                email: email,
                cargo: cargo,
              }
            : item
        )
      );
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, updateUser: false }));
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
    userData,
    error,
    loading,
    getUserData,
    addUser,
    updateUser,
    searchDataUser,
  };
};

export default useFirestoreUser;
