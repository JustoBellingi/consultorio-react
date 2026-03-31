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
import Navbar from "./pages/Navbar";




function App() {
  const [turnosReservados, setTurnosReservados] = useState<Turno[]>([]);
  console.log(turnosReservados);

  // Cargar turnos guardados
  useEffect(() => {
  // REEMPLAZA ESTA URL por la que te dio Render (la que termina en .onrender.com)
  const API = "https://consultorio-react-1.onrender.com";
  fetch(`${API}/turnos`)
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

  <Navbar />  {/* 👈 ACÁ */}

  <Routes>
    <Route path="/" element={<Inicio />} />
    <Route path="/turnos" element={<TurnosPage />} />
    <Route path="/servicios" element={<Servicios />} />
    <Route path="/sobre" element={<Sobre />} />
    <Route path="/contacto" element={<Contacto />} />
  </Routes>

  <a
    href="https://wa.me/5492216900406"
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-float"
  ></a>

  <Footer />
</div>
  );
}
export default App;