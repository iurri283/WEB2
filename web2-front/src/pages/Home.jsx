import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Home() {
  const { isLogado, clearToken } = useContext(AuthContext);

  console.log("home: ", isLogado);

  return (
    <>
      <Button onClick={clearToken}>Sign out</Button>
    </>
  );
}
