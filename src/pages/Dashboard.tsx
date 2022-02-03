import { useEffect, useState } from "react";

import { Card } from "../components/Card";
import { Chart } from "../components/Chart";
import { Modal } from "../components/Modal";

import { Package } from "../types/Package";
import { Statistics } from "../types/Statistics";

import { api } from "../services/api";
import { toast } from "react-toastify";

import Logo from "../assets/Logo.svg";

import "../styles/Dashboard.css";

//FIXME

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [loadingCards, setLoadingCards] = useState(true);
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
      const response = await api.get<Package[]>("package");
      if (response.status !== 200) throw new Error();

      setLoadingCards(false);
      setPackages(response.data);
    };

    const Promisify = async () => {
      await toast.promise(getPackages, {
        pending: "Carregando pacotes...",
        success: "Pacotes carregados com sucesso.",
        error: "Falha no carregamento de pacotes.",
      });
    };

    Promisify();
  }, []);

  useEffect(() => {
    const data: Omit<Statistics, "percent">[] = [
      {
        label: "Aguardando",
        value: 12,
      },
      {
        label: "Transporte",
        value: 7,
      },
      {
        label: "Entregue",
        value: 5,
      },
      {
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

  return (
    <>
      <main className="container">
        <header>
          <img src={Logo} alt="logo" />
        </header>
        <h1>Pacotes</h1>
        <div className="cards">
          {loadingCards ? (
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
