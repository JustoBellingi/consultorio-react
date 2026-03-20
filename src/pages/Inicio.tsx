import { Link } from "react-router-dom";
import foto1 from "../assets/foto1.jpg";
import foto2 from "../assets/foto2.jpg";
import "./Inicio.css";

function Inicio() {
  return (
    <section className="hero">
      <div className="hero-content">

        <h1>Tu sonrisa en manos profesionales</h1>

        <p>
          Atención odontológica de calidad en La Plata. Tecnología moderna,
          profesionales capacitados y atención personalizada.
        </p>

        <div className="hero-buttons">
          <Link to="/turnos" className="btn-primary">
            📅 Reservar turno
          </Link>

          <Link to="/servicios" className="btn-secondary">
            Ver servicios
          </Link>
        </div>

        {/* 🔥 IMÁGENES */}
        <div className="hero-imagenes">
          <img src={foto1} alt="Consultorio 1" />
          <img src={foto2} alt="Consultorio 2" />
        </div>

        {/* 🔥 STATS */}
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
    </section>
  );
}

export default Inicio;