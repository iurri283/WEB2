import { AuthProvider } from "./context/authContext";
import { MyRouter } from "./routes";

function App() {
  return (
    <>
      <AuthProvider>
        <MyRouter />
      </AuthProvider>
    </>
  );
}

export default App;
