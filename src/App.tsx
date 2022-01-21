import "./styles/global.css";
import "./styles/App.css";

import { useState } from "react";

import { Card } from "./components/Card";
import { Steps } from "./types/Steps";
import { Package } from "./types/Package";

import Logo from "./assets/Logo.svg";

function App() {
  const [packages, setPackages] = useState<Package[]>([
    {
      id: "SOME",
      lastUpdate: new Date(),
      packageNumber: 1,
      step: Steps.waiting,
    },
  ]);

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
    </main>
  );
}

export default App;
