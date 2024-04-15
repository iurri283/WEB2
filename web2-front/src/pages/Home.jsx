import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
import SideMenu from "../components/SideMenu";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { isLogado } = useContext(AuthContext);

  console.log("home: ", isLogado);

  return (
    <>
      {/* <ToastContainer /> */}
      {isLogado ? (
        <>
          <SideMenu />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
