import { useState } from "react";
import type { Turno } from "../types/Turno";

interface TurnosProps {
  onReservar: (
    nombre: string,
    apellido: string,
    obraSocial: string,
    fecha: string,
    hora: string
  ) => void;
  error: string;
  turnosReservados: Turno[];
}

function Turnos({ onReservar, error, turnosReservados }: TurnosProps) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [obraSocial, setObraSocial] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();

    onReservar(nombre, apellido, obraSocial, fecha, hora);

    setNombre("");
    setApellido("");
    setObraSocial("");
    setFecha("");
    setHora("");
  };

  const horarios = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  const estaReservado = (horaSeleccionada: string) => {
    return turnosReservados.some(
      (turno) => turno.fecha === fecha && turno.hora === horaSeleccionada
    );
  };

  return (
    <form className="turnos-form" onSubmit={manejarEnvio}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        required
      />

      <select
        value={obraSocial}
        onChange={(e) => setObraSocial(e.target.value)}
        required
      >
        <option value="">Seleccionar Obra Social</option>
        <option value="OSDE">OSDE</option>
        <option value="IOMA">IOMA</option>
        <option value="Swiss Medical">Swiss Medical</option>
        <option value="Galeno">Galeno</option>
        <option value="Particular">Particular</option>
      </select>

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />

      <select
        value={hora}
        onChange={(e) => setHora(e.target.value)}
        required
        disabled={!fecha}
      >
        <option value="">Seleccionar Horario</option>
        {horarios.map((h) => (
          <option key={h} value={h} disabled={estaReservado(h)}>
            {h} {estaReservado(h) ? " (Ocupado)" : ""}
          </option>
        ))}
      </select>

      <button type="submit">Reservar Turno</button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default Turnos;