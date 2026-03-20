import "./Contacto.css";

export default function Contacto() {
  return (
    <div className="contacto-container">

      <h1>Contacto</h1>

      <div className="contacto-grid">

        <div className="contacto-info">
          <h2>CTD - Centro de terapias para el desarrollo</h2>

          <p><strong>📍 Dirección:</strong> C. 471 1592, City Bell</p>
          <p><strong>📞 Teléfono:</strong> 221 511 7589</p>

          <p className="contacto-sub">Horarios</p>
          <ul>
            <li>Lunes a Viernes: 9:00 - 18:00</li>
            <li>Sábados: 9:00 - 13:00</li>
          </ul>

          <div className="contacto-botones">

            <a
              href="https://wa.me/5492215117589"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-contacto whatsapp"
            >
              💬 WhatsApp
            </a>

            <a
              href="mailto:contacto@consultorio.com"
              className="btn-contacto email"
            >
              ✉️ Email
            </a>

          </div>

          <p className="contacto-extra">
            Respondemos dentro del día 📩
          </p>
        </div>

        <div className="contacto-mapa">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18..."
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: "12px" }}
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </div>
  );
}