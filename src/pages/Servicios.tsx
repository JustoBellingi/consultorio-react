import "./Servicios.css";

function Servicios() {
  return (
    <section className="servicios">
      <h2>Nuestras Especialidades</h2>
      <p className="subtitulo">
        Atención odontológica integral con tecnología moderna y profesionales especializados.
      </p>

      <div className="servicios-grid">
        <div className="servicio-card">
          <div className="icono">🦷</div>
          <h3>Odontología General</h3>
          <p>
            Cuidado completo de tu salud bucal con controles periódicos y tratamientos preventivos.
          </p>
        </div>

        <div className="servicio-card">
          <div className="icono">✨</div>
          <h3>Estética Dental</h3>
          <p>
            Blanqueamientos, carillas y tratamientos diseñados para una sonrisa perfecta.
          </p>
        </div>

        <div className="servicio-card">
          <div className="icono">😁</div>
          <h3>Ortodoncia</h3>
          <p>
            Alineación dental con métodos modernos y discretos adaptados a cada paciente.
          </p>
        </div>

        <div className="servicio-card">
          <div className="icono">🔩</div>
          <h3>Implantes Dentales</h3>
          <p>
            Soluciones duraderas para recuperar funcionalidad y estética en tu sonrisa.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Servicios;