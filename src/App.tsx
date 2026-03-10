import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import ChatBot from "./components/ChatBot";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Sobre from "./pages/Sobre";
import Contacto from "./pages/Contacto";
import TurnosPage from "./pages/TurnosPage";
import type { Turno } from "./types/Turno";
import Footer from "./components/Footer";

function App() {
  const [turnosReservados, setTurnosReservados] = useState<Turno[]>([]);
  console.log(turnosReservados);

  // Cargar turnos guardados
  useEffect(() => {
  fetch("http://localhost:3001/turnos")
    .then((res) => res.json())
    .then((data) => {
      setTurnosReservados(data);
    })
    .catch((err) => {
      console.error("Error cargando turnos:", err);
    });
}, []);
  return (
    <div>
      <ChatBot />

      <nav className="navbar">
        <div className="logo">Odontología</div>

        <ul className="nav-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>

          <li>
            <Link to="/turnos">Turnos</Link>
          </li>

          <li>
            <Link to="/servicios">Servicios</Link>
          </li>

          <li>
            <Link to="/sobre">Sobre Nosotros</Link>
          </li>

          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route path="/turnos" element={<TurnosPage />} />

        <Route path="/servicios" element={<Servicios />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>

      <a
        href="https://wa.me/5492216900406"
        className="whatsapp"
        target="_blank"
        rel="noreferrer"
      >
        💬
      </a>

      <Footer />
    </div>
  );
}

export default App;