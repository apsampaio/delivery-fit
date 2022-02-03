import { AuthContextProvider } from "./hooks/Auth";
import { Dashboard } from "./pages/Dashboard";
import { SignIn } from "./pages/SignIn";

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <SignIn />
    </AuthContextProvider>
  );
};

export { App };
