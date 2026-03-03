import foto1 from "../assets/foto1.jpg";
import foto2 from "../assets/foto2.jpg";
import "./Inicio.css";
export default function Inicio() {
  return (
    <div className="inicio-container">

      {/* HERO */}
      <section className="hero">
        <div className="hero-texto">
          <h1>CTD</h1>
          <p>
            Cuidamos tu sonrisa con profesionalismo y calidez.
            Atención personalizada en un espacio moderno y confortable.
          </p>
          <a href="/turnos" className="btn-principal">
            Reservar turno
          </a>
        </div>

        <div className="hero-imagenes">
          <img src={foto1} alt="Consultorio CTD 1" />
          <img src={foto2} alt="Consultorio CTD 2" />
        </div>
      </section>

      {/* SERVICIOS DESTACADOS */}
      <section className="servicios">
        <h2>Nuestros Servicios</h2>

        <div className="cards">
          <div className="card">
            <h3>Limpieza y Control</h3>
            <p>Prevención y cuidado integral para mantener tu salud bucal.</p>
          </div>

          <div className="card">
            <h3>Ortodoncia</h3>
            <p>Tratamientos modernos para una sonrisa alineada y saludable.</p>
          </div>

          <div className="card">
            <h3>Blanqueamiento</h3>
            <p>Mejorá la estética de tu sonrisa con procedimientos seguros.</p>
          </div>
        </div>
      </section>

    </div>
  );
}