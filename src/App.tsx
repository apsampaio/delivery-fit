import "./styles/global.css";
import "./styles/App.css";

import { useEffect, useState } from "react";

import { Card } from "./components/Card";
import { Label } from "./components/Label";

import { Steps } from "./types/Steps";
import { Package } from "./types/Package";

import { PieChart, Pie, Cell, LabelList } from "recharts";
import Logo from "./assets/Logo.svg";

type Statistics = {
  name: string;
  label: string;
  value: number;
  percent: string;
};

function App() {
  const [packages, setPackages] = useState<Package[]>([
    {
      id: "SOME",
      lastUpdate: new Date(),
      packageNumber: 1,
      step: Steps.waiting,
    },
  ]);
  const [statistics, setStatistics] = useState<Statistics[]>([]);

  useEffect(() => {
    const data: Omit<Statistics, "percent">[] = [
      {
        name: "waiting",
        label: "Aguardando",
        value: 12,
      },
      {
        name: "transporting",
        label: "Transporte",
        value: 7,
      },
      {
        name: "delivered",
        label: "Entregue",
        value: 5,
      },
      {
        name: "misplaced",
        label: "Extraviado",
        value: 1,
      },
    ];

    let total = 0;
    data.map((item) => (total += item.value));

    const formatted: Statistics[] = data.map((item) => ({
      ...item,
      percent: Math.round((item.value / total) * 100) + "%",
    }));

    setStatistics(formatted);
  }, []);

  const colors = ["#5636D3", "#FF872C", "#12A454", "#E83F5B"];

  return (
    <main className="container">
      <header>
        <img src={Logo} alt="logo" />
      </header>
      <h1>Pacotes</h1>
      <div className="cards">
        {packages.map((data) => (
          <Card data={data} key={data.id} />
        ))}
      </div>
      <h1>Estatísticas</h1>
      <div className="statistics-container">
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
      </div>
    </main>
  );
}

export default App;
