import { useState, useEffect } from "react";
import "./TurnoPage.css";
import Turnos from "../components/Turnos";
import type { Turno } from "../types/Turno";

interface TurnosPageProps {
  turnosReservados: Turno[];
  setTurnosReservados: React.Dispatch<React.SetStateAction<Turno[]>>;
}

function TurnosPage({ turnosReservados, setTurnosReservados }: TurnosPageProps) {

  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(false);

  // Cargar turnos desde MySQL
  const cargarTurnos = async () => {
    try {
      const res = await fetch("http://localhost:3001/turnos");
      const data = await res.json();
      setTurnosReservados(data);
    } catch (err) {
      console.error("Error cargando turnos:", err);
    }
  };

  // Cuando se abre la página
  useEffect(() => {
    cargarTurnos();
  }, []);

  const reservarTurno = async (
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

    try {

      await fetch("http://localhost:3001/turnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoTurno),
      });

      // Volver a cargar desde MySQL
      await cargarTurnos();

      setError("");

    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor.");
    }
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
          turnosReservados={turnosReservados}
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
                    Cancelar turno
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