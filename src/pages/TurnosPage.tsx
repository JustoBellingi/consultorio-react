import { useState, useEffect } from "react";
import "./TurnosPage.css";
import Turnos from "../components/Turnos";

interface Turno {
  id?: number;
  nombre: string;
  apellido: string;
  obra_social: string;
  fecha: string;
  hora: string;
}

function TurnosPage() {
  const [turnosReservados, setTurnosReservados] = useState<Turno[]>([]);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [admin, setAdmin] = useState(
  localStorage.getItem("admin") === "true"
);

  const API_URL = "https://consultorio-react-1.onrender.com/turnos";

  // 🔥 cargar turnos
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTurnosReservados(data))
      .catch(() => setError("Error cargando turnos"));
  }, []);

  // 🔥 reservar
  const reservarTurno = async (
    nombre: string,
    apellido: string,
    obra_social: string,
    fecha: string,
    hora: string
  ) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          obra_social,
          fecha,
          hora,
        }),
      });

      if (!response.ok) throw new Error();

      const nuevos = await fetch(API_URL).then((res) => res.json());
      setTurnosReservados(nuevos);

      setMensaje("✅ Turno reservado correctamente");
      setError("");

      // 🔥 WHATSAPP
      const mensajeWsp = `Hola! 👋 Soy ${nombre} ${apellido}.
Quiero confirmar mi turno:

📅 Fecha: ${fecha}
⏰ Hora: ${hora}`;

      window.open(
        `https://wa.me/5492215117589?text=${encodeURIComponent(mensajeWsp)}`,
        "_blank"
      );

    } catch {
      setError("Error al reservar turno");
    }
  };

  // 🔥 eliminar
  const eliminarTurno = async (id: number | undefined, index: number) => {
    if (!id) return;
    if (!window.confirm("¿Eliminar turno?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const nuevos = [...turnosReservados];
        nuevos.splice(index, 1);
        setTurnosReservados(nuevos);
      }
    } catch {
      setError("Error al eliminar");
    }
  };

  const activarAdmin = () => {
  const pass = prompt("Contraseña admin");

  if (pass === "Justo0406") {
    localStorage.setItem("admin", "true");
    setAdmin(true);
  } else {
    alert("Contraseña incorrecta");
  }
};
const desactivarAdmin = () => {
  localStorage.removeItem("admin");
  setAdmin(false);
};
<button onClick={admin ? desactivarAdmin : activarAdmin}>
  {admin ? "Cerrar admin" : "Modo Admin"}
</button>

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

        <button onClick={activarAdmin}>
          {admin ? "Ocultar turnos" : "Modo Admin"}
        </button>

        {admin && (
          <div className="turnos-list">
            <h2>Turnos Reservados</h2>

            {turnosOrdenados.length === 0 ? (
              <p>No hay turnos</p>
            ) : (
              turnosOrdenados.map((t, i) => (
                <div
                  key={t.id || i}
                  className="turno-card"
                  style={{
                    borderLeft:
                      t.fecha === new Date().toISOString().split("T")[0]
                        ? "5px solid green"
                        : "none",
                  }}
                >
                  <p>{t.nombre} {t.apellido}</p>
                  <p>{t.obra_social}</p>
                  <p>{t.fecha} - {t.hora}</p>

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