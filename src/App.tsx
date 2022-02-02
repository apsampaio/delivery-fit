import { Dashboard } from "./pages/Dashboard";
import { AuthContextProvider } from "./hooks/Auth";

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Dashboard />
    </AuthContextProvider>
  );
};

export { App };
