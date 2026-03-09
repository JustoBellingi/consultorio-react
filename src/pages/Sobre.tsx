import "./Sobre.css";
import odontologia from "../assets/odontologia.jpg";

function Sobre() {
  return (
    <div className="sobre-container">

      <h1 className="titulo-sobre">Sobre Nosotros</h1>

      <div className="sobre-intro">

        <img 
          src={odontologia} 
          alt="Consultorio odontológico"
          className="sobre-img"
        />

        <div className="sobre-texto">
          <h2>Quiénes Somos</h2>
          <p>
            Somos un espacio dedicado a brindar atención profesional y de calidad.
            Nuestro objetivo es ofrecer un servicio confiable, cercano y accesible
            para cada paciente, priorizando siempre su bienestar y comodidad.
          </p>
        </div>

      </div>

      <section className="sobre-seccion">
        <h2>Nuestros Servicios</h2>

        <div className="servicios-grid">

          <div className="servicio-card">
            <h3>Consultas</h3>
            <p>Atención personalizada para cada paciente.</p>
          </div>

          <div className="servicio-card">
            <h3>Control</h3>
            <p>Seguimiento y control profesional.</p>
          </div>

          <div className="servicio-card">
            <h3>Asesoramiento</h3>
            <p>Orientación y diagnóstico profesional.</p>
          </div>

          <div className="servicio-card">
            <h3>Obras Sociales</h3>
            <p>Atención con diferentes coberturas.</p>
          </div>

        </div>
      </section>

      <section className="sobre-seccion">
        <h2>Nuestros Valores</h2>

        <ul>
          <li>✔ Atención personalizada</li>
          <li>✔ Profesionalismo</li>
          <li>✔ Compromiso con cada paciente</li>
          <li>✔ Confianza y respeto</li>
        </ul>

      </section>

      <section className="sobre-seccion">
        <h2>Nuestro Equipo</h2>

        <div className="equipo">

          <div className="doctor-card">
            <img src="https://i.pravatar.cc/150?img=32" alt="doctora"/>
            <h3>Dra. Analia Rey</h3>
            <p>Ortodoncia</p>
          </div>

        </div>

      </section>

      <section className="sobre-seccion">
        <h2>Ubicación</h2>

        <p>
          Nuestro consultorio está ubicado en una zona accesible, pensado para
          brindar comodidad y tranquilidad a quienes nos visitan.
        </p>

      </section>

    </div>
  );
}

export default Sobre;