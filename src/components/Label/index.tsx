import "./styles.css";

type Props = {
  title: string;
  value: string | number;
  color: string;
};

const Label: React.FC<Props> = ({ title, value, color }) => {
  return (
    <div
      className="label-container"
      style={{
        borderLeftColor: color,
      }}
    >
      <p>{title}</p>
      <strong>{value}</strong>
    </div>
  );
};

export { Label };
