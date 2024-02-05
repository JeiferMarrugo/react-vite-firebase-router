import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import Title from "../components/Title";
import { UserContext } from "../context/UserProvider";

const LayoutRedirect = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const { searchData } = useFirestore();
  const params = useParams();

  useEffect(() => {
    searchData(params.nanoid).then((res) => {
      if (res.exists()) {
        location.href = res.data().origin;
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (loading) return <Title title="Cargando redirección..." />;

  return <Outlet />;
};

export default LayoutRedirect;
