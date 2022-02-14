import "./styles.css";
import { Status } from "../../types/Status";

type Props = {
  step: Status;
};

const StepProgress: React.FC<Props> = ({ step }) => {
  return step === Status.Perdido ? (
    <div className="progress-container">
      <ul className="progressbar">
        <li className="misplaced hidden">AGUARDANDO</li>
        <li className="misplaced">PERDIDO</li>
        <li className="misplaced hidden">ENTREGUE</li>
      </ul>
    </div>
  ) : (
    <div className="progress-container">
      <ul className="progressbar">
        <li className={step >= 1 ? "active" : ""}>AGUARDANDO</li>
        <li className={step >= 2 ? "active" : ""}>TRANSPORTE</li>
        <li className={step === 3 ? "active" : ""}>ENTREGUE</li>
      </ul>
    </div>
  );
};

export { StepProgress };
