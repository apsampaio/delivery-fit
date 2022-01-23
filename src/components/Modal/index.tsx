import React, { useEffect, useState } from "react";
import "./styles.css";

import InformationSVG from "../../assets/Information.svg";
import StatusSVG from "../../assets/Status.svg";
import closeModalSVG from "../../assets/x.svg";

import { Details } from "../../types/Details";
import { Status } from "../../types/Steps";

import { api } from "../../services/api";
import axios from "axios";

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
  const [details, setDetails] = useState<Details | null>(null);
  const [info, setInfo] = useState<Zipcode | null>();
  const handleClick = (ev: React.MouseEvent<any>) => {
    ev.preventDefault();
    const element: any = ev.target;
    if (element.className === "modal-container") closeModal();
  };

  useEffect(() => {
    const getDetails = async (id: string) => {
      const { data } = await api.get<Details>("package/" + id);
      setDetails(data);

      const res = await axios.get<Zipcode>(
        `https://viacep.com.br/ws/${data.zipcode}/json/`
      );

      setInfo(res.data);
    };

    if (id) {
      getDetails(id);
    }
  }, []);

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
          src={closeModalSVG}
          alt="close"
          className="close-modal"
          onClick={closeModal}
        />
        <div className="information">
          <p className="title">
            <img src={InformationSVG} alt="information" />
            Dados
          </p>
          <p className="subtitle">DESTINATÁRIO</p>
          <p className="text">{details?.recipient}</p>

          <p className="subtitle">ENDEREÇO</p>
          <p className="text">
            {info?.logradouro}, {details?.houseNumber}
          </p>
          <p className="text">
            {info?.localidade}, {info?.uf}
          </p>
          <p className="text">{details?.zipcode}</p>
        </div>
        <div className="status">
          <p className="title">
            <img src={StatusSVG} alt="information" />
            Situação
          </p>
          <div className="situation-container">
            <div>
              <p className="subtitle">STATUS</p>
              <p className="text">{Status[details?.package.status || 0]}</p>
            </div>
            <div>
              <p className="subtitle">POSTADO EM</p>
              <p className="text">
                {details?.postedAt
                  ? formatDate(details?.postedAt)
                  : "--/--/----"}
              </p>
            </div>
            <div>
              <p className="subtitle">DATA DE RETIRADA</p>
              <p className="text">
                {details?.withdrawnAt
                  ? formatDate(details?.withdrawnAt)
                  : "--/--/----"}
              </p>
            </div>
            <div>
              <p className="subtitle">DATA DE ENTREGA</p>
              <p className="text">
                {details?.deliveredAt
                  ? formatDate(details?.deliveredAt)
                  : "--/--/----"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
