import "./styles.css";

import InformationSVG from "../../assets/Information.svg";
import StatusSVG from "../../assets/Status.svg";
import closeModalSVG from "../../assets/x.svg";

import React from "react";

type Props = {
  closeModal: () => void;
};

const Modal: React.FC<Props> = ({ closeModal }) => {
  const handleClick = (ev: React.MouseEvent<any>) => {
    ev.preventDefault();
    const element: any = ev.target;
    if (element.className === "modal-container") closeModal();
  };

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
          <p className="text">André Sampaio</p>

          <p className="subtitle">ENDEREÇO</p>
          <p className="text">Rua Guilherme Gemballa, 260</p>
          <p className="text">Sorocaba, SP</p>
          <p className="text">18080-300</p>
        </div>
        <div className="status">
          <p className="title">
            <img src={StatusSVG} alt="information" />
            Situação
          </p>
          <div className="situation-container">
            <div>
              <p className="subtitle">STATUS</p>
              <p className="text">Transporte</p>
            </div>
            <div>
              <p className="subtitle">POSTADO EM</p>
              <p className="text">01/07/2020</p>
            </div>
            <div>
              <p className="subtitle">DATA DE RETIRADA</p>
              <p className="text">05/07/2020</p>
            </div>
            <div>
              <p className="subtitle">DATA DE ENTREGA</p>
              <p className="text">--/--/----</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
