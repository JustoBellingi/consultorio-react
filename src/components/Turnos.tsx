import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  onReservar: Function;
  error: string;
  mensaje: string;
  turnosReservados: any[];
}

function Turnos({ onReservar, error, mensaje, turnosReservados }: Props) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [obraSocial, setObraSocial] = useState("");
  const [fecha, setFecha] = useState<Date | null>(null);
  const [hora, setHora] = useState("");
  const [loading, setLoading] = useState(false);

  const horarios = Array.from({ length: 20 }, (_, i) => {
    const h = Math.floor(i / 2) + 8;
    const m = i % 2 === 0 ? "00" : "30";
    return `${h.toString().padStart(2, "0")}:${m}`;
  });

  const fechaFormateada = fecha
    ? fecha.toISOString().split("T")[0]
    : "";

  const ahora = new Date();

  const horariosDisponibles = horarios.filter((h) => {
    const ocupado = turnosReservados.find(
      (t) => t.fecha === fechaFormateada && t.hora === h
    );

    if (ocupado) return false;

    if (fecha) {
      const hoy = new Date().toISOString().split("T")[0];

      if (fechaFormateada === hoy) {
        const [horaNum, min] = h.split(":").map(Number);
        const fechaHora = new Date();
        fechaHora.setHours(horaNum, min, 0, 0);

        if (fechaHora < ahora) return false;
      }
    }

    return true;
  });

  const reservar = async () => {
    if (!nombre || !apellido || !obraSocial || !fecha || !hora) return;

    if (loading) return;
    setLoading(true);

    await onReservar(nombre, apellido, obraSocial, fechaFormateada, hora);

    setLoading(false);

    setNombre("");
    setApellido("");
    setHora("");
    setFecha(null);
  };

  return (
    <div className="form-turnos">
      <h2>📅 Reservar turno</h2>

      <p className="turno-info">⏱ Turnos de 30 minutos</p>

      <input
        placeholder="👤 Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        placeholder="👤 Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />

      <select
        value={obraSocial}
        onChange={(e) => setObraSocial(e.target.value)}
      >
        <option value="">🏥 Obra Social</option>
        <option>IOMA</option>
        <option>OSDE</option>
        <option>Swiss Medical</option>
        <option>Particular</option>
      </select>

      <DatePicker
        selected={fecha}
        onChange={(date: Date | null) => setFecha(date)}
        filterDate={(date) => {
          const d = date.getDay();
          return d !== 0 && d !== 6;
        }}
        minDate={new Date()}
        placeholderText="📅 Seleccionar fecha"
      />

      {/* 🔥 HORARIOS PRO */}
      <div className="horarios-grid">
        {horariosDisponibles.map((h) => (
          <button
            key={h}
            type="button"
            className={hora === h ? "hora active" : "hora"}
            onClick={() => setHora(h)}
          >
            {h}
          </button>
        ))}
      </div>

      <button onClick={reservar} disabled={loading}>
        {loading ? "Reservando..." : "📅 Reservar turno"}
      </button>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}
    </div>
  );
}

export default Turnos;