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
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/turnos">Turnos</Link></li>
          <li><Link to="/servicios">Servicios</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>

          {/* CTA */}
          <li>
            <Link to="/turnos" className="btn-turno">
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