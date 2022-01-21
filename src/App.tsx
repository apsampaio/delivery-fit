import "./styles/global.css";
import "./styles/App.css";

import Logo from "./assets/Logo.svg";

import { Card } from "./components/Card";

function App() {
  return (
    <main className="container">
      <header>
        <img src={Logo} alt="logo" />
      </header>
      <h1>Pacotes</h1>
      <div className="cards">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  );
}

export default App;
