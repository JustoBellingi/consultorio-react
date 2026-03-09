import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-col">
          <h3>Odontología</h3>
          <p>
            Atención profesional con compromiso y confianza para
            cada paciente.
          </p>
        </div>

        <div className="footer-col">
          <h3>Enlaces</h3>
          <ul>
            <li>Inicio</li>
            <li>Turnos</li>
            <li>Servicios</li>
            <li>Contacto</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contacto</h3>
          <p>📍 Dirección del consultorio</p>
          <p>📞 +54 9 11 1234-5678</p>
          <p>✉ contacto@consultorio.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2025 Odontología - Todos los derechos reservados
      </div>

    </footer>
  );
}

export default Footer;