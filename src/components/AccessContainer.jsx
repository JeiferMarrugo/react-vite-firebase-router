import { Outlet } from "react-router-dom";

const AccessContainer = () => {
  return (
    <div className="w-96 mx-auto mt-20">
      <Outlet />
    </div>
  );
};

export default AccessContainer;
