import { useState, useEffect } from "react";
import "./TurnosPage.css";
import Turnos from "../components/Turnos";

interface Turno {
  id?: number; // Agregamos el ID que viene de la base de datos
  nombre: string;
  apellido: string;
  obra_social: string; // Usamos snake_case como en la DB
  fecha: string;
  hora: string;
}

function TurnosPage() {
  const [turnosReservados, setTurnosReservados] = useState<Turno[]>([]);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [admin, setAdmin] = useState(false);
  const API_URL = "https://consultorio-react-1.onrender.com/turnos";

  // 1. CARGAR TURNOS DESDE EL BACKEND
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setTurnosReservados(data);
      })
      .catch((err) => {
        console.error("Error cargando turnos:", err);
        setError("No se pudieron cargar los turnos del servidor.");
      });
  }, []);
  

  // 2. RESERVAR TURNO (ENVIAR AL BACKEND)
  const reservarTurno = async (
    nombre: string,
    apellido: string,
    obra_social: string,
    fecha: string,
    hora: string
  ) => {
    if (!nombre || !apellido || !obra_social || !fecha || !hora) {
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

    try {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, apellido, obra_social, fecha, hora }),
  });

  if (!response.ok) throw new Error("Error en el servidor");

  // 🔥 IMPORTANTE: volver a traer todos los turnos desde el backend
  const nuevosTurnos = await fetch(API_URL).then((res) => res.json());

  setTurnosReservados(nuevosTurnos);

  setError("");
  setMensaje("✅ Turno reservado correctamente");
} catch (err) {
  console.error(err);
  setError("Hubo un error al guardar el turno. Reintentá.");
}
  };

  // 3. ELIMINAR TURNO DEL BACKEND
  const eliminarTurno = async (id: number | undefined, index: number) => {
    if (!id) return; // Si no tiene ID, no podemos borrarlo en la DB
    if (!window.confirm("¿Eliminar este turno definitivamente?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const nuevos = [...turnosReservados];
        nuevos.splice(index, 1);
        setTurnosReservados(nuevos);
      }
    } catch (err) {
      setError("No se pudo eliminar el turno.");
    }
  };

  const activarAdmin = () => {
    const pass = prompt("Contraseña admin");
    if (pass === "Justo0406") {
      setAdmin(!admin);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const turnosOrdenados = [...turnosReservados].sort(
    (a, b) =>
      new Date(a.fecha + " " + a.hora).getTime() -
      new Date(b.fecha + " " + b.hora).getTime()
  );
  

  return (
    <div className="turnos-page">
      <div className="turnos-container">
        <h1>📅 Reservar Turno</h1>

        <Turnos
          onReservar={reservarTurno}
          error={error}
          mensaje={mensaje}
          turnosReservados={turnosReservados}
        />

        <button style={{ marginTop: "30px" }} onClick={activarAdmin}>
          {admin ? "Ocultar turnos" : "Modo Admin"}
        </button>

        {admin && (
          <div className="turnos-list">
            <h2>Turnos Reservados (Panel Admin)</h2>
            {turnosOrdenados.length === 0 ? (
              <p>No hay turnos reservados.</p>
            ) : (
              turnosOrdenados.map((t, i) => (
                <div key={t.id || i} className="turno-card">
                  <p><b>Nombre:</b> {t.nombre}</p>
                  <p><b>Apellido:</b> {t.apellido}</p>
                  <p><b>Obra Social:</b> {t.obra_social}</p>
                  <p><b>Fecha:</b> {t.fecha}</p>
                  <p><b>Hora:</b> {t.hora}</p>
                  <button onClick={() => eliminarTurno(t.id, i)}>
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