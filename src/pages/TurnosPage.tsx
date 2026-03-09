import { useState, useEffect } from "react";
import "./TurnosPage.css";
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
  const [mensaje, setMensaje] = useState("");
  const [admin, setAdmin] = useState(false);

  // cargar turnos guardados
  useEffect(() => {
    const guardados = localStorage.getItem("turnos");

    if (guardados) {
      setTurnosReservados(JSON.parse(guardados));
    }
  }, []);

  // guardar turnos
  useEffect(() => {
    localStorage.setItem("turnos", JSON.stringify(turnosReservados));
  }, [turnosReservados]);

  // reservar turno
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

    const ocupado = turnosReservados.find(
      (t) => t.fecha === fecha && t.hora === hora
    );

    if (ocupado) {
      setError("Ese horario ya está reservado.");
      return;
    }

    const nuevoTurno: Turno = {
      nombre,
      apellido,
      obraSocial,
      fecha,
      hora
    };

    setTurnosReservados([...turnosReservados, nuevoTurno]);
    setError("");
    setMensaje("✅ Turno reservado correctamente");
  };

  // eliminar turno
  const eliminarTurno = (index: number) => {

    if (!window.confirm("¿Eliminar este turno?")) return;

    const nuevos = [...turnosReservados];
    nuevos.splice(index, 1);

    setTurnosReservados(nuevos);
  };

  // activar modo admin
  const activarAdmin = () => {

    const pass = prompt("Contraseña admin");

    if (pass === "Justo0406") {
      setAdmin(!admin);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  // ordenar turnos por fecha
  const turnosOrdenados = [...turnosReservados].sort(
    (a, b) =>
      new Date(a.fecha + " " + a.hora).getTime() -
      new Date(b.fecha + " " + b.hora).getTime()
  );

  return (
    <div className="turnos-page">
      <div className="turnos-container">

        <h1>Reservar Turno</h1>

        <Turnos
          onReservar={reservarTurno}
          error={error}
          mensaje={mensaje}
          turnosReservados={turnosReservados}
        />

        <button
          style={{ marginTop: "30px" }}
          onClick={activarAdmin}
        >
          {admin ? "Ocultar turnos" : "Modo Admin"}
        </button>

        {admin && (
          <div className="turnos-list">

            <h2>Turnos Reservados</h2>

            {turnosOrdenados.length === 0 ? (
              <p>No hay turnos reservados.</p>
            ) : (

              turnosOrdenados.map((t, i) => (

                <div key={i} className="turno-card">

                  <p><b>Nombre:</b> {t.nombre}</p>
                  <p><b>Apellido:</b> {t.apellido}</p>
                  <p><b>Obra Social:</b> {t.obraSocial}</p>
                  <p><b>Fecha:</b> {t.fecha}</p>
                  <p><b>Hora:</b> {t.hora}</p>

                  <button onClick={() => eliminarTurno(i)}>
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