import { useAuth } from "../hooks/Auth";
import { Dashboard } from "../pages/Dashboard";
import { SignIn } from "../pages/SignIn";

const Router: React.FC = () => {
  const { loggedIn } = useAuth();

  return loggedIn ? <Dashboard /> : <SignIn />;
};

export { Router };
