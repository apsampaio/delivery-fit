import "./styles.css";
import { Steps } from "../../types/Steps";

type Props = {
  step: Steps;
};

const StepProgress: React.FC<Props> = ({ step }) => {
  return step === Steps.misplaced ? (
    <div className="progress-container">
      <ul className="progressbar">
        <li className="misplaced hidden">AGUARDANDO</li>
        <li className="misplaced">EXTRAVIADO</li>
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
