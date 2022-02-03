import "../styles/SignIn.css";

import LogoWhite from "../assets/LogoWhite.svg";
import Username from "../assets/username.svg";
import Password from "../assets/password.svg";
import Logistics from "../assets/Logistics.svg";

import { Input } from "../components/Input";

const SignIn: React.FC = () => {
  return (
    <main className="sign-in-container">
      <div className="content">
        <div className="animated-content">
          <img src={LogoWhite} alt="Logo" />
          <form action="">
            <p>
              Faça seu login para acompanhar entregas na plataforma
              <strong> DeliveryFIT</strong>
            </p>
            <Input placeholder="Nome de usuário" isPassword={false}>
              <img src={Username} alt="user-icon" />
            </Input>
            <Input placeholder="Senha" isPassword={true}>
              <img src={Password} alt="password-icon" />
            </Input>
            <button>Entrar</button>
          </form>
        </div>
      </div>
      <div className="background">
        <div className="inner"></div>
      </div>
    </main>
  );
};

export { SignIn };
