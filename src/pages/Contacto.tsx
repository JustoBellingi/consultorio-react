import "./Contacto.css";

function Contacto() {
  return (
    <section className="contacto">
      <div className="contacto-container">

        <div className="card-contacto">
          <h2>CTD - Centro de terapias para el desarrollo</h2>

          <p>📍 <strong>Dirección:</strong> C. 471 1592, City Bell</p>
          <p>📞 <strong>Teléfono:</strong> 221 511 7589</p>

          <div className="horarios">
            <p><strong>Horarios</strong></p>
            <ul>
              <li>Lunes a Viernes: 9:00 - 18:00</li>
              <li>Sábados: 9:00 - 13:00</li>
            </ul>
          </div>

          <div className="botones">
            <a
              href="https://wa.me/5492215117589"
              target="_blank"
              rel="noopener noreferrer"
              className="btn whatsapp"
            >
              💬 WhatsApp
            </a>

            <a
              href="mailto:contacto@consultorio.com"
              className="btn email"
            >
              ✉️ Email
            </a>
          </div>

          <p className="respuesta">Respondemos dentro del día 📩</p>
        </div>

        {/* MAPA */}
        <div className="mapa">
          <iframe
            src="https://www.google.com/maps?q=City+Bell,+La+Plata&output=embed"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </section>
  );
}

export default Contacto;