import { useState } from "react";
import type { Turno } from "../App";

interface TurnosPageProps {
  setTurnosReservados: React.Dispatch<React.SetStateAction<Turno[]>>;
}

function TurnosPage({ setTurnosReservados }: TurnosPageProps) {
  const [formData, setFormData] = useState<Turno>({
    nombre: "",
    apellido: "",
    obraSocial: "",
    fecha: "",
    hora: "",
  });

  const [turnos, setTurnos] = useState<Turno[]>(() => {
    const guardados = localStorage.getItem("turnos");
    return guardados ? JSON.parse(guardados) : [];
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevosTurnos = [...turnos, formData];
    setTurnos(nuevosTurnos);
    setTurnosReservados(nuevosTurnos);
    setFormData({ nombre: "", apellido: "", obraSocial: "", fecha: "", hora: "" });
  };

  return (
    <div className="turnos-container">
      <h2>Reservar Turno</h2>
      <form className="turnos-form" onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

        <label>Apellido</label>
        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />

        <label>Obra Social</label>
        <input type="text" name="obraSocial" value={formData.obraSocial} onChange={handleChange} />

        <label>Fecha</label>
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />

        <label>Hora</label>
        <input type="time" name="hora" value={formData.hora} onChange={handleChange} required />

        <button type="submit">Reservar</button>
      </form>

      <div className="turnos-list">
        <h2>Turnos Reservados</h2>
        {turnos.length === 0 ? (
          <p>No hay turnos reservados aún.</p>
        ) : (
          turnos.map((t, index) => (
            <div key={index} className="turno-card">
              <h3>{t.nombre} {t.apellido}</h3>
              <p>Obra Social: {t.obraSocial || "No especificada"}</p>
              <p>Fecha: {t.fecha}</p>
              <p>Hora: {t.hora}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TurnosPage;
