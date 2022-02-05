import { useEffect, useState } from "react";

import { Card } from "../components/Card";
import { Chart } from "../components/Chart";
import { Modal } from "../components/Modal";

import { Package } from "../types/Package";
import { useAuth } from "../hooks/Auth";

import { toast } from "react-toastify";

import Logo from "../assets/Logo.svg";

import "../styles/Dashboard.css";

function Dashboard() {
  const { api } = useAuth();
  const [loadingCards, setLoadingCards] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
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
    (async () => {
      const getPackages = async () => {
        const response = await api.get<Package[]>("package");

        setLoadingCards(false);
        setPackages(response.data);
      };
      await toast.promise(getPackages, {
        pending: "Carregando pacotes...",
        success: "Pacotes carregados com sucesso.",
        error: "Falha no carregamento de pacotes.",
      });
    })();
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
          <Chart />
        </div>
      </main>
      {modalVisible && <Modal closeModal={closeModal} id={selectedPackage} />}
    </>
  );
}

export { Dashboard };
