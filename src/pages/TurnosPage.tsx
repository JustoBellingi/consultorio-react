import { useState, useEffect } from "react";
import "./TurnoPage.css";
import Turnos from "../components/Turnos";

interface Turno {
  nombre: string;
  apellido: string;
  obraSocial: string;
  fecha: string;
  hora: string;
}

function TurnosPage() {
  const [turnosReservados, setTurnosReservados] = useState<Turno[]>([]);
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(false);

  // Cargar turnos guardados
  useEffect(() => {
    const guardados = localStorage.getItem("turnos");
    if (guardados) {
      setTurnosReservados(JSON.parse(guardados));
    }
  }, []);

  // Guardar cada vez que cambian
  useEffect(() => {
    localStorage.setItem("turnos", JSON.stringify(turnosReservados));
  }, [turnosReservados]);

  const reservarTurno = (
    nombre: string,
    apellido: string,
    obraSocial: string,
    fecha: string,
    hora: string
  ) => {
    if (!nombre || !apellido || !obraSocial || !fecha || !hora) {
      setError("Completa todos los campos.");
      return;
    }

    const hoy = new Date().toISOString().split("T")[0];
    if (fecha < hoy) {
      setError("No podés reservar días anteriores.");
      return;
    }

    const turnoExistente = turnosReservados.find(
      (t) => t.fecha === fecha && t.hora === hora
    );

    if (turnoExistente) {
      setError("Ese turno ya está reservado.");
      return;
    }

    const nuevoTurno: Turno = {
      nombre,
      apellido,
      obraSocial,
      fecha,
      hora,
    };

    setTurnosReservados([...turnosReservados, nuevoTurno]);
    setError("");
  };

  const eliminarTurno = (index: number) => {
    const nuevosTurnos = [...turnosReservados];
    nuevosTurnos.splice(index, 1);
    setTurnosReservados(nuevosTurnos);
  };

  return (
    <div className="turnos-page">
      <div className="turnos-container">
        <h1>Reservar Turno</h1>

        <Turnos
          onReservar={reservarTurno}
          error={error}
        />

        <button
          style={{ marginTop: "30px" }}
          onClick={() => setAdmin(!admin)}
        >
          {admin ? "Ocultar turnos" : "Modo Admin"}
        </button>

        {admin && (
          <div className="turnos-list">
            <h2>Turnos Reservados</h2>

            {turnosReservados.length === 0 ? (
              <p>No hay turnos reservados.</p>
            ) : (
              turnosReservados.map((turno, index) => (
                <div key={index} className="turno-card">
                  <p><strong>Nombre:</strong> {turno.nombre}</p>
                  <p><strong>Apellido:</strong> {turno.apellido}</p>
                  <p><strong>Obra Social:</strong> {turno.obraSocial}</p>
                  <p><strong>Fecha:</strong> {turno.fecha}</p>
                  <p><strong>Hora:</strong> {turno.hora}</p>
                  <button onClick={() => eliminarTurno(index)}>
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TurnosPage;