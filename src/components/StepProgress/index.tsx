import "./styles.css";

import "./styles.css";

const StepProgress: React.FC = () => {
  return (
    <div className="progress-container">
      <ul className="progressbar">
        <li className="active">AGUARDANDO</li>
        <li>TRANSPORTE</li>
        <li>ENTREGUE</li>
      </ul>
    </div>
  );
};

export { StepProgress };
