import "./Sobre.css";
import odontologia from "../assets/odontologia.jpg";

function Sobre() {
  return (
    <div className="sobre-container">
      <div className="sobre-grid">
        <div className="sobre-texto">
          <h1>Sobre Nosotros</h1>
          <p>
            Somos un consultorio odontológico dedicado a brindar atención
            personalizada y profesional.
          </p>
        </div>

        <div className="sobre-imagen">
          <img src={odontologia} alt="Odontología" />
        </div>
      </div>
    </div>
  );
}

export default Sobre;