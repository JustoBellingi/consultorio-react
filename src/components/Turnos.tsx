import { useState } from "react";

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
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const generarHorarios = () => {
    const horarios = [];

    for (let h = 8; h < 18; h++) {
      horarios.push(`${h.toString().padStart(2, "0")}:00`);
      horarios.push(`${h.toString().padStart(2, "0")}:30`);
    }

    return horarios;
  };

  const horarios = generarHorarios();

  const horariosDisponibles = horarios.filter(
    (h) =>
      !turnosReservados.find(
        (t) => t.fecha === fecha && t.hora === h
      )
  );

  const reservar = () => {
    onReservar(nombre, apellido, obraSocial, fecha, hora);

    setNombre("");
    setApellido("");
    setHora("");
  };

  return (
    <div className="form-turnos">

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

      <select
        value={obraSocial}
        onChange={(e) => setObraSocial(e.target.value)}
      >
        <option value="">Obra Social</option>
        <option>IOMA</option>
        <option>OSDE</option>
        <option>Swiss Medical</option>
        <option>Particular</option>
      </select>

      <input
        type="date"
        value={fecha}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => {

          const dia = new Date(e.target.value).getDay();

          if (dia === 0 || dia === 6) {
            alert("No atendemos fines de semana");
            return;
          }

          setFecha(e.target.value);
        }}
      />

      <select
        value={hora}
        onChange={(e) => setHora(e.target.value)}
      >
        <option value="">Horario</option>

        {horariosDisponibles.map((h) => (
          <option key={h}>{h}</option>
        ))}
      </select>

      <button onClick={reservar}>
        Reservar turno
      </button>

      {error && <p style={{color:"red"}}>{error}</p>}
      {mensaje && <p style={{color:"green"}}>{mensaje}</p>}

    </div>
  );
}

export default Turnos;