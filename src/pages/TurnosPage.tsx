import { useState, useEffect } from "react";
import "./TurnosPage.css";
import Turnos from "../components/Turnos";
import emailjs from "emailjs-com";

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
  const [admin, setAdmin] = useState(false);

  const API_URL = "https://consultorio-react-1.onrender.com/turnos";

  // 🔐 ADMIN SOLO SI ENTRÁS CON ?admin=true
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true") {
      setAdmin(true);
    }
  }, []);

  // 📦 CARGAR TURNOS
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTurnosReservados(data))
      .catch(() => setError("Error cargando turnos"));
  }, []);

  // 📅 RESERVAR
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

      // 🔥 refrescar desde backend
      const nuevos = await fetch(API_URL).then((res) => res.json());
      setTurnosReservados(nuevos);

      setMensaje("✅ Turno reservado correctamente");
      setError("");

      // 📧 EMAIL
      emailjs
        .send(
          "TU_SERVICE_ID",
          "TU_TEMPLATE_ID",
          { nombre, apellido, fecha, hora, obra_social },
          "TU_PUBLIC_KEY"
        )
        .catch(() => console.log("Error mail"));

      // 💬 WHATSAPP
      const mensajeWsp = `Hola! Soy ${nombre} ${apellido}.
Turno confirmado:

📅 ${fecha}
⏰ ${hora}`;

      window.open(
        `https://wa.me/5492215117589?text=${encodeURIComponent(mensajeWsp)}`,
        "_blank"
      );

    } catch {
      setError("Error al reservar turno");
    }
  };

  // 🗑️ ELIMINAR (FIX REAL)
  const eliminarTurno = async (id: number | undefined) => {
    if (!id) return;
    if (!window.confirm("¿Eliminar turno?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();

      // 🔥 REFETCH (clave)
      const nuevos = await fetch(API_URL).then((res) => res.json());
      setTurnosReservados(nuevos);

    } catch {
      setError("Error al eliminar turno");
    }
  };

  const turnosOrdenados = [...turnosReservados].sort(
    (a, b) =>
      new Date(a.fecha + " " + a.hora).getTime() -
      new Date(b.fecha + " " + b.hora).getTime()
  );

  return (
    <div className="turnos-page">
      <div className="turnos-layout">

        {/* FORM */}
        <div className="turnos-left">
          <Turnos
            onReservar={reservarTurno}
            error={error}
            mensaje={mensaje}
            turnosReservados={turnosReservados}
          />
        </div>

        {/* INFO */}
        <div className="turnos-right">
          <h2>¿Por qué elegirnos?</h2>
          <ul>
            <li>✔ Atención personalizada</li>
            <li>✔ Tecnología moderna</li>
            <li>✔ Profesionales certificados</li>
            <li>✔ Turnos rápidos</li>
          </ul>
        </div>

      </div>

      {/* 🔐 ADMIN INVISIBLE PARA USUARIOS */}
      {admin && (
        <div className="admin-panel">
          <h2>Panel Admin</h2>

          {turnosOrdenados.map((t) => (
            <div key={t.id} className="turno-card">
              <p>{t.nombre} {t.apellido}</p>
              <p>{t.fecha} - {t.hora}</p>

              <button onClick={() => eliminarTurno(t.id)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TurnosPage;