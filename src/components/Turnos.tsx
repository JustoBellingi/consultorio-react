import { useState } from "react";
import type { Turno } from "../App";

interface Props {
  setTurnosReservados: React.Dispatch<React.SetStateAction<Turno[]>>;
}


function Turnos({ setTurnosReservados }: Props) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [obraSocial, setObraSocial] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const reservarTurno = () => {
    if (!nombre || !apellido || !obraSocial || !fecha || !hora) {
      alert("Por favor completá todos los campos.");
      return;
    }

    const nuevoTurno = { nombre, apellido, obraSocial, fecha, hora };

    setTurnosReservados((prev) => {
      // 🚫 VALIDAR TURNO DUPLICADO
      const turnoExistente = prev.find(
        (t) => t.fecha === fecha && t.hora === hora
      );

      if (turnoExistente) {
        alert("Ese horario ya está reservado.");
        return prev;
      }

      return [...prev, nuevoTurno];
    });

    setNombre("");
    setApellido("");
    setObraSocial("");
    setFecha("");
    setHora("");
  };

  return (
    <div>
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

      <input
        type="text"
        placeholder="Obra Social"
        value={obraSocial}
        onChange={(e) => setObraSocial(e.target.value)}
      />

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      <input
        type="time"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
      />

      <button onClick={reservarTurno}>Reservar</button>
    </div>
  );
}

export default Turnos;