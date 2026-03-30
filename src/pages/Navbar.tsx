import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <div className="logo">
          🦷 Odontología
        </div>

        {/* MENU */}
        <ul className={`nav-links ${menuAbierto ? "active" : ""}`}>
          <li><Link to="/" onClick={() => setMenuAbierto(false)}>Inicio</Link></li>
          <li><Link to="/turnos" onClick={() => setMenuAbierto(false)}>Turnos</Link></li>
          <li><Link to="/servicios" onClick={() => setMenuAbierto(false)}>Servicios</Link></li>
          <li><Link to="/sobre" onClick={() => setMenuAbierto(false)}>Sobre</Link></li>
          <li><Link to="/contacto" onClick={() => setMenuAbierto(false)}>Contacto</Link></li>

          {/* CTA */}
          <li>
            <Link
              to="/turnos"
              className="btn-turno"
              onClick={() => setMenuAbierto(false)}
            >
              Reservar
            </Link>
          </li>
        </ul>

        {/* HAMBURGUESA */}
        <div
          className="menu-toggle"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          ☰
        </div>
      </div>
    </nav>
  );
}

export default Navbar;