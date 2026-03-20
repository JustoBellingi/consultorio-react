import { Link } from "react-router-dom";
import "./Inicio.css";

function Inicio() {
  return (
    <section className="hero">

      {/* BACKGROUND */}
      <div className="hero-bg"></div>

      {/* CONTENIDO */}
      <div className="hero-content">

        {/* TEXTO */}
        <div className="hero-text">
          <span className="badge">✨ Atención odontológica premium</span>

          <h1>
            Sonreí con confianza <br /> todos los días
          </h1>

          <p>
            Tecnología moderna, profesionales capacitados y atención
            personalizada en La Plata.
          </p>

          <div className="hero-buttons">
            <Link to="/turnos" className="btn-primary">
              📅 Reservar turno
            </Link>

            <Link to="/servicios" className="btn-secondary">
              Ver servicios
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <h3>+500</h3>
              <p>Pacientes</p>
            </div>
            <div>
              <h3>+5 años</h3>
              <p>Experiencia</p>
            </div>
            <div>
              <h3>100%</h3>
              <p>Satisfacción</p>
            </div>
          </div>
        </div>

        {/* CARD */}
        <div className="hero-card">
          <h3>✔ Turnos rápidos</h3>
          <p>Reservá en menos de 1 minuto</p>

          <h3>🦷 Atención profesional</h3>
          <p>Especialistas certificados</p>

          <h3>💬 Soporte inmediato</h3>
          <p>Respondemos en el día</p>
        </div>

      </div>

      {/* SCROLL */}
      <div className="scroll-indicator">↓</div>

    </section>
  );
}

export default Inicio;