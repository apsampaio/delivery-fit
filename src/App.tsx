import "./styles/global.css";
import "./styles/App.css";

import { useEffect, useState } from "react";

import { Card } from "./components/Card";
import { Chart } from "./components/Chart";
import { Modal } from "./components/Modal";

import { Package } from "./types/Package";
import { Statistics } from "./types/Statistics";

import { api } from "./services/api";

import Logo from "./assets/Logo.svg";

function App() {
  const [loading, setLoading] = useState(true);
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
    const getPackages = async () => {
      const { data } = await api.get<Package[]>("package");
      setPackages(data);
    };

    getPackages();
    setLoading(false);
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
          <Chart />
        </div>
      </main>
      {modalVisible && <Modal closeModal={closeModal} id={selectedPackage} />}
    </>
  );
}

export default App;
