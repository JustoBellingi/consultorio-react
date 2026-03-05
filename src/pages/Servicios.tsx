import "./Servicios.css";

function Servicios() {
  return (
    <section className="servicios">
      <h2>Especialidades Odontológicas</h2>

      <div className="servicios-grid">
        <div className="servicio-card">
          <h3>Odontología General</h3>
          <p>
            Atención integral para el cuidado y mantenimiento de la salud bucal.
          </p>
        </div>

        <div className="servicio-card">
          <h3>Estética Dental</h3>
          <p>
            Tratamientos orientados a mejorar la apariencia y armonía de la sonrisa.
          </p>
        </div>

        <div className="servicio-card">
          <h3>Ortodoncia</h3>
          <p>
            Corrección de la alineación dental mediante técnicas modernas.
          </p>
        </div>

        <div className="servicio-card">
          <h3>Implantes Dentales</h3>
          <p>
            Rehabilitación oral para recuperar funcionalidad y estética.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Servicios;