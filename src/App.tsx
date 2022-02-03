import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./hooks/Auth";
import { Router } from "./routes";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable
        rtl={false}
      />
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </>
  );
};

export { App };
