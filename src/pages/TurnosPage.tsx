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

  // 🔐 ADMIN SOLO POR URL
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

      const nuevos = await fetch(API_URL).then((res) => res.json());
      setTurnosReservados(nuevos);

      setMensaje("✅ Turno reservado correctamente");
      setError("");

      // 📧 EMAIL
      emailjs.send(
        "TU_SERVICE_ID",
        "TU_TEMPLATE_ID",
        { nombre, apellido, fecha, hora, obra_social },
        "TU_PUBLIC_KEY"
      );

      // 💬 WHATSAPP
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

  // 🗑️ ELIMINAR (ARREGLADO)
  const eliminarTurno = async (id?: number) => {
    if (!id) return;

    if (!window.confirm("¿Eliminar turno?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();

      // 🔥 refresca desde backend (clave)
      const nuevos = await fetch(API_URL).then((res) => res.json());
      setTurnosReservados(nuevos);

    } catch {
      setError("Error al eliminar");
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

        {/* IZQUIERDA (FORM SIN TOCAR) */}
        <div className="turnos-left">
          <Turnos
            onReservar={reservarTurno}
            error={error}
            mensaje={mensaje}
            turnosReservados={turnosReservados}
          />
        </div>

        {/* DERECHA (INFO PRO) */}
        <div className="turnos-right">
          <h2>Reservá tu turno online</h2>

          <p className="turnos-desc">
            Elegí el día y horario que mejor se adapte a vos. Nuestro sistema
            muestra disponibilidad en tiempo real para que reserves fácil y rápido.
          </p>

          <ul>
            <li>✔ Atención profesional y personalizada</li>
            <li>✔ Equipamiento moderno</li>
            <li>✔ Confirmación inmediata</li>
            <li>✔ Ubicación accesible en City Bell</li>
          </ul>

          <div className="info-card">
            📍 City Bell, La Plata
          </div>

          <div className="info-card">
            🕒 Lunes a Viernes 9:00 - 18:00
          </div>

          <div className="info-card destacado">
            💡 Tip: Reservá con anticipación para asegurar tu horario
          </div>
        </div>

      </div>

      {/* 🔐 ADMIN SOLO VOS */}
      {admin && (
        <div className="admin-panel">
          <h2>Turnos Reservados</h2>

          {turnosOrdenados.map((t) => (
            <div key={t.id} className="turno-card">
              <p><b>{t.nombre} {t.apellido}</b></p>
              <p>{t.fecha} - {t.hora}</p>

              <button onClick={() => eliminarTurno(t.id)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

      {/* WHATSAPP */}
      <a
        href="https://wa.me/5492215117589"
        target="_blank"
        className="chat-button"
      >
        💬
      </a>

    </div>
  );
}

export default TurnosPage;