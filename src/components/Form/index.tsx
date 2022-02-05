import { FormEvent, useState } from "react";

import { Input } from "../Input";

import User from "../../assets/username.svg";
import House from "../../assets/house.svg";
import Map from "../../assets/map.svg";

import { ToastPromise } from "../../services/ToastPromise";
import { useAuth } from "../../hooks/Auth";

import "./styles.css";

type FormProps = {
  closeDrawer: () => void;
};

const Form: React.FC<FormProps> = ({ closeDrawer }) => {
  const { api } = useAuth();

  const [recipient, setRecipient] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [zipcode, setZipcode] = useState("");

  const handleAction = async (ev: FormEvent) => {
    ev.preventDefault();
    try {
      await new ToastPromise().run({
        action: () =>
          api.post("package", {
            recipient,
            houseNumber,
            zipcode,
          }),
        pending: "Criando novo pacote...",
        success: "Pacote criado com sucesso!",
      });

      closeDrawer();
    } catch (error) {}
  };

  return (
    <div className="form-component-container">
      <form onSubmit={handleAction}>
        <h1>Criar novo pacote</h1>
        <Input
          placeholder="Nome do remetente"
          isPassword={false}
          onChange={({ target }) => setRecipient(target.value)}
          value={recipient}
          minLength={5}
          required
        >
          <img src={User} alt="user-icon" />
        </Input>
        <Input
          type="number"
          placeholder="CEP"
          isPassword={false}
          onChange={({ target }) => setZipcode(target.value)}
          value={zipcode}
          min={1}
          required
        >
          <img src={Map} alt="map-icon" />
        </Input>
        <Input
          type="number"
          placeholder="Numero da residência"
          isPassword={false}
          onChange={({ target }) => setHouseNumber(target.value)}
          value={houseNumber}
          min={1}
          required
        >
          <img src={House} alt="house-icon" />
        </Input>

        <button disabled={false} type="submit">
          Criar
        </button>
      </form>
    </div>
  );
};

export { Form };
