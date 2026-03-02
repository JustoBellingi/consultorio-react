import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Sobre from "./pages/Sobre";
import Contacto from "./pages/Contacto";
import TurnosPage from "./pages/TurnosPage";

export interface Turno {
  nombre: string;
  apellido: string;
  obraSocial: string;
  fecha: string;
  hora: string;
}

function App() {
  const [turnosReservados, setTurnosReservados] = useState<Turno[]>([]);

  useEffect(() => {
    const guardados = localStorage.getItem("turnos");
    if (guardados) {
      setTurnosReservados(JSON.parse(guardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("turnos", JSON.stringify(turnosReservados));
  }, [turnosReservados]);

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">Odontología </div>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/turnos">Turnos</Link></li>
          <li><Link to="/servicios">Servicios</Link></li>
          <li><Link to="/sobre">Sobre Nosotros</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </nav>

      {/* RUTAS */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/turnos" element={<TurnosPage setTurnosReservados={setTurnosReservados} />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>

      <footer className="footer">
        © 2026 Odontología SM - Todos los derechos reservados
      </footer>
    </div>
  );
}

export default App;