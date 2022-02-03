import { useEffect, useState } from "react";

import { Card } from "../components/Card";
import { Chart } from "../components/Chart";
import { Modal } from "../components/Modal";

import { Package } from "../types/Package";
import { Statistics } from "../types/Statistics";

import { api } from "../services/api";

import Logo from "../assets/Logo.svg";

import "../styles/Dashboard.css";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [statistics, setStatistics] = useState<Statistics[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const openModal = (id: string) => {
    setModalVisible(true);
    setSelectedPackage(id);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPackage(null);
  };

  useEffect(() => {
    const getPackages = async () => {
      const { data } = await api.get<Package[]>("package");
      setPackages(data);
    };

    getPackages();
  }, []);

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
            packages.map((data, index) => (
              <Card
                data={data}
                key={data.id}
                index={index + 1}
                openModal={openModal}
              />
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
      {modalVisible && <Modal closeModal={closeModal} id={selectedPackage} />}
    </>
  );
}

export { Dashboard };
