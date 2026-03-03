import { useState } from "react";

interface TurnosProps {
  onReservar: (
    nombre: string,
    apellido: string,
    obraSocial: string,
    fecha: string,
    hora: string
  ) => void;
  error: string;
}

function Turnos({ onReservar, error }: TurnosProps) {
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

  return (
    <form className="turnos-form" onSubmit={manejarEnvio}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />

      <select
        value={obraSocial}
        onChange={(e) => setObraSocial(e.target.value)}
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
      />

      <input
        type="time"
        step="1800"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
      />

      <button type="submit">Reservar Turno</button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default Turnos;