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

  // 🔥 Generar horarios
  const generarHorarios = () => {
    const horarios = [];

    for (let h = 8; h < 18; h++) {
      horarios.push(`${h.toString().padStart(2, "0")}:00`);
      horarios.push(`${h.toString().padStart(2, "0")}:30`);
    }

    return horarios;
  };

  const horarios = generarHorarios();

  // 🔥 Formatear fecha para comparar con backend
  const fechaFormateada = fecha
    ? fecha.toISOString().split("T")[0]
    : "";

  // 🔥 Filtrar horarios ocupados
  const horariosDisponibles = horarios.filter(
    (h) =>
      !turnosReservados.find(
        (t) => t.fecha === fechaFormateada && t.hora === h
      )
  );

  // 🔥 Reservar turno
  const reservar = () => {
    if (!fecha) {
      alert("Seleccioná una fecha");
      return;
    }

    onReservar(
      nombre,
      apellido,
      obraSocial,
      fechaFormateada,
      hora
    );

    setNombre("");
    setApellido("");
    setHora("");
    setFecha(null);
  };

  return (
    <div className="form-turnos">

      <input
        placeholder="👤 Nombre"
        value={nombre}
        required
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        placeholder="👤 Apellido"
        value={apellido}
        required
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

      {/* 🔥 DATEPICKER PRO */}
      <DatePicker
        selected={fecha}
        onChange={(date: Date | null) => setFecha(date)}
        filterDate={(date) => {
          const dia = date.getDay();
          return dia !== 0 && dia !== 6; // ❌ bloquea sábados y domingos
        }}
        minDate={new Date()}
        placeholderText="📅 Seleccionar fecha"
        dateFormat="yyyy-MM-dd"
      />

      <select
        value={hora}
        onChange={(e) => setHora(e.target.value)}
      >
        <option value="">⏰ Horario</option>

        {horariosDisponibles.map((h) => (
          <option key={h}>{h}</option>
        ))}
      </select>

      <button onClick={reservar}>
        📅 Reservar turno
      </button>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

    </div>
  );
}

export default Turnos;