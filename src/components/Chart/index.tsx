import { useEffect, useState } from "react";

import { PieChart, Pie, Cell, LabelList } from "recharts";
import { Label } from "../Label";

import { Statistics } from "../../types/Statistics";
import { Status } from "../../types/Status";
import { useAuth } from "../../hooks/Auth";

type StatisticsProps = {
  status: Status;
  count: number;
};

const Chart: React.FC = () => {
  const { api } = useAuth();

  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<Statistics[]>([]);

  const colors: any = {
    Aguardando: "#5636D3",
    Transporte: "#FF872C",
    Entregue: "#12A454",
    Extraviado: "#E83F5B",
  };

  useEffect(() => {
    const getStatistics = async () => {
      const { data } = await api.get<StatisticsProps[]>("statistics");

      let total = 0;
      data.map((item) => (total += item.count));

      const formatted: Statistics[] = data.map((item) => ({
        label: Status[item.status],
        value: item.count,
        percent: Math.round((item.count / total) * 100) + "%",
      }));

      setStatistics(formatted);
      setLoading(false);
    };

    getStatistics();
  }, []);

  return loading ? (
    <div className="shimmer-graphic"></div>
  ) : (
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
          {statistics.map((item, index) => (
            <Cell key={`cell-${index}`} fill={colors[item.label]} />
          ))}
          <LabelList dataKey="percent" position="inside" />
        </Pie>
      </PieChart>
      <div className="labels">
        {statistics.map((item, index) => (
          <Label
            title={item.label}
            value={item.value}
            color={colors[item.label]}
            key={item.label}
          />
        ))}
      </div>
    </>
  );
};

export { Chart };
