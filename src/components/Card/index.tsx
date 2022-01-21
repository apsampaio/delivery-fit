import "./styles.css";

import Package from "../../assets/Package.svg";
import Arrow from "../../assets/Arrow.svg";

import { StepProgress } from "../StepProgress";

const Card: React.FC = () => {
  return (
    <div className="card-container">
      <div className="head">
        <img src={Package} alt="package" />
        <strong>Pacote 01</strong>
        <p>01/07/2020</p>
      </div>
      <div className="status">
        <StepProgress />
      </div>
      <button className="details">
        <p>Detalhes</p>
        <img src={Arrow} alt="arrow" />
      </button>
    </div>
  );
};

export { Card };
