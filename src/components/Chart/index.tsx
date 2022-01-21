import { PieChart, Pie, Cell, LabelList } from "recharts";

import { Label } from "../Label";

import { Statistics } from "../../types/Statistics";

type Props = {
  statistics: Statistics[];
};

const Chart: React.FC<Props> = ({ statistics }) => {
  const colors = ["#5636D3", "#FF872C", "#12A454", "#E83F5B"];

  return (
    <>
      <PieChart width={300} height={250}>
        <Pie
          data={statistics}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          outerRadius={100}
        >
          {statistics.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
          <LabelList dataKey="percent" position="inside" />
        </Pie>
      </PieChart>
      <div className="labels">
        {statistics.map((item, index) => (
          <Label
            title={item.label}
            value={item.value}
            color={colors[index]}
            key={item.name}
          />
        ))}
      </div>
    </>
  );
};

export { Chart };
