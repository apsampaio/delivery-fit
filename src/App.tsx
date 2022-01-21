import "./styles/global.css";
import "./styles/App.css";

import Logo from "./assets/Logo.svg";

import { Card } from "./components/Card";
import { Steps } from "./types/Steps";

function App() {
  return (
    <main className="container">
      <header>
        <img src={Logo} alt="logo" />
      </header>
      <h1>Pacotes</h1>
      <div className="cards">
        <Card step={Steps.waiting} />
        <Card step={Steps.transporting} />
        <Card step={Steps.delivered} />
        <Card step={Steps.misplaced} />
      </div>
    </main>
  );
}

export default App;
