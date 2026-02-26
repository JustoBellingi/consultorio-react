import React, { useState } from "react";
import "./App.css";
import foto1 from "./assets/foto1.jpg";
import foto2 from "./assets/foto2.jpg";

interface Turno {
  nombre: string;
  fecha: string;
  hora: string;
}

function App() {
  const [seccion, setSeccion] = useState("inicio");
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const horariosDisponibles = [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00"
  ];

  const hoy = new Date().toISOString().split("T")[0];

  const reservarTurno = () => {
    if (!nombre || !fecha || !hora) {
      alert("Completá todos los campos");
      return;
    }

    if (fecha < hoy) {
      alert("No podés seleccionar días anteriores");
      return;
    }

    const ocupado = turnos.some(
      (t) => t.fecha === fecha && t.hora === hora
    );

    if (ocupado) {
      alert("Ese horario ya está reservado");
      return;
    }

    const nuevoTurno: Turno = { nombre, fecha, hora };
    setTurnos([...turnos, nuevoTurno]);

    alert("Turno reservado con éxito");

    setNombre("");
    setFecha("");
    setHora("");
  };

  const renderSeccion = () => {
    switch (seccion) {
      case "inicio":
        return (
          <>
            <h1>Consultorio Odontológico</h1>
            <p>Cuidamos tu sonrisa 🦷</p>
            <div className="imagenes">
              <img src={foto1} alt="Consultorio" />
              <img src={foto2} alt="Atención dental" />
            </div>
          </>
        );

      case "turnos":
        return (
          <>
            <h2>Sacar Turno</h2>

            <div className="formulario">
              <input
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <input
                type="date"
                min={hoy}
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />

              <select
                value={hora}
                onChange={(e) => setHora(e.target.value)}
              >
                <option value="">Seleccionar horario</option>
                {horariosDisponibles.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>

              <button onClick={reservarTurno}>
                Confirmar Turno
              </button>
            </div>

            <h3>Turnos Reservados</h3>
            <ul>
              {turnos.map((t, index) => (
                <li key={index}>
                  {t.nombre} - {t.fecha} - {t.hora}
                </li>
              ))}
            </ul>
          </>
        );

      default:
        return <h2>Seleccioná una sección</h2>;
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h2 className="logo">Consultorio Dental</h2>
        <ul className="nav-center">
          <li onClick={() => setSeccion("inicio")}>Inicio</li>
          <li onClick={() => setSeccion("turnos")}>Turnos</li>
        </ul>
      </nav>

      <div className="container">{renderSeccion()}</div>
    </div>
  );
}

export default App;