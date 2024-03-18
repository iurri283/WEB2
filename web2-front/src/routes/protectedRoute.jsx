import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
  //const { user } = useAuthContext();
  const token = localStorage.getItem("token");
  //se o login não der certo, volta pra tela de login ao invés de ir pra tela home
  //console.log("token: ", token);
  if (!token) {
    //console.log("entrou");
    return <Navigate to="/login" replace />;
  }
  //console.log("Children: ", children);
  return children;
};
