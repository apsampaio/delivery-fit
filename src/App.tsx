import "./styles/global.css";
import "./styles/App.css";

import { useEffect, useState } from "react";

import { Card } from "./components/Card";
import { Chart } from "./components/Chart";
import { Modal } from "./components/Modal";

import { Steps } from "./types/Steps";
import { Package } from "./types/Package";
import { Statistics } from "./types/Statistics";

import Logo from "./assets/Logo.svg";

function App() {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [packages, setPackages] = useState<Package[]>([
    {
      id: "SOME",
      lastUpdate: new Date(),
      packageNumber: 1,
      step: Steps.waiting,
    },
  ]);
  const [statistics, setStatistics] = useState<Statistics[]>([]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

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

    setTimeout(() => setLoading(false), 5000);
  }, []);

  return (
    <>
      <main className="container">
        <header>
          <img src={Logo} alt="logo" />
        </header>
        <h1>Pacotes</h1>
        <div className="cards">
          {loading ? (
            <>
              <div className="shimmer-card"></div>
              <div className="shimmer-card"></div>
              <div className="shimmer-card"></div>
              <div className="shimmer-card"></div>
            </>
          ) : (
            packages.map((data) => (
              <Card data={data} key={data.id} openModal={openModal} />
            ))
          )}
        </div>
        <h1>Estatísticas</h1>
        <div className="statistics-container">
          {loading ? (
            <div className="shimmer-graphic"></div>
          ) : (
            <Chart statistics={statistics} />
          )}
        </div>
      </main>
      {modalVisible && <Modal closeModal={closeModal} />}
    </>
  );
}

export default App;
