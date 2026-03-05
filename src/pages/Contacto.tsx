import './Contacto.css';
export default function Contacto() {
  return (
    <div className="contacto-container">

      <h1>Contacto</h1>

      <div className="contacto-grid">

        <div className="contacto-info">
          <h2>CTD - Centro de terapias para el desarrollo</h2>

          <p><strong>📍 Dirección:</strong> C. 471 1592, B1896AJF City Bell, Provincia de Buenos Aires</p>
          <p><strong>📞 Teléfono:</strong> 221 511 -7589</p>
          <p><strong>💬 WhatsApp:</strong> 221 511 -7589</p>
          <p><strong>🕒 Horarios:</strong></p>
          <ul>
            <li>Lunes a Viernes: 9:00 - 18:00</li>
            <li>Sábados: 9:00 - 13:00</li>
          </ul>

          <a
            href="https://wa.me/5492215117589"
            className="btn-contacto"
            target="_blank"
            rel="noopener noreferrer"
          >
            Solicitar turno por WhatsApp
          </a>
        </div>
        <div className="contacto-mapa">
        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3273.0829707467747!2d-58.05713182569676!3d-34.87926277210013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2dc2a97f215a7%3A0x9d708899addcca9f!2sCentro%20de%20terapias%20para%20el%20desarrollo!5e0!3m2!1ses!2sar!4v1772546007008!5m2!1ses!2sar" 
         width="100%"
    height="350"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
  ></iframe>
</div>
      </div>
    </div>
  );
}