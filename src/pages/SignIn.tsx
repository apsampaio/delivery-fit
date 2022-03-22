import "../styles/SignIn.css";

import LogoWhite from "../assets/LogoWhite.svg";
import Username from "../assets/username.svg";
import Password from "../assets/password.svg";

import { FormEvent, useEffect, useState } from "react";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/Auth";
import { ToastPromise } from "../services/ToastPromise";

const SignIn: React.FC = () => {
  const { SignIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    username === "" || password === ""
      ? setIsButtonDisabled(true)
      : setIsButtonDisabled(false);
  }, [username, password]);

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    // FIXME success with 400 status

    try {
      await new ToastPromise().run({
        action: () => SignIn({ username, password }),
        pending: "Conectando com servidor...",
        success: "Login realizado com sucesso.",
      });
    } catch (error) {}
  };

  return (
    <main className="sign-in-container">
      <div className="content">
        <div className="animated-content">
          <img
            src="https://raw.githubusercontent.com/apsampaio/delivery-fit/main/src/assets/LogoWhite.svg"
            alt="Logo"
          />
          <form onSubmit={handleSubmit}>
            <p>
              Faça seu login para acompanhar entregas na plataforma
              <strong> DeliveryFIT</strong>
            </p>
            <Input
              placeholder="Nome de usuário"
              isPassword={false}
              onChange={({ target }) => setUsername(target.value)}
              value={username}
              minLength={5}
            >
              <img
                src="https://raw.githubusercontent.com/apsampaio/delivery-fit/main/src/assets/username.svg"
                alt="user-icon"
              />
            </Input>
            <Input
              placeholder="Senha"
              isPassword={true}
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              minLength={8}
            >
              <img
                src="https://raw.githubusercontent.com/apsampaio/delivery-fit/main/src/assets/password.svg"
                alt="password-icon"
              />
            </Input>
            <button disabled={isButtonDisabled} type="submit">
              Entrar
            </button>
          </form>
        </div>
        <p className="inspiration">
          Inspired by <strong>@tiagoluchtenberg</strong>
        </p>
      </div>
      <div className="background">
        <div className="inner"></div>
      </div>
    </main>
  );
};

export { SignIn };
