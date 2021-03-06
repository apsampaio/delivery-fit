import React, { useEffect, useState } from "react";
import "./styles.css";

import InformationSVG from "../../assets/Information.svg";
import StatusSVG from "../../assets/Status.svg";
import closeModalSVG from "../../assets/x.svg";

import { Details } from "../../types/Details";
import { Status } from "../../types/Status";
import { useAuth } from "../../hooks/Auth";

import axios from "axios";
import { ToastPromise } from "../../services/ToastPromise";

type Zipcode = {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

type Props = {
  closeModal: () => void;
  id: string | null;
};

const Modal: React.FC<Props> = ({ closeModal, id }) => {
  const { api } = useAuth();
  const [details, setDetails] = useState<Details | null>(null);
  const [info, setInfo] = useState<Zipcode | null>();
  const [loading, setLoading] = useState(true);

  const handleClick = (ev: React.MouseEvent<any>) => {
    ev.preventDefault();
    const element: any = ev.target;
    if (element.className === "modal-container") closeModal();
  };

  useEffect(() => {
    const getDetails = async (id: string) => {
      const { data } = await api.get<Details>("package/details/" + id);
      setDetails(data);

      const res = await axios.get<Zipcode>(
        `https://viacep.com.br/ws/${data.zipcode}/json/`
      );

      setInfo(res.data);
      setLoading(false);
    };

    if (id) {
      getDetails(id);
    }
  }, []);

  const handleMisplaced = async () => {
    try {
      await new ToastPromise().run({
        action: () => api.patch("package/misplaced/" + id, {}),
        pending: "Enviando notificação...",
        success: "Notificação enviada.",
      });
    } catch (error) {}
  };

  const handleUpdateStatus = async () => {
    try {
      await new ToastPromise().run({
        action: () => api.patch("/package/status/" + id, {}),
        pending: "Atualizando pacote...",
        success: "Pacote atualizado.",
      });
    } catch (error) {}
  };

  const formatDate = (date: Date) =>
    Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

  return (
    <div className="modal-container" onClick={handleClick}>
      <div className="modal-box">
        <img
          src="https://raw.githubusercontent.com/apsampaio/delivery-fit/main/src/assets/x.svg"
          alt="close"
          className="close-modal"
          onClick={closeModal}
        />
        <div className="information">
          <p className="title">
            <img
              src="https://raw.githubusercontent.com/apsampaio/delivery-fit/main/src/assets/Information.svg"
              alt="information"
            />
            Dados
          </p>

          <p className="subtitle">POSTADO POR</p>
          <p className={`text ${loading && "shimmer"}`}>
            {details?.package.createdBy}
          </p>

          <p className="subtitle">DESTINATÁRIO</p>
          <p className={`text ${loading && "shimmer"}`}>{details?.recipient}</p>

          <p className="subtitle">ENDEREÇO</p>
          <p className={`text ${loading && "shimmer"}`}>
            {info?.logradouro}, {details?.houseNumber}
          </p>
          <p className={`text ${loading && "shimmer"}`}>
            {info?.localidade}, {info?.uf}
          </p>
          <p className={`text ${loading && "shimmer"}`}>{details?.zipcode}</p>

          <p className="subtitle">IDENTIFICADOR</p>
          <p className={`text ${loading && "shimmer"}`}>
            {details?.package.id}
          </p>
        </div>
        <div className="status">
          <p className="title">
            <img
              src="https://raw.githubusercontent.com/apsampaio/delivery-fit/main/src/assets/Status.svg"
              alt="information"
            />
            Situação
          </p>
          <div className="situation-container">
            <div>
              <p className="subtitle">STATUS</p>
              <p className={`text ${loading && "shimmer"}`}>
                {Status[details?.package.status || 0]}
              </p>
            </div>
            <div>
              <p className="subtitle">POSTADO EM</p>
              <p className={`text ${loading && "shimmer"}`}>
                {details?.postedAt
                  ? formatDate(details?.postedAt)
                  : "--/--/---- --:--"}
              </p>
            </div>
            <div>
              <p className="subtitle">DATA DE RETIRADA</p>
              <p className={`text ${loading && "shimmer"}`}>
                {details?.withdrawnAt
                  ? formatDate(details?.withdrawnAt)
                  : "--/--/---- --:--"}
              </p>
            </div>
            <div>
              <p className="subtitle">DATA DE ENTREGA</p>
              <p className={`text ${loading && "shimmer"}`}>
                {details?.deliveredAt
                  ? formatDate(details?.deliveredAt)
                  : "--/--/---- --:--"}
              </p>
            </div>
          </div>
          <button className="update-button" onClick={handleUpdateStatus}>
            ATUALIZAR STATUS
          </button>
          <button className="misplaced-button" onClick={handleMisplaced}>
            NOTIFICAR PERDIDO
          </button>
        </div>
      </div>
    </div>
  );
};

export { Modal };
