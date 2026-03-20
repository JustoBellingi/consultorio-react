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
  const [modal, setModal] = useState("");
  const [loading, setLoading] = useState(false);

  const generarHorarios = () => {
    const horarios = [];
    for (let h = 8; h < 18; h++) {
      horarios.push(`${h.toString().padStart(2, "0")}:00`);
      horarios.push(`${h.toString().padStart(2, "0")}:30`);
    }
    return horarios;
  };

  const horarios = generarHorarios();

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
    if (!nombre || !apellido || !obraSocial || !fecha || !hora) {
      setModal("⚠️ Completá todos los campos");
      return;
    }

    setLoading(true);

    await onReservar(
      nombre,
      apellido,
      obraSocial,
      fechaFormateada,
      hora
    );

    setLoading(false);

    setModal("✅ Turno reservado con éxito");

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
        onChange={(date: Date | null) => {
          if (!date) return;

          const dia = date.getDay();

          if (dia === 0 || dia === 6) {
            setModal("❌ No atendemos sábados ni domingos");
            return;
          }

          setFecha(date);
        }}
        filterDate={(date) => {
          const dia = date.getDay();
          return dia !== 0 && dia !== 6;
        }}
        minDate={new Date()}
        placeholderText="📅 Seleccionar fecha"
        dateFormat="yyyy-MM-dd"
      />

      <select value={hora} onChange={(e) => setHora(e.target.value)}>
        <option value="">⏰ Horario</option>

        {horariosDisponibles.map((h) => (
          <option key={h}>{h}</option>
        ))}
      </select>

      <button onClick={reservar} disabled={loading}>
        {loading ? "Reservando..." : "📅 Reservar turno"}
      </button>

      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}

      {fecha && horariosDisponibles.length === 0 && (
        <p style={{ color: "red" }}>
          ❌ No hay horarios disponibles para este día
        </p>
      )}

      {modal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modal}</p>
            <button onClick={() => setModal("")}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Turnos;