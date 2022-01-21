import "./styles.css";

import InformationSVG from "../../assets/Information.svg";
import StatusSVG from "../../assets/Status.svg";

const Modal: React.FC = () => {
  return (
    <div className="modal-container">
      <div className="modal-box">
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
