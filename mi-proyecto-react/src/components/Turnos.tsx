import { useState } from "react";

interface Turno {
  nombre: string;
  fecha: string;
  hora: string;
}

interface TurnosProps {
  setTurnosReservados: React.Dispatch<React.SetStateAction<Turno[]>>;
}

function Turnos({ setTurnosReservados }: TurnosProps) {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const horariosDisponibles = [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00"
  ];

  const hoy = new Date();
  const fechaMinima = hoy.toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!nombre || !fecha || !hora) return;

  const fechaSeleccionada = new Date(fecha);
  const dia = fechaSeleccionada.getDay();

  if (dia === 0 || dia === 6) {
    alert("No se pueden reservar turnos los fines de semana");
    return;
  }

  // 🔒 Validar si ya existe un turno en esa fecha y hora
  setTurnosReservados((prev) => {
    const turnoExistente = prev.find(
      (t) => t.fecha === fecha && t.hora === hora
    );

    if (turnoExistente) {
      alert("Ese horario ya está reservado.");
      return prev; // no agrega nada
    }

    return [...prev, { nombre, fecha, hora }];
  });

  setNombre("");
  setFecha("");
  setHora("");
};

  return (
    <section id="turnos" className="section">
      <h2>Reservar Turno</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="date"
          value={fecha}
          min={fechaMinima}
          onChange={(e) => setFecha(e.target.value)}
          required
        />

        <select
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
        >
          <option value="">Seleccionar horario</option>
          {horariosDisponibles.map((h, index) => (
            <option key={index} value={h}>
              {h}
            </option>
          ))}
        </select>

        <button type="submit">Reservar</button>
      </form>
    </section>
  );
}

export default Turnos;