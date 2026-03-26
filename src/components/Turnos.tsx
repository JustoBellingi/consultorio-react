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
  const [otraObra, setOtraObra] = useState("");
  const [fecha, setFecha] = useState<Date | null>(null);
  const [hora, setHora] = useState("");

  // 🔥 horarios SIN 12 y 13
  const horarios = [
    "08:00","08:30","09:00","09:30",
    "10:00","10:30","11:00","11:30",
    "14:00","14:30","15:00","15:30",
    "16:00","16:30","17:00","17:30"
  ];

  const fechaFormateada = fecha
    ? fecha.toISOString().split("T")[0]
    : "";

  const horariosDisponibles = horarios.filter(
    (h) =>
      !turnosReservados.find(
        (t) => t.fecha === fechaFormateada && t.hora === h
      )
  );

  const reservar = () => {
    const obraFinal = obraSocial === "Otra" ? otraObra : obraSocial;

    if (!nombre || !apellido || !obraFinal || !fecha || !hora) return;

    onReservar(nombre, apellido, obraFinal, fechaFormateada, hora);

    setNombre("");
    setApellido("");
    setHora("");
    setFecha(null);
    setOtraObra("");
  };

  return (
    <div className="form-turnos">
      <h2>📅 Reservar turno</h2>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />

      {/* 🏥 OBRAS SOCIALES */}
      <select
        value={obraSocial}
        onChange={(e) => setObraSocial(e.target.value)}
      >
        <option value="">Obra Social</option>
        <option>IOMA</option>
        <option>OSDE</option>
        <option>Swiss Medical</option>
        <option>Galeno</option>
        <option>Medifé</option>
        <option>Prevención Salud</option>
        <option>Omint</option>
        <option>Otra</option>
      </select>

      {obraSocial === "Otra" && (
        <input
          placeholder="Especificar obra social"
          value={otraObra}
          onChange={(e) => setOtraObra(e.target.value)}
        />
      )}

      {/* 📅 FECHA */}
      <DatePicker
        selected={fecha}
        onChange={(date: Date | null) => setFecha(date)}
        filterDate={(date) => {
          const d = date.getDay();
          return d !== 0 && d !== 6;
        }}
        minDate={new Date()}
        placeholderText="Seleccionar fecha"
      />

      {/* ⏰ HORARIOS (SELECT LIMPIO) */}
      <select value={hora} onChange={(e) => setHora(e.target.value)}>
        <option value="">Seleccionar horario</option>
        {horariosDisponibles.map((h) => (
          <option key={h}>{h}</option>
        ))}
      </select>

      <button onClick={reservar}>Reservar turno</button>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}
    </div>
  );
}

export default Turnos;