
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Columna 1 */}
        <div className="footer-col">
          <h3>Odontología</h3>
          <p>
            Brindamos atención profesional con tecnología moderna y un enfoque
            centrado en el paciente.
          </p>
        </div>

        {/* Columna 2 */}
        <div className="footer-col">
          <h3>Enlaces</h3>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/turnos">Turnos</a></li>
            <li><a href="/servicios">Servicios</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div className="footer-col">
          <h3>Contacto</h3>
          <p>📍 La Plata, Buenos Aires</p>
          <p>📞 +54 9 221 511 7589</p>
          <p>✉️ anitaliareyherrero@gmail.com</p>
        </div>

         <div className="contact-icons">

            {/* WHATSAPP */}
            <a
              href="https://wa.me/5492215117589"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp /> WhatsApp
            </a>

            {/* EMAIL */}
            <a href="mailto:anitaliareyherrero@gmail.com">
              <FaEnvelope /> Email
            </a>

          </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Consultorio Odontológico - Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;