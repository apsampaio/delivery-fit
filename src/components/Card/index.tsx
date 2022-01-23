import "./styles.css";

import PackageSVG from "../../assets/Package.svg";
import Arrow from "../../assets/Arrow.svg";

import { StepProgress } from "../StepProgress";
import { Package } from "../../types/Package";

type Props = {
  data: Package;
  openModal: () => void;
};

const Card: React.FC<Props> = ({ data, openModal }) => {
  const formattedData = Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(data.lastUpdate);

  const formattedNumber = data.packageNumber.toString().padStart(2, "0");

  return (
    <div className="card-container">
      <div className="head">
        <img src={PackageSVG} alt="package" />
        <strong>Pacote {formattedNumber}</strong>
        <p>{formattedData}</p>
      </div>
      <div className="status">
        <StepProgress step={data.step} />
      </div>
      <button className="details" onClick={openModal}>
        <p>Detalhes</p>
        <img src={Arrow} alt="arrow" />
      </button>
    </div>
  );
};

export { Card };
