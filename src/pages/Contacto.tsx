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
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d422.2309767960373!2d-58.054732426042804!3d-34.879290976892705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2dc2a97f215a7%3A0x9d708899addcca9f!2sCentro%20de%20terapias%20para%20el%20desarrollo!5e0!3m2!1ses!2sar!4v1774550859562!5m2!1ses!2sar" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>

      </div>
    </div>
  );
}