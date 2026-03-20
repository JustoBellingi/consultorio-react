import imagenIA from "../assets/imagenIA.jpg";
import "./Sobre.css";

function Sobre() {
  return (
    <section className="sobre">
      <div className="sobre-container">

        <div className="sobre-texto">
          <h2>Sobre Nosotros</h2>

          <p>
            Somos un consultorio odontológico en La Plata enfocado en brindar
            atención de calidad, con un trato cercano y profesional.
          </p>

          <p>
            Nuestro objetivo es que cada paciente se sienta cómodo y seguro,
            utilizando tecnología moderna y tratamientos actualizados.
          </p>

          <div className="valores">
            <div>✔ Atención personalizada</div>
            <div>✔ Tecnología moderna</div>
            <div>✔ Profesionales capacitados</div>
          </div>
        </div>

        <div className="sobre-img">
          <img src={imagenIA} alt="Consultorio 2" />
        </div>
      </div>
    </section>
  );
}

export default Sobre;