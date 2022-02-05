import { useEffect, useState } from "react";

import { Card } from "../components/Card";
import { Chart } from "../components/Chart";
import { Modal } from "../components/Modal";
import { Form } from "../components/Form";

import Drawer from "react-modern-drawer";

import { Package } from "../types/Package";
import { useAuth } from "../hooks/Auth";
import { ToastPromise } from "../services/ToastPromise";

import Logo from "../assets/Logo.svg";

import "react-modern-drawer/dist/index.css";
import "../styles/Dashboard.css";

function Dashboard() {
  const { api, SignOut } = useAuth();

  const [loadingCards, setLoadingCards] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

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

      await new ToastPromise().run({
        action: () => getPackages(),
        pending: "Carregando pacotes...",
        success: "Pacotes carregados com sucesso.",
      });
    })();
  }, []);

  return (
    <>
      <Drawer
        open={drawerVisible}
        onClose={() => setDrawerVisible((prev) => !prev)}
        size={500}
        style={{
          backgroundColor: "#4c33cc",
          display: "flex",
        }}
        direction="left"
        className="drawer-component"
      >
        <Form closeDrawer={() => setDrawerVisible(false)} />
      </Drawer>
      <main className="container">
        <header>
          <img src={Logo} alt="logo" />
          <button onClick={SignOut}>SAIR</button>
        </header>
        <div className="packages-header">
          <h1>Pacotes</h1>
          <button onClick={() => setDrawerVisible(true)}>NOVO +</button>
        </div>
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
