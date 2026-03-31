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
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d422.2309767960373!2d-58.054732426042804!3d-34.879290976892705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2dc2a97f215a7%3A0x9d708899addcca9f!2sCentro%20de%20terapias%20para%20el%20desarrollo!5e0!3m2!1ses!2sar!4v1774550859562!5m2!1ses!2sar" width="300" height="225" style={{ border: 2 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>

      </div>
    </section>
  );
}

export default Contacto;